import { Http, Headers, RequestOptions } from '@angular/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

declare var TCO: any;

/**
 * 2Checkout pay component 
 */
@Component({
    selector: 'two-checkout',
    templateUrl: './two-checkout.component.html',
    styleUrls: ['two-checkout.component.scss']
})
export class TwoCheckoutComponent implements OnInit {
    
    /**
     * Emits data when form saves
     */
    @Output() formSaved = new EventEmitter();

    /**
     * 2Checkout form
     */
    public twoCheckoutForm: FormGroup;
    constructor(private fb: FormBuilder) {
        this.twoCheckoutForm = fb.group({
            token: '',
            ccNo: '',
            expMonth: '',
            expYear: '',
            cvv: '',
            deliveryRequired: true,
            payMethod: this.payMethod
        });
     }

    ngOnInit() { 
        console.log(TCO.requestToken);
    }

    /**
     * On form submit
     */
    nextStep() {
        TCO.loadPubKey('sandbox', () => {
            this.tokenRequest(this.twoCheckoutForm.value);
        });
    }

    /**
     * Request token with native 2Checkout lib
     * @param twoCheckoutForm 2Checkout form with user data
     */
    tokenRequest(twoCheckoutForm){
        var args = {
            sellerId: "901337280",
            publishableKey: "D256114B-CA52-44B4-B071-78A9CAE133D2",
            ccNo: twoCheckoutForm.ccNo,
            cvv: twoCheckoutForm.cvv,
            expMonth: twoCheckoutForm.expMonth,
            expYear: twoCheckoutForm.expYear
        };
        TCO.requestToken((data) => {
            this.twoCheckoutForm.patchValue({
                token: data.response.token.token
            });
            console.log(this.twoCheckoutForm.value);
            this.formSaved.next(this.twoCheckoutForm.value);
        }
        , (data) => {
            if(data.errorCode === 200){
                this.tokenRequest(this.twoCheckoutForm.value);
            } else {
                console.log(data.errorMsg);
            }
        }, args);
    }
    
    /**
     * Finish pay method after completing of forms filling. This method use {@link PaymentsContainerComponent}
     * @param dal DataAbstractLayer
     * @param data data to process
     * 
     * @returns {Observable} Observable of payment response
     */
    payMethod(dal, data){
        delete data.paymentForm.payMethod;
        let twoCheckOutData = {
            orderForm: data.orderForm,
            paymentForm: data.paymentForm,
            deliveryForm: data.deliveryForm   
        };
        twoCheckOutData.orderForm.totalPrice = +twoCheckOutData.orderForm.totalPrice / 100;
        twoCheckOutData.orderForm.totalPrice = "" + twoCheckOutData.orderForm.totalPrice;
        let paymentKey = dal.addPaymentRequest(data, "TWO_CHECKOUT").key;
        return dal.listenPaymentResponse(paymentKey).map(response => {
            if(response.responseCode !== undefined) {
                console.log(response.responseCode);
                if(response.responseCode === "APPROVED"){
                    data.failedPayment = false;
                    data.successPayment = true;
                } else {
                    data.successPayment = false;
                    data.failedPayment = true;
                }
                return data;
            } else {
                data.failedPayment = false;
                data.successPayment = false;
                return data;
            }
        });
    }
}