import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Favourite } from '../models/favourite.model';
@Injectable({
  providedIn: 'root'
})
export class FavouriteService {
  private dbPath = '/favourites';
  tutorialsRef: AngularFirestoreCollection<Favourite>;
  constructor(private db: AngularFirestore) {
    this.tutorialsRef = db.collection(this.dbPath);
  }
  getAll(): AngularFirestoreCollection<Favourite> {
    return this.tutorialsRef;
  }
  create(tutorial: Favourite): any {
    return this.tutorialsRef.add({ ...tutorial });
  }
  update(id: string, data: any): Promise<void> {
    return this.tutorialsRef.doc(id).update(data);
  }
  delete(id: string): Promise<void> {
    return this.tutorialsRef.doc(id).delete();
  }
}