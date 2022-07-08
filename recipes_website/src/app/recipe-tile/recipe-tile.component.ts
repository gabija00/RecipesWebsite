import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe/recipe.module';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Favourite } from '../models/favourite.model';
import { FavouriteService } from '../services/favourite.service';
import {FirebaseTSAuth} from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { Favouritee } from '../models/favouritee.model';

@Component({
  selector: 'app-recipe-tile',
  templateUrl: './recipe-tile.component.html',
  styleUrls: ['./recipe-tile.component.css']
})
export class RecipeTileComponent implements OnInit {
  @Input("data") data:Favouritee=null;
  @Input("toggle") toggle:any;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  tutorial: Favourite = new Favourite();
  submitted = false;
  auth: FirebaseTSAuth;
  favourites: any;
  constructor(private router:Router, private services:FavouriteService) {
    this.auth = new FirebaseTSAuth();
   }

  ngOnInit(): void {
  }

  saveTutorial(): void {
    this.tutorial.category = this.data.category;
    this.tutorial.title = this.data.title;
    this.tutorial.making = this.data.making;
    this.tutorial.ownerId = this.auth.getAuth().currentUser.uid;
    this.tutorial.description = this.data.description;
    this.tutorial.foods = this.data.foods;
    this.tutorial.photo = this.data.photo;
    this.tutorial.making = this.data.making;
    this.tutorial.id = this.data.id;
    

    this.services.create(this.tutorial).then(() => {
      console.log('Created new item successfully!');
      this.submitted = true;
    });
  }

  
  onSelect(): void {
    this.router.navigateByUrl('/recipe-page', { state: this.data });
}

onPressLike(){
  if (this.toggle === true){
    this.deleteTutorial(this.data.id);
    this.toggle = false;
  }
  else
  {
    this.saveTutorial();
    this.toggle = true;
  }
}
deleteTutorial(id:string): void {
    this.services.delete(id)
      .then(() => {
        this.refreshList.emit();
      });
     // .catch(err => console.log(err));
  
}


ifFavourite()
{
   
}

}
