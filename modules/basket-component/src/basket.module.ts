import {NgModule} from "@angular/core";
import {BasketComponent} from "./basket.component";
import {BasketService} from "@nodeart/basketservice/basket.service";
import { BasketServiceModule } from '@nodeart/basketservice';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
/**
 * Basket module that contain component with store basket
 */ 
@NgModule({
  declarations: [
    BasketComponent
  ],
  exports: [
    BasketComponent
  ],
  imports: [
    BasketServiceModule,
    CommonModule,
    RouterModule
  ],
  providers: [
  ]
})
export class BasketModule {

}
