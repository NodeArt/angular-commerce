import { ProductsGeneralComponent } from './products-general.component';
import { NgModule } from '@angular/core';
import { ProductServiceModule } from '@nodeart/productservice/index';
import { CategoryFilterModule } from '@nodeart/category-filter-component';
import {GeneralCategoryAllModule} from '@nodeart/general-categories-all';
import { CommonModule } from '@angular/common';
/**
 * Represent page with products from general category
 */
@NgModule({
    imports: [ProductServiceModule, CommonModule, CategoryFilterModule, GeneralCategoryAllModule],
    exports: [ProductsGeneralComponent],
    declarations: [ProductsGeneralComponent],
    providers: [],
})
export class ProductsGeneralModule { }
