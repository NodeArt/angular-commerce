import { PaymentsService } from './payments.service';
import {NgModule} from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasketServiceModule } from '@nodeart/basketservice';
import { TwoCheckoutComponent } from './paymets/payment-methods/2checkout/two-checkout.component';
import { StripeComponent } from './paymets/payment-methods/stripe/stripe.component';
import { PaymentsContainerComponent } from './payments-container.component';
import { AddressDeliveryComponent } from './deliveries/address-delivery/address-delivery.component';
import { PickupDeliveryComponent } from './deliveries/pickup-delivery/pickup-delivery.component';
import { DeliveriesComponent } from './deliveries/deliveries.component';
import { PaymentsComponent } from './paymets/payments.component';
import { PaymentsSpinnerComponent } from './payments-spinner/payments-spinner.component';

/**
 * Module that provide payments page with different types of payments. More payments will be added sooner.
 * User expirience: `User choose payment method --> User input payment information --> (Optional) user fill delivery form`
 */
@NgModule({
  declarations: [
    PaymentsComponent,
    DeliveriesComponent,
    PickupDeliveryComponent,
    AddressDeliveryComponent,
    PaymentsContainerComponent,
    TwoCheckoutComponent,
    StripeComponent,
    PaymentsSpinnerComponent
  ],
  exports: [
    PaymentsComponent,
    DeliveriesComponent,
    PickupDeliveryComponent,
    AddressDeliveryComponent,
    PaymentsContainerComponent,
    TwoCheckoutComponent,
    StripeComponent,
    PaymentsSpinnerComponent,
    PaymentsService
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    BasketServiceModule
  ],
  providers: [
    PaymentsService
  ]

})
export class PaymentsModule {

}
