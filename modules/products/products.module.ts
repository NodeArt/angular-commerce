import {ModuleWithProviders, NgModule, Type} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {reducers} from './reducers/index';
import {ProductsEffects} from './effects/products';
import {ProductsComponent} from './containers/products';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('products', reducers),
    EffectsModule.forFeature([ProductsEffects]),
  ],
  declarations: [ProductsComponent],
  exports: [ProductsComponent],
})
export class ProductsModule {
  static forRoot(effectClass?: Type<ProductsEffects>): ModuleWithProviders {
    return {
      ngModule: ProductsModule,
      providers: [
        { provide: ProductsEffects, useClass: !!effectClass ? effectClass : ProductsEffects },
      ],
    };
  }
}
