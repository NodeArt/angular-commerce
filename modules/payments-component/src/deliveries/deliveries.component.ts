import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

/**
 * Container of deliveries 
 */
@Component({
    selector: 'deliveries',
    templateUrl: './deliveries.component.html',
    styleUrls: ['deliveries.component.scss']
})
export class DeliveriesComponent implements OnInit{
    
    /**
     * Delivery form
     */
    public deliveryForm : FormGroup;
    
    /**
     * Available delivery methods. You can inject array with those delivery methods: 
     * ```
     * 'PICK',
     * 'ADDRESS_DELIVERY'
     * ```
     * For default all methods are injected. 
     *
     */
    @Input() deliveryMethods = [
        'PICKUP',
        'ADDRESS_DELIVERY'
    ];

    /**
     * Delivery methods information array
     */
    deliveryMethodsObjects = [
        {
            name: 'PICKUP',
            value: 'Pick up'
        },
        {
            name: 'ADDRESS_DELIVERY',
            value: 'Address delivery'
        }
    ];

    constructor(fb: FormBuilder){
        this.deliveryForm = fb.group({
            deliveryMethod: '',
            deliveryData: {}
        });
        
    }

    ngOnInit(){
        this.deliveryMethodsObjects = this.deliveryMethods.map( method => {
            for (let i = 0; i < this.deliveryMethodsObjects.length; i++){
                if(this.deliveryMethodsObjects[i].name === method) {
                    return this.deliveryMethodsObjects[i];
                }
            }
        });
    }
    
    setDelivery(){

    }
}