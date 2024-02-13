import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  constructor(private authService: AuthService) {}


  form = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required,
    ]),
    email: new FormControl<string>('', [
      Validators.required,
    ]),
    password: new FormControl<string>('', [
      Validators.required,
    ]),
    age: new FormControl<string>('', [
      Validators.required,
    ]),
  })

  register(){
    return this.authService.register({
      name: this.form.value.name as string,
      age: this.form.value.age as string,
      password: this.form.value.password as string,
      email: this.form.value.email as string,
    })
  }

}
