import { LoadingIndicator } from './loading-indicator';
import { NgModule } from '@angular/core';


/**
 * Exports {@link LoadingIndicator} that represent a simple loading indicator for better user expirience when some data loads.
 * Used code from {@link https://github.com/colinjlacy/angular-2-loading-indicator}
 */
@NgModule({
    imports: [],
    exports: [LoadingIndicator],
    declarations: [LoadingIndicator],
    providers: [],
})
export class LoadingIndicatorModule { }
