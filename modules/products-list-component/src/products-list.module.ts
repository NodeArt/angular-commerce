import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ProductsListComponent } from './products-list.component';
import { ProductServiceModule } from '@nodeart/productservice/index';
import { AttributesSearchModule } from '@nodeart/attributes-search-component';
import { TagsSearchModule } from '@nodeart/tags-search-component';
/**
 * Display products from specific category
 */
@NgModule({
    imports: [ProductServiceModule, BrowserModule, AttributesSearchModule, TagsSearchModule],
    exports: [ProductsListComponent],
    declarations: [ProductsListComponent],
    providers: [],
})
export class ProductsListModule { }
