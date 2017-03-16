import { NgModule } from '@angular/core';

import { SearchBarComponent }   from './search-bar.component';

import {ProductServiceModule} from '@nodeart/productservice/index';

/**
 * Search bar for searching products by name
 */
@NgModule({
    imports: [ProductServiceModule],
    exports: [],
    declarations: [SearchBarComponent],
    providers: [],
})
export class SearchBarModule { }
