import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { observable, Subject } from 'rxjs';
import { Observable, combineLatest } from 'rxjs';
import { Recipe } from 'src/app/recipe/recipe.module';
import { RecipeService } from 'src/app/services/recipe.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Route } from '@angular/router';
import { Router } from '@angular/router';
import {AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';



@Component({
  selector: 'app-receipe-list',
  templateUrl: './receipe-list.component.html',
  styleUrls: ['./receipe-list.component.scss']
})
export class ReceipeListComponent implements OnInit {

  searchterm: string = '';

  startAt = new Subject();
  endAt = new Subject();

  startObs = this.startAt.asObservable();
  endObs = this.endAt.asObservable();

  names:any[] = [];
  Category: any = '';
  tutorials: any;
  q:any;



  private dbPath = '/recipes';
  recipesRef: AngularFirestoreCollection<Recipe> ;


  public data: Observable<any[]>;
  constructor(private db: AngularFirestore, private tutorialService: RecipeService, private router:Router) {
     this.data = db.collection('/recipes').valueChanges();
     this.Category = this.router.getCurrentNavigation().extras.state;
     this.recipesRef = db.collection(this.dbPath);
  }

  ngOnInit(){
    const combined = combineLatest(this.startObs, this.endObs).subscribe((value:any) => {
      this.firequery(value[0], value[1]).subscribe((namess) => {this.names = namess;
    })
    })
    this.search()
  }

  search(){
    //let q = $event.target.value;
    let q = this.Category;
    this.startAt.next(q);
    this.endAt.next(q + "\uf8ff");
  }

  firequery(start:any, end:any){
    return this.db.collection('recipes', ref => ref.limit(10).orderBy('category').startAt(start).endAt(end)).valueChanges();
  };

  retrieveTutorials(): void {

    //console.log(this.db.collection('recipes', ref => ref.where('category', '==', this.Category)).get());
    this.tutorialService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.tutorials = data;
    });
    
  }
}
