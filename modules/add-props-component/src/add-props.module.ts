import { ProductServiceModule } from '@nodeart/productservice';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AddPropsComponent }   from './add-props.component';
/**
 * It's a simple form to add properties (categories, attributes, tags) to database 
 */
@NgModule({
    imports: [ProductServiceModule, FormsModule, CommonModule, ReactiveFormsModule],
    exports: [AddPropsComponent],
    declarations: [AddPropsComponent],
    providers: [],
})
export class AddPropsModule { }
