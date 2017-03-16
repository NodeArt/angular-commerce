import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

/**
 * Component that contain different types of payments and pass data to {@link PaymentsContainerComponent}
 */
@Component({
    selector: 'payments',
    templateUrl: './payments.component.html',
    styleUrls: ['payments.component.scss']
})
export class PaymentsComponent implements OnInit{

    /**
     * Available payment methods. You can inject array with those payyment methods: 
     * ```
     * 'TWO_CHECKOUT',
     * 'STRIPE'
     * ```
     * For default all methods are injected. 
     *
     */
    @Input() public paymentMethods = [
        'TWO_CHECKOUT',
        'STRIPE'
    ];

    /**
     * Payment methods information array
     */
    public paymentMethodsObjects = {
        TWO_CHECKOUT: {
            name: 'TWO_CHECKOUT',
            value: '2Checkout'
        },
        STRIPE: {
            name: 'STRIPE',
            value: 'Stripe'
        }
    };
    
    /**
     * EventEmitter of payment form
     */
    @Output() paymentSaved = new EventEmitter();

    public paymentMethodsArray = [];

    /**
     * Payments form
     */
    public paymentsForm: FormGroup;

    /**
     * Default payment method
     */
    @Input() public selectedMethod = '';

    /**
     * Glag to show payments list
     */
    public showPaymentsList = true;

    constructor(fb: FormBuilder){
        this.paymentsForm = fb.group({
        });
    }

    ngOnInit(){
        this.selectedMethod = '';
        for (let i = 0; i < this.paymentMethods.length; i++){
            if(this.paymentMethodsObjects.hasOwnProperty(this.paymentMethods[i])){
                let currMethod = this.paymentMethods[i];
                this.paymentMethodsArray.push(this.paymentMethodsObjects[currMethod]);
            }
        }
        console.log(this.paymentMethodsArray);
    }

    /**
     * Set current selected method
     * @param methodName payment method name
     */
    setSelectedMethod(methodName){
        console.log(methodName);
        this.selectedMethod = methodName;
    }

    /**
     * Emit new payment form after filling it
     * @param paymentForm payment form FormGroup
     */
    nextStep(paymentForm) {
        paymentForm.paymentMethod = this.selectedMethod;
        console.log(paymentForm);
        this.paymentSaved.next(paymentForm);
    }
}