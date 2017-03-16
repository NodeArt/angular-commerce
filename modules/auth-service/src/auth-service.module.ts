import { AuthService } from './auth.service';
import { NgModule } from '@angular/core';
import { DalModule } from '@nodeart/dal/index';
import { SessionFlow } from '@nodeart/session-flow/index';

/**
 * Auth service module provide methods and data to work with authentication
 */
@NgModule({
    imports: [DalModule],
    exports: [],
    declarations: [],
    providers: [AuthService, SessionFlow],
})
export class AuthServiceModule {}
