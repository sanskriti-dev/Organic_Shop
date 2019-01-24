import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) {
  }

  create() {
    return this.db.list('/shopping-cart').push(
      {
        dateCreated: new Date().getTime()
  }
  )
    ;
  }
}
