import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  // we cannot use Reactive forms inside html file unless we import Reactive Forms Module inside the app routing module

  // we need to send data to the server using Angular Reactive Forms
  // REACTIVE FORMS
  loginForm!: FormGroup;
  isSubmitted = false;

  // FormBuilder is a type of Angular form
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // after injecting FormBuilder, we can build the login form
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], // email form control
      password: ['', Validators.required]
    })
    // loginForm.controls.email === fc['email']
  }

  get fc() { // fc === form controls
    return this.loginForm.controls;
  }

  submit() {
    this.isSubmitted = true;
    if(this.loginForm.invalid) {
      return ;
    }

    // to show the email and password if the form is successfully submitted
    alert(`email: ${this.fc['email'].value},
           password: ${this.fc['password'].value}`);
  }

}
