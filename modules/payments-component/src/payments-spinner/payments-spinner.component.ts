import {Component, Input, HostBinding} from '@angular/core';

/**
 * Payments spinner for user experience when waiting for data
 */
@Component({
  selector: 'payments-spinner',
  styleUrls: ['payments-spinner.component.scss'],
  templateUrl: './payments-spinner.component.html'
})
export class PaymentsSpinnerComponent {

  /**
   * Is spinner running
   */
  @Input()
  public isRunning: boolean = false;
}
