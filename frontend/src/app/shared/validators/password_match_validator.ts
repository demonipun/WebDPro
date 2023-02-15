import { AbstractControl } from "@angular/forms"

export const PasswordsMatchValidator = (passwordControlName: string,
  confirmPasswordControlName: string) => {
    const validator = (form: AbstractControl) => {
      const passwordControl =  form.get(passwordControlName); // get a control inside a form
      const confirmPasswordControl =  form.get(confirmPasswordControlName);

      if(!passwordControl || !confirmPasswordControl) return; // bypassing the compiler error

      if(passwordControl.value !== confirmPasswordControl.value){
        confirmPasswordControl.setErrors({notMatch: true});
      }else{
        const errors = confirmPasswordControl.errors;
        if(!errors) return;

        delete errors['notMatch'];
        confirmPasswordControl.setErrors(errors);
      }
    }
    return validator;
  }
