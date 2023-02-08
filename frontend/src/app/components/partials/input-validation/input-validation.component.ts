import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const VALIDATORS_MESSAGES:any = {
  required: 'Should not be left empty!',
  email: 'Email is not valid!'
}

@Component({
  selector: 'input-validation', // removed 'app-' from the selector
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.css']
})
export class InputValidationComponent implements OnInit, OnChanges { // onChanges -> to do check validation on every change
  @Input() control!: AbstractControl;
  @Input() showErrorsWhen = true;
  errMessages: string[] = []; // fill error messages based on the error keys inside the control

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidation();
  }

  ngOnInit(): void {
    // checkValidation for value change and status change
    this.control.statusChanges.subscribe(() => {
      this.checkValidation();
    })
    this.control.valueChanges.subscribe(() => {
      this.checkValidation();
    })
  }

  checkValidation() {
    const  errors = this.control.errors;
    if(!errors) { // no errors
      this.errMessages = [];
      return;
    }

    const errKeys = Object.keys(errors); // ['required', 'email']
    this.errMessages = errKeys.map(key => VALIDATORS_MESSAGES[key]);
  }

}
