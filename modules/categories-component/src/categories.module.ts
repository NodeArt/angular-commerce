import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent }   from './categories.component';
import { ProductServiceModule } from '@nodeart/productservice';
/**
 * Categories module. Display store categories
 */
@NgModule({
    imports: [CommonModule, ProductServiceModule],
    exports: [CategoriesComponent],
    declarations: [CategoriesComponent],
    providers: [],
})
export class CategoriesModule { }
