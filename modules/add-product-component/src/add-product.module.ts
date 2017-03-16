import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AddProductComponent }   from './add-product.component';
import { ProductServiceModule } from '@nodeart/productservice';
import { CommonModule } from '@angular/common';

/**
 * It's a simple form to add products to database
 */
@NgModule({
    imports: [ProductServiceModule, FormsModule, CommonModule, ReactiveFormsModule],
    exports: [AddProductComponent],
    declarations: [AddProductComponent],
    providers: []
})
export class AddProductModule { }
