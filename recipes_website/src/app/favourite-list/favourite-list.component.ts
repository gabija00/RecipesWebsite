import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable} from 'rxjs';
import { RecipeService } from 'src/app/services/recipe.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import {AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { Favourite } from '../models/favourite.model';
import { FavouriteService } from '../services/favourite.service';
import { Favouritee } from '../models/favouritee.model';

@Component({
  selector: 'app-favourite-list',
  templateUrl: './favourite-list.component.html',
  styleUrls: ['./favourite-list.component.scss']
})
export class FavouriteListComponent implements OnInit {

  
  favourites: Favouritee[] = [];
  dat: Favouritee[] = [];

  auth = new FirebaseTSAuth();
  fav:Favouritee = null;



  private dbPath = '/favourites';
  recipesRef: AngularFirestoreCollection<Favourite> ;


  public data: Observable<any[]>;
  private firebaseAuth: FirebaseTSAuth;
  constructor(private db: AngularFirestore, private tutorialService: RecipeService, private router:Router, private favouriteService:FavouriteService) {
    
     
  }

  ngOnInit(){
    this.retrieveTutorials2();
   
  }
  filter(){

    for (var val of this.favourites) {
          
          if (val.ownerId == this.auth.getAuth().currentUser.uid)
          {
            this.fav = new Favouritee();
          this.fav.title = val.title;
          this.fav.description = val.description;
          this.fav.photo = val.photo;
          this.fav.foods = val.foods;
          this.fav.making = val.making;
          this.fav.category =val.category;
          this.fav.favourite = true;
          this.dat.push(this.fav);
          }          
    }
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
