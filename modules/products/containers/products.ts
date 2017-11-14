import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';

import * as fromProducts from '../reducers';
import * as products from 'a2c-products-actions';

@Component({
  selector: 'a2c-products',
  template: `
    <div *ngFor="let product of products$ | async">
      <p>{{ product | json }}</p>
    </div>
  `,
})
export class ProductsComponent {

  private _products$: Observable<Array<any>>;

  constructor(protected store: Store<any>) {
    this.products$ = this.store.select(fromProducts.getLoadedProducts);
    this.store.dispatch(new products.GetAllProducts());
  }

  get products$(): Observable<Array<any>> {
    return this._products$;
  }

  set products$(value: Observable<Array<any>>) {
    this._products$ = value;
  }
}
