import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsSearchComponent }   from './tags-search.component';
import { ProductServiceModule } from '@nodeart/productservice';
/**
 * Filter products by tags
 */
@NgModule({
    imports: [ProductServiceModule, CommonModule],
    exports: [TagsSearchComponent],
    declarations: [TagsSearchComponent],
    providers: [],
})
export class TagsSearchModule { }
