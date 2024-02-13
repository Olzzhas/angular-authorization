import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent{

  constructor(private authService: AuthService) {

  }
  form = new FormGroup({
    email: new FormControl<string>('', [
      Validators.required,
    ]),
    password: new FormControl<string>('', [
      Validators.required,
    ])
  })

  login(){
    this.authService.login({
      email: this.form.value.email as string,
      password: this.form.value.password as string
    })
  }
}
