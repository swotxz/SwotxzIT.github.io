import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db:AngularFireDatabase) { }
  create(product){
    return this.db.list('/products').push(product);
  }

  getAll(){
    return this.db.list('/products').snapshotChanges();
  }

  getById(productID:string){
    return this.db.object('/products/'+productID).valueChanges();
  }

  update(productID:string,product){
    return this.db.object('/products/'+productID).update(product);
  }

  delete(productID:string){
    return this.db.object('/products/'+productID).remove();
  }

}
