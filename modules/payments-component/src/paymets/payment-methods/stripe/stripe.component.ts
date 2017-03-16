import {Component, OnInit, Output, EventEmitter} from "@angular/core";
import {FormGroup, FormBuilder} from "@angular/forms";

declare var Stripe: StripeStatic;

const STRIPE_PUBLIC_KEY: string = "pk_live_jKTMk9TvGKrsu9CCHRzfmjME";

/**
 * Stripe pay component 
 */
@Component({
  selector: 'stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['stripe.component.scss']
})
export class StripeComponent implements OnInit {

  /**
   * Emits data when form saves
   */
  @Output() formSaved = new EventEmitter();

  /**
   * 2Checkout form
   */
  stripeForm: FormGroup;

  /**
   * Stripe error object
   */
  stripeError: StripeError;

  /**
   * Is request in process
   */
  isLoading: boolean = false;

  constructor(private fb: FormBuilder) {
    this.stripeForm = fb.group({
      cardNumber: '',
      expiryMonth: '',
      expiryYear: '',
      cvc: ''
    });
  }

  ngOnInit() {
    console.log("Stripe component was created");
    Stripe.setPublishableKey(STRIPE_PUBLIC_KEY);
  }

  /**
   * On submit form process card data
   * @param event form event
   */
  handleCardData(event): void {
    event.preventDefault();
    this.isLoading = true;
    let stripeForm = this.stripeForm.value;
    console.log(stripeForm);
    let stripeTokenData: StripeTokenData = {
      number: stripeForm.cardNumber,
      exp_month: stripeForm.expiryMonth,
      exp_year: stripeForm.expiryYear,
      cvc: stripeForm.cvc
    };

    this.getCardToken(stripeTokenData)
      .then(this.nextStep.bind(this))
      .catch((error) => {
        console.log(error);
        this.stripeError = error;
        return Promise.resolve();
      })
      .then(() => this.isLoading = false)
  }

  /**
   * Generate card token using stripe.js lib
   * @param data stripe data
   */
  getCardToken(data: StripeTokenData): Promise<any> {
    return new Promise((resolve, reject) => {
      Stripe.card.createToken(data, (status: number, response: StripeTokenResponse) => {
        if(status !== 200) {
          reject(response.error);
        } else {
          resolve(response.id);
        }
      });
    });
  }

  /**
   * Finish pay method after completing of forms filling. This method use {@link PaymentsContainerComponent}
   * @param dal DataAbstractLayer
   * @param data data to process
   * 
   * @returns {Observable} Observable of payment response
   */
  payMethod(dal, data) {
    delete data.paymentForm.payMethod;
    console.log(data.orderForm.totalPrice);

    let totalPrice = data.orderForm.totalPrice;
    let totalIntPrice = totalPrice.split(".").join("");

    let stripeData = {
      amount: totalIntPrice,
      currency: data.orderForm.currency,
      source: data.paymentForm.token
    }

    let paymentKey = dal.addPaymentRequest(stripeData, "STRIPE").key;
    return dal.listenPaymentResponse(paymentKey).map(response => {
      console.log("Listen responce from stripe");

      console.log(response);

      if (response.message) {
        response.status = response.message;
      }

      if (response.status) {
        if (response.status === "succeeded") {
          data.failedPayment = false;
          data.successPayment = true;
        } else {
          data.successPayment = false;
          data.failedPayment = true;
          data.status = response.message || "";
        }
      } 

      return data;
    });
  }

  /**
   * After completing pay process
   */
  nextStep(token: string) {
    this.stripeError = null;
    let paymentForm = {
      token: token,
      deliveryRequired: true,
      payMethod: this.payMethod
    };
    console.log(paymentForm);
    this.formSaved.next(paymentForm);
  }
}