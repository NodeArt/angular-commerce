import { PaymentsService } from './payments.service';
import { AuthService } from '@nodeart/auth-service';
import { BasketService } from '@nodeart/basketservice';
import { Http, Headers, RequestOptions } from '@angular/http';
import { PaymentsComponent } from './paymets/payments.component';
import { Component, OnInit, ViewChild, NgZone} from '@angular/core';
import {DbAbstractionLayer} from "@nodeart/dal";

/**
 * Component that coordinate states of payment expirience (Displays different payment methods,
 *  shows and hide delivery and payment forms, process payments)
 */
@Component({
    selector: 'payments-container',
    templateUrl: './payments-container.component.html',
    styleUrls: ['payments-container.component.scss']
})
export class PaymentsContainerComponent implements OnInit {
    /**
     * Is payment saved
     */
    public paymentSaved = false;
    
    /**
     * Is delivery saved
     */
    public deliverySaved = false;
    
    /**
     * Show delivery form
     */
    public showDeliveryForm = false;

    /**
     * Show payment form
     */
    public showPayments = true;

    /**
     * Payment form FormGroup`
     */
    public paymentForm;

    /**
     * Delivery form FormGroup
     */
    public deliveryForm;

    /**
     * Order form with currency, products and price
     */
    public orderForm = {
        products: [],
        currency: 'USD',
        totalPrice: '0.00',
        userId: ''
    };

    /**
     * Payment status after payment
     */
    public paymentStatus = '';

    /**
     * Show finsih pay button
     */
    public showFinish = false;

    /**
     * Is payment success
     */
    public successPayment = false;
    
    /**
     * Is payment failed
     */
    public failedPayment = false;

    /**
     * Flag for {@link PaymentsSpinnerComponent}
     */
    public isLoading = true;

    /**
     * {@link PaymentsComponent}
     */
    @ViewChild(PaymentsComponent) paymentsComponent: PaymentsComponent;
    constructor(
        private http: Http,
        private basketService: BasketService,
        private zone: NgZone,
        private dal: DbAbstractionLayer,
        private authService: AuthService,
        private paymentsService: PaymentsService) {
    }
    ngOnInit() {
        this.zone.run(() => {
            this.orderForm = {
                products: this.basketService.productsSnapshot,
                currency: 'USD',
                totalPrice: '' + this.basketService.totalPrice + '.00',
                userId: this.basketService.userId
            };
        });
        this.basketService.products.subscribe(products => {
            let totalPrice;
            console.log(this.basketService.totalPrice);
            if(this.basketService.totalPrice > 0) {
                totalPrice = this.basketService.totalPrice;
            } else {
                for(let i = 0; i < products.length; i++){
                    totalPrice += +products[i].product.price;
                }
            }
            this.zone.run(() => {
                this.orderForm = {
                    products: products,
                    currency: 'USD',
                    totalPrice: '' + totalPrice + '.00',
                    userId: this.basketService.userId
                };
            });
        });
     }

     /**
      * Runs when payment form changed
      * @param paymentForm 
      */
    paymentsChanged(paymentForm) {
        // this.showPayments = false;
        this.paymentSaved = true;
        this.paymentForm = paymentForm;
        if(!!paymentForm.deliveryRequired && paymentForm.deliveryRequired === true){
            this.showDeliveryForm = true;
        } else {
            this.showFinish = true;
        }
        if(!!this.paymentForm && !!this.deliveryForm){
            this.showFinish = true;
        }
    }

    /**
      * Runs when delivery form changed
      * @param paymentForm 
      */
    deliveriesChanged(deliveryForm) {
        this.deliverySaved = true;
        this.deliveryForm = deliveryForm;
        if(!!this.paymentForm && !!this.deliveryForm){
            this.showFinish = true;
        }
    }

    /**
     * Process payment after saving payment information and (optional) delivery form.
     */
    finish() {
        this.isLoading = true;
        let paymentData = {
            orderForm: this.orderForm,
            paymentForm: this.paymentForm,
            deliveryForm: this.deliveryForm
        }
        this.paymentForm.payMethod(this.dal, paymentData).subscribe(data => {
            console.log(data);
            if(data.status) {
              this.zone.run(() => {
                this.paymentStatus = data.status;
              });
              this.isLoading = false;
            };
            this.saveOrder(data).subscribe( 
                res => {
                    this.paymentsService.orderSubject.next(data);
                    this.failedPayment = data.failedPayment;
                    this.successPayment = data.successPayment;
                },
                e => {
                    this.successPayment = false;
                    this.failedPayment = true;
            });
        });
    }
    
    /**
     * Save order to database
     * @param paymentData all payment data
     */
    saveOrder(paymentData){
        delete paymentData.paymentForm.payMethod;
        paymentData.date = Date.now();
        return this.dal.saveOrder(paymentData);
    }

    /**
     * Reset payment page
     */
    backToPayments(){
        this.showPayments = true;
        this.showDeliveryForm = false;
        this.showFinish = false;
        this.deliveryForm = null;
        this.paymentForm = null;
        if(this.paymentsComponent){
            this.paymentsComponent.selectedMethod = '';
            this.paymentsComponent.showPaymentsList = true;
        }
    }
}