import {Component, Input, OnInit} from '@angular/core';
import {CategoryService} from '../../category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {
  key1$;
  category$;
  @Input() category;

  constructor(private category1: CategoryService) {

    this.category$ = this.category1.getCategory().snapshotChanges();
    this.key1$ = this.category$.map(changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }));
      }
    );
  }
}
