import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductsModule} from 'a2c-products';
import {ChildProductsComponent} from './child-products.component';

@NgModule({
  declarations: [
    ChildProductsComponent,
  ],
  imports: [
    CommonModule,
    ProductsModule.forRoot()
  ],
  exports: [
    ChildProductsComponent,
  ]
})
export class ChildProductsModule {}
