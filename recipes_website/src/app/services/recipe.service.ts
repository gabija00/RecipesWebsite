import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Recipe } from '../recipe/recipe.module';
@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private dbPath = '/recipes';
  recipesRef: AngularFirestoreCollection<Recipe> ;
  constructor(private db: AngularFirestore) {
    this.recipesRef = db.collection(this.dbPath);
  }
  getAll(): AngularFirestoreCollection<Recipe> {
    
    //afs.collection('items', ref => ref.where('size', '==', 'large'))
    return this.recipesRef;
  }
  create(tutorial: Recipe): any {
    return this.recipesRef.add({ ...tutorial });
  }
  update(id: string, data: any): Promise<void> {
    return this.recipesRef.doc(id).update(data);
  }
  delete(id: string): Promise<void> {
    return this.recipesRef.doc(id).delete();
  }
  
}