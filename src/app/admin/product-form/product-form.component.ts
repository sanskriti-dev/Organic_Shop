import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../category.service';
import {Observable} from 'rxjs';
import {ProductService} from '../../product.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$: Observable;
  product: {};
  id;

  constructor(private categoryService: CategoryService,
              private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.categories$ = this.categoryService.getCategory();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.get(this.id).subscribe(product => this.product = product);
    }
  }

  save(product) {
    if (this.id)
      this.productService.update(this.id, product);
    else
      this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (confirm('Are you Sure you want to delete item?'))
      this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

}
