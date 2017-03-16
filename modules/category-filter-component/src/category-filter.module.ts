import { CategoryFilterComponent } from './category-filter.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
/**
 * Exports {@link CategoryFilterComponent} that has a select input with categories that user inject.
 */
@NgModule({
    imports: [CommonModule],
    exports: [CategoryFilterComponent],
    declarations: [CategoryFilterComponent],
    providers: [],
})
export class CategoryFilterModule { }
