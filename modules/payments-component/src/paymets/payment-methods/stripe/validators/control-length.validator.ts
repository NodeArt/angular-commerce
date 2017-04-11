import {FormControl} from "@angular/forms";

export function controlLengthValidator(length: number) {
  return (control: FormControl): {[key: string]: any} => {
    if(control.value && control.value.length !== length) {
      return { validLength: { valid: false } }
    } else {
      return null;
    }
  }
}