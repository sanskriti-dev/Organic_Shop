import {Component, OnInit} from '@angular/core';
import {ProductService} from '../product.service';
import {Product} from '../models/product';
import {Observable} from 'rxjs';
import {CategoryService} from '../category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products$ = Observable;
  key$: Observable<Product>;
  category$ ;

  constructor(private productService: ProductService, private category: CategoryService) {
    this.products$ = this.productService.getAll();
    this.key$ = this.products$.map(changes => {
      return changes.map(c => ({
        key: c.payload.key, ...c.payload.val()
      }));
    }
    );
    this.category$ = this.category.getCategory();
  }


}
