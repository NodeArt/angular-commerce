import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductsModule} from 'a2c-products';
import {ChildProductsComponent} from './child-products.component';
import {MatCardModule, MatListModule} from '@angular/material';

const COMPONENTS = [
  ChildProductsComponent
];

const MATERIAL = [
  MatListModule,
  MatCardModule,
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    ProductsModule.forRoot(),
    ...MATERIAL,
  ],
  exports: COMPONENTS
})
export class ChildProductsModule {}
