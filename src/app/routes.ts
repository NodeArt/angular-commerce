import {Routes} from '@angular/router';
import {AppComponent} from './core/app.component';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: '**', redirectTo: '' },
];
