import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  template: `
    <mat-card>
      <mat-card-title>Login</mat-card-title>
      <mat-card-content>
        <form [formGroup]="form" (ngSubmit)="loginEmail()">
          <p>
            <mat-input-container>
              <input type="text" matInput placeholder="Email" formControlName="email">
            </mat-input-container>
          </p>

          <p>
            <mat-input-container>
              <input type="password" matInput placeholder="Password" formControlName="password">
            </mat-input-container>
          </p>

          <p *ngIf="errorMessage" class="loginError">
            {{ errorMessage }}
          </p>

          <p class="loginButtons">
            <button type="submit" mat-button>Login</button>
            <button type="button" mat-button (click)="loginOAuth('google')">G+</button>
            <button type="button" mat-button (click)="loginOAuth('facebook')">FB</button>
          </p>

        </form>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      :host {
        display: flex;
        justify-content: center;
        margin: 72px 0;
      }

      mat-card-title,
      mat-card-content {
        display: flex;
        justify-content: center;
      }

      mat-input-container {
        width: 100%;
      }

      input {
        width: 100%;
      }

      .loginError {
        padding: 16px;
        width: 300px;
        font-color: white;
        background-color: red;
      }

      .loginButtons {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
      }
    `,
  ],
})
export class LoginFormComponent {

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  @Input() errorMessage: string | null;

  @Output() submitted = new EventEmitter<{ type: string, payload?: any }>();

  public form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  public loginEmail() {
    if (this.form.valid) {
      this.submitted.emit({
        type: 'email',
        payload: this.form.value,
      });
    }
  }

  public loginOAuth(type: string) {
    this.submitted.emit({
      type
    });
  }
}
