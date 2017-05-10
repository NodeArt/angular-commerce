import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttributesSearchComponent }   from './attributes-search.component';
import { ProductServiceModule } from '@nodeart/productservice';

/**
 * Attribute Search Module
 */
@NgModule({
    imports: [CommonModule, ProductServiceModule, RouterModule],
    exports: [AttributesSearchComponent],
    declarations: [AttributesSearchComponent],
    providers: [],
})
export class AttributesSearchModule { }
