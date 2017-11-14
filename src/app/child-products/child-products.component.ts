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
    <div *ngFor="let p of products$ | async">
      <p>id: {{ p.id }}</p> 
      <p>name: {{ p.name }}</p>         
    </div>
  `,
  styles: [`
    div {
      border: 1px solid red;
    }
  `]
})
export class ChildProductsComponent extends ProductsComponent {

  protected init(): void {
    console.log('Simple override example');
    this.products$ = this.store.select(fromProduct.getLoadedProducts) as Observable<Array<TProduct>>;
    this.store.dispatch(new products.GetAllProducts);
  }
}
