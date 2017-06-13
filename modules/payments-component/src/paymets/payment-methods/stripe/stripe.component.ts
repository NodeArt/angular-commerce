import {Component, OnInit, Output, EventEmitter, Renderer, ViewChildren, Input} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {onlyNumberValidator} from './validators/only-number.validator';
import {controlLengthValidator} from './validators/control-length.validator';

declare var Stripe;

@Component({
  selector: 'stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['stripe.component.scss'],
  host: {'style': 'position: relative'}
})
export class StripeComponent implements OnInit {

  @Output() formSaved = new EventEmitter();

  @ViewChildren('stripeInput') stripeInputs;

  @Input() STRIPE_PUBLIC_KEY = "pk_test_0uWBpHwggickbc69DcYtC6a4";

  stripeForm: FormGroup;

  stripeServerError;

  isLoading: boolean = false;

  constructor(protected fb: FormBuilder,
              protected renderer: Renderer) {
    this.stripeForm = fb.group(this.initPaymentMethodCardModel());
  }

  ngOnInit() {
    console.log("Stripe component was created");
    Stripe.setPublishableKey(this.STRIPE_PUBLIC_KEY);
  }

  initPaymentMethodCardModel() {
    const expiryMonthRegex = `(0[1-9]|1[0-2])`;
    const expiryYearRegex = `([0-9]{2})$`;
    const cvcRegex = `([0-9]{3})`;

    const model = {
      cardNumber: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16) ,onlyNumberValidator]],
      expiryMonth: ['', [Validators.required, Validators.pattern(expiryMonthRegex), onlyNumberValidator]],
      expiryYear: ['', [Validators.required, Validators.pattern(expiryYearRegex), onlyNumberValidator]],
      cvc: ['', [Validators.required, Validators.pattern(cvcRegex), onlyNumberValidator]]
    };

    return model;
  }

  handleCardData(event): void {
    event.preventDefault();
    if(!this.validateStripeFormInputs())
      return;

    this.isLoading = true;
    let stripeForm = this.stripeForm.value;
    console.log(stripeForm);
    let stripeTokenData = {
      number: stripeForm.cardNumber,
      exp_month: stripeForm.expiryMonth,
      exp_year: stripeForm.expiryYear,
      cvc: stripeForm.cvc
    };

    this.getCardToken(stripeTokenData)
      .then(this.nextStep.bind(this))
      .catch((error) => {
        console.log(error);
        this.stripeServerError = error;
        return Promise.resolve();
      })
      .then(() => this.isLoading = false)
  }

  getCardToken(data): Promise<any> {
    return new Promise((resolve, reject) => {
      Stripe.card.createToken(data, (status: number, response) => {
        if(status !== 200) {
          reject(response.error);
        } else {
          resolve(response.id);
        }
      });
    });
  }

  validateStripeFormInputs(): boolean {
    let inputsArray = this.stripeInputs.toArray();
    return this.checkInputsForValidity(inputsArray);
  }

  checkInputsForValidity(inputs) {
    let el = inputs.find((e) => e.nativeElement.classList.contains('ng-invalid'));
    if (el && el.nativeElement) {
      this.renderer.invokeElementMethod(el.nativeElement, 'focus', []);
      return false;
    }
    return true;
  }

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
    console.log('Payment Key', paymentKey);
    return dal.listenPaymentResponse(paymentKey).map(res => {
      console.log("Listen responce from stripe");

      let response = res.val();

      console.log(response);

      // if (response.message) {
      //   response.status = response.message;
      // }

      if (response.status) {
        if (response.status === "succeeded") {
          data.failedPayment = false;
          data.successPayment = true;
        } else {
          data.successPayment = false;
          data.failedPayment = true;
          data.status = response['outcome']['seller_message'] || "";
        }
      }

      return data;
    });
  }

  nextStep(token: string) {
    this.stripeServerError = null;
    let paymentForm = {
      token: token,
      deliveryRequired: true,
      payMethod: this.payMethod
    };
    console.log(paymentForm);
    this.formSaved.next(paymentForm);
  }
}
