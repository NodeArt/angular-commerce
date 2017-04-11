import {AbstractControl} from "@angular/forms";

export function onlyNumberValidator(control: AbstractControl): {[key: string]: any} {
  let NUMBER_REGEXP = /^[0-9]+$/;
  if (control.value && !NUMBER_REGEXP.test(control.value)) {
    return {
      validNumber: {
        valid: false
      }
    };
  }
}
