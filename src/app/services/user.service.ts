import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private db:AngularFireDatabase) { }

  getUser(uid:string){
    return this.db.object('/users/'+uid);
  }
  getAll(){
    return this.db.list('/users').snapshotChanges();
  }


}
