import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../product.service';
import {Observable, Subscription} from 'rxjs';
import {Product} from '../../models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent {
  products$: Observable;
  key$: Observable<Product>;


  constructor(private productService: ProductService) {
    this.products$ = this.productService.getAll().snapshotChanges();
    this.key$ = this.products$.map(changes => {
      return changes.map(c => ({
        key: c.payload.key, ...c.payload.val()
      }));
    });


  }



}
