import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { observable, Subject } from 'rxjs';
import { Observable, combineLatest } from 'rxjs';
import { Recipe } from 'src/app/recipe/recipe.module';
import { RecipeService } from 'src/app/services/recipe.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-search-recipe',
  templateUrl: './search-recipe.component.html',
  styleUrls: ['./search-recipe.component.scss']
})
export class SearchRecipeComponent implements OnInit {
  searchterm: string = '';
  recipes: any[] = [];
  startAt = new Subject();
  endAt = new Subject();

  startObs = this.startAt.asObservable();
  endObs = this.endAt.asObservable();

  names:any[] = [];
  snp:any;
  public data: Observable<any[]>;

  constructor(private db: AngularFirestore, private tutorialService:RecipeService) {
    
  }

  ngOnInit(){
    this.retrieveTutorials();
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
  searchh = async ($event:any) => {
  this.names = this.recipes.filter(recipe => recipe.foods.includes($event.target.value));
  }


  

  

}
