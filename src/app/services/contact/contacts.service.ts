import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private db:AngularFireDatabase) { }

  create(contacts){
    return this.db.list('/contacts').push(contacts);
  }

  getAll(){
    return this.db.list('/contacts').snapshotChanges();
  }

  delete(contactID:string){
    return this.db.object('/contacts/'+contactID).remove();
  }

  deleteAll(){
    return this.db.list('/contacts').remove();
  }
}
