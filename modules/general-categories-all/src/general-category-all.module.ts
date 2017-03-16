import { GeneralCategoryAllComponent } from './general-category-all.component';
import { NgModule } from '@angular/core';
import { ProductServiceModule } from '@nodeart/productservice/index';
import { LoadingIndicatorModule } from '@nodeart/loading-indicator';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

/**
 * Include GeneralCategoryAllComponent that display all products from general category or products from child category
 */
@NgModule({
    imports: [
        CommonModule,
        ProductServiceModule,
        LoadingIndicatorModule,
        RouterModule
    ],
    exports: [GeneralCategoryAllComponent],
    declarations: [GeneralCategoryAllComponent],
    providers: [],
})
export class GeneralCategoryAllModule { }
