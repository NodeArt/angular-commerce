import {Routes} from '@angular/router';
import {NotFoundPageComponent} from './core/containers/not-found-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    loadChildren: './child-products/child-products.module#ChildProductsModule'
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  }
];
