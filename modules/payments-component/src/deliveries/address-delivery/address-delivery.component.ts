import { Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { countries } from './countries';

/**
 * Address delivery form
 */
@Component({
    selector: 'address-delivery',
    templateUrl: './address-delivery.component.html',
    styleUrls: ['address-delivery.component.scss']
})
export class AddressDeliveryComponent implements OnInit {
    
    /**
     * FormGroup of address delivery form
     */
    public addressDeliveryForm: FormGroup;

    /**
     * Delivery company name
     */
    @Input() deliveryCompany: string = '';

    /**
     * Emit form when user finish to fill in it
     */
    @Output() addressDeliverySaved = new EventEmitter();
    public countries;
    constructor(protected fb: FormBuilder) {
        this.addressDeliveryForm = this.fb.group({
            country: '',
            state: '',
            zipCode: '',
            city: '',
            addrLine1: '',
            name: '',
            email: '',
            phoneNumber: '',
            deliveryCompany: this.deliveryCompany,
            additionalInfo: ''
        });
     }

    ngOnInit() { 
        this.countries = countries;
        
    }

    /**
     * Emit new form
     */
    saveDelivery() {
        this.addressDeliverySaved.next(this.addressDeliveryForm.value);
    }
}