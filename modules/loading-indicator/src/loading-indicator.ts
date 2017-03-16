import { Component } from '@angular/core';

/**
 * Represent a simple loading indicator for better user expirience when some data loads.
 * Used code from {@link https://github.com/colinjlacy/angular-2-loading-indicator}
 */
@Component({
    selector: 'loading-indicator',
    templateUrl: 'loading-indicator.html'
})
export class LoadingIndicator {}

/**
 * Logic for loading indicator
 */
export class LoadingPage {
    public loading: boolean;
    constructor(val: boolean) {
        this.loading = val;
    }

    /**
     * Data loads
     */
    standby() {
        this.loading = true;
    }

    /**
     * Data ready
     */
    ready() {
        this.loading = false;
    }
}