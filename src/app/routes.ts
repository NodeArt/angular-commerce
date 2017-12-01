import {Routes} from '@angular/router';
import {NotFoundPageComponent} from './core/containers/not-found-page.component';
import {AuthGuard} from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    loadChildren: './child-products/child-products.module#ChildProductsModule',
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  }
];
