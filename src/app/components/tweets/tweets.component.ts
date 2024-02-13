import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrl: './tweets.component.scss'
})
export class TweetsComponent {
  constructor(private authService: AuthService) {
  }

  logout(){
    this.authService.logout()
  }
}
