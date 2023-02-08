import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'text-input', // selector renamed 'text-input' from 'app-text-input'
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements OnInit {
  // Combining input-container, input and input-validation to create text-input
  @Input() control!:AbstractControl; // input AND input-validation
  @Input() showErrorsWhen:boolean = true;
  @Input() label!: string; // input-container
  @Input() type: 'text' | 'password' | 'email' = 'text'; // one of the features of TS(TypeScript) that it can be one of the three types only
  constructor() { }

  get formControl() {
    return this.control as FormControl;
  }

  ngOnInit(): void {
  }

}
