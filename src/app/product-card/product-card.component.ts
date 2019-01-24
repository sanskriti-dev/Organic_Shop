import {Component, OnInit, Input} from '@angular/core';
import {Product} from '../models/product';
import {ShoppingCartService} from '../shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  @Input() showActions: true;

  constructor(private shoppingcart: ShoppingCartService) {
  }

  ngOnInit() {
  }

  addtocart(product: Product) {
    const cartId = localStorage.getItem('cartId');
    if (!cartId) {
      this.shoppingcart.create().then(result => {
        localStorage.setItem('cartId', result.key);
      });
    }
  }

}
