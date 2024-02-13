import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit{

  constructor(private authService: AuthService) {
  }

  users: any[] = []
  ngOnInit(): void {
    // this.userService.getUser().subscribe(users=>{
    //   console.log(users)
    // })
  }

  getUsers(){
    // this.userService.getUser().subscribe(users=>{
    //   console.log(users)
    // })
    this.authService.logout()
    // console.log(localStorage.getItem("accessToken"))
  }

  test(){
    // console.log(`access token token: ${localStorage.getItem('accessToken')}`)
    // console.log(`email: ${localStorage.getItem('currentUserEmail')}`)

    this.authService.checkAuth()
  }

  // test(){
  //
  // }

}
