import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
@Injectable()
export class PaymentsService {

    public orderSubject: Subject<any>;

    constructor(){
        this.orderSubject = new Subject();
    }
}