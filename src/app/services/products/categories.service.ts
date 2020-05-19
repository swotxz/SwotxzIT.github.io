import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private db :AngularFireDatabase) {  }
  getCategories(){
    return this.db.list('/categories', ref => ref.orderByChild('name')).snapshotChanges();
  }
  getRate(){
    return this.db.list('/rate').snapshotChanges();
  }
}

