import {Component} from '@angular/core';
import {ProductsComponent} from 'a2c-products';

import * as fromProduct from 'a2c-products';
import * as products from 'a2c-products-actions';
import {Observable} from 'rxjs/Observable';

interface TProduct {
  id: string;
  color: string;
  name: string;
  price: number;
  size: string;
}

@Component({
  selector: 'a2c-child-products',
  template: `
    <mat-nav-list>
      <mat-list-item *ngFor="let p of products$ | async">
        <p>id: {{ p.id }}</p>
        <p>name: {{ p.name }}</p>
      </mat-list-item>
    </mat-nav-list>
  `,
  styles: [``]
})
export class ChildProductsComponent extends ProductsComponent {

  protected init(): void {
    this.products$ = this.store.select(fromProduct.getLoadedProducts) as Observable<Array<TProduct>>;
    this.store.dispatch(new products.GetAllProducts);
  }
}
