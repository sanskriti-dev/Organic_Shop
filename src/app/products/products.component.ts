import {Component, OnInit} from '@angular/core';
import {ProductService} from '../product.service';
import {Product} from '../models/product';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products$ = Observable;
  key$: Observable<Product>;

  constructor(private productService: ProductService) {
    this.products$ = this.productService.getAll();
    this.key$ = this.products$.map(changes => {
      return changes.map(c => ({
        key: c.payload.key, ...c.payload.val()
      }));
    });
  }


}
