import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { FavouriteService } from '../services/favourite.service';
import { map } from 'rxjs/operators';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { Router } from '@angular/router';
import { Favouritee } from '../models/favouritee.model';;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  recipes: Favouritee[] = [];
  data: Favouritee[] = [];
  favourites: any[] = [];
  auth = new FirebaseTSAuth();
  fav:Favouritee = null;

  constructor(private tutorialService: RecipeService, router:Router, private favouriteService:FavouriteService) {
    this.auth.listenToSignInStateChanges(
      user => {
        this.auth.checkSignInState(
          {
            whenSignedIn: user => {
              router.navigateByUrl('');
            },
            whenSignedOut: user => {
              router.navigateByUrl('');
              alert('Vartotojas yra atsijungęs. Norėdami prisijungti spauskite mygtuką Registruotis/Prisijungti');
            },
            whenSignedInAndEmailNotVerified: user => {
              router.navigateByUrl('/emailVerification');
            },
            whenSignedInAndEmailVerified: user=> {
              router.navigateByUrl('');
            },
            whenChanged: user => {

            }
          }
        )
      }
    )
   }
  ngOnInit(): void {
    this.retrieveTutorials();
    this.retrieveTutorials2();
  }
  
  filter(){
    for (var val of this.recipes) {

      const datt = this.favourites.find(item => item.id === val.id);
          if (datt === undefined)
          {
            this.fav = new Favouritee();
          this.fav.title = val.title;
          this.fav.description = val.description;
          this.fav.photo = val.photo;
          this.fav.foods = val.foods;
          this.fav.making = val.making;
          this.fav.category =val.category;
          this.fav.id =val.id;
          this.fav.favourite = false;
          this.data.push(this.fav);
          }
          else{
            if (datt.ownerId == this.auth.getAuth().currentUser.uid)
          {
            this.fav = new Favouritee();
          this.fav.title = val.title;
          this.fav.description = val.description;
          this.fav.photo = val.photo;
          this.fav.foods = val.foods;
          this.fav.making = val.making;
          this.fav.category =val.category;
          this.fav.id =val.id;
          this.fav.favourite = true;
          this.data.push(this.fav);

          }

          }  
    }
  }

  refreshList(): void {
    this.retrieveTutorials();
  }


  loggedIn(){
    return this.auth.isSignedIn();
  }
  retrieveTutorials(): void {
    this.tutorialService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.recipes = data;
    });
    
    
  }
  retrieveTutorials2(): void {
    this.favouriteService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.favourites = data;
      this.filter();
    });
    
  }


 
 

}
