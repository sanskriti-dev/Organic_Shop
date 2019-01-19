import {Component} from '@angular/core';
import {ProductService} from '../product.service';
import {CategoryService} from '../category.service';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products = [];
  filteredProducts = [];
  category: string;

  constructor(private productService: ProductService, private category1: CategoryService, route: ActivatedRoute) {
    productService.getAll().valueChanges().switchMap(products => {
      this.products = products;
      return route.queryParamMap;
    }).subscribe(params => {
      this.category = params.get('category');
      this.filteredProducts = (this.category) ? this.products.filter(p => p.category === this.category) : this.products;


    });
  }
}
