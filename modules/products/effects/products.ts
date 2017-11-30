import {Inject, Injectable, Optional} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {IConnector, Q, Query} from 'a2c-connector-interface';

import * as products from 'a2c-products-actions';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class ProductsEffects {
  constructor(protected actions$: Actions,
              @Optional() @Inject('IConnector') protected connector: IConnector) {}

  @Effect()
  protected getAllProducts$: Observable<any> = this.actions$
    .ofType(products.GET_ALL)
    .switchMap((action: products.GetAllProducts) => {
      const query: Q = new Query('products').build();
      return this.connector.get(query)
        .map((data: Object) => new products.ProductsLoaded(data));
    });
}
