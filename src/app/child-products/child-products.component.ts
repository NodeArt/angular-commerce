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
      <mat-card *ngFor="let p of products$ | async">
        <mat-card-title>
          Product ID: {{ p.id }}
        </mat-card-title>
        <mat-card-content>
          <mat-list>
            <mat-list-item>Name: {{ p.name }}</mat-list-item>
            <mat-list-item>Color: {{ p.color }}</mat-list-item>
            <mat-list-item>Product size: {{ p.size }}</mat-list-item>
            <mat-list-item>Product price: {{ p.price }}</mat-list-item>
          </mat-list>
        </mat-card-content>
      </mat-card>
    </mat-nav-list>
  `,
  styles: [`
    mat-card {
      margin: 15px;
    }
  `]
})
export class ChildProductsComponent extends ProductsComponent {

  protected init(): void {
    this.products$ = this.store.select(fromProduct.getLoadedProducts) as Observable<Array<TProduct>>;
    this.store.dispatch(new products.GetAllProducts);
  }
}
