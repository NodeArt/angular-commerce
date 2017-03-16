import { SessionFlow } from '@nodeart/session-flow/index';
import { NgModule } from '@angular/core';

import { DalModule } from '@nodeart/dal/index';
import { BasketService }   from './basket.service';

/**
 * Module that contain data and methods to work with basket
 */
@NgModule({
    imports: [DalModule],
    exports: [],
    declarations: [],
    providers: [BasketService, SessionFlow],
})
export class BasketServiceModule { }
