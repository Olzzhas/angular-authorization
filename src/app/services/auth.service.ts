import { Injectable } from '@angular/core';
import {IUser} from "../models/user.model";
import {HttpClient} from "@angular/common/http";
import {IAuthResponse} from "../models/auth-response.model";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {RateLimitterService} from "./rate-limitter.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router, private rateLimitterService: RateLimitterService) { }

  login(data: IUser): Observable<IAuthResponse>{
    this.http?.post<IAuthResponse>(`http://localhost:5000/user/login`, data, {withCredentials: true}).subscribe(userData =>{
      console.log(userData)
      localStorage.setItem('accessToken', userData.accessToken)
      localStorage.setItem('currentUserID', userData.user.id)
      localStorage.setItem('currentUserEmail', userData.user.email)

      this.router.navigate(['tweets'])
      return {
        accessToken: userData.accessToken,
        refreshToken: userData.refreshToken,
        user:{
          id: userData.user.id,
          email: userData.user.email
        }
      }
    })

    localStorage.removeItem('accessToken')
    localStorage.removeItem('currentUserID')
    localStorage.removeItem('currentUserEmail')
    return new Observable<IAuthResponse>()
  }

  register(data: object): Observable<IAuthResponse> | undefined{
    this.http?.post<any>('http://localhost:5000/user/create', data, {withCredentials: true}).subscribe(userData => {
      localStorage.setItem('accessToken', userData.accessToken)
      localStorage.setItem('currentUserID', userData.user.id)
      localStorage.setItem('currentUserEmail', userData.user.email)

      return {
        accessToken: userData.accessToken,
        refreshToken: userData.refreshToken,
        user:{
          id: userData.user.id,
          email: userData.user.email
        }
      }
    })

    localStorage.removeItem('accessToken')
    localStorage.removeItem('currentUserID')
    localStorage.removeItem('currentUserEmail')
    return new Observable<IAuthResponse>()
  }

  logout(){
    return this.http?.post<any>('http://localhost:5000/user/logout', {}, {withCredentials: true}).subscribe(()=>{
      this.router.navigate(['login'])
      localStorage.removeItem('accessToken')
      localStorage.removeItem('currentUserID')
      localStorage.removeItem('currentUserEmail')
    })
  }

  checkAuth(): any{
    this.rateLimitterService.onRequestAllowed().subscribe(() => {
      this.http?.get<IAuthResponse>(`http://localhost:5000/user/refresh`, {withCredentials: true}).subscribe(userData =>{
          localStorage.setItem('accessToken', userData.accessToken)
          localStorage.setItem('currentUserID', userData.user.id)
          localStorage.setItem('currentUserEmail', userData.user.email)

        console.log('1')
          return {
            accessToken: userData.accessToken,
            refreshToken: userData.refreshToken,
            user:{
              id: userData.user.id,
              email: userData.user.email
            }
          }

        }

      )

      return null;
    });
    this.rateLimitterService.triggerRequest()
  }

}
