import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';

import {AppComponent} from './core/app.component';
import {CoreModule} from './core/core.module';
import {RouterModule} from '@angular/router';
import {routes} from './routes';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    CoreModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
