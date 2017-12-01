import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductsModule} from 'a2c-products';
import {ChildProductsComponent} from './child-products.component';
import {MatCardModule, MatListModule} from '@angular/material';
import {RouterModule, Routes} from '@angular/router';

const COMPONENTS = [
  ChildProductsComponent
];

const MATERIAL = [
  MatListModule,
  MatCardModule,
];

const routes: Routes = [
  {
    path: '', component: ChildProductsComponent
  }
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ProductsModule.forRoot(),
    ...MATERIAL,
  ],
  exports: COMPONENTS
})
export class ChildProductsModule {}
