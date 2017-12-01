import {Routes} from '@angular/router';
import {NotFoundPageComponent} from './core/containers/not-found-page.component';
import {ChildProductsComponent} from './child-products/child-products.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    component: ChildProductsComponent,
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  }
];
