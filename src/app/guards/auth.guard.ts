import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, CanActivateFn, RouterStateSnapshot, UrlTree, Router} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "../services/auth.service";
import {RateLimitterService} from "../services/rate-limitter.service";


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService, private rateLimitter: RateLimitterService) {
  }
  canActivate(){
    if (localStorage.getItem("accessToken")){
      this.authService.checkAuth()
      console.log("Token Refreshed Successfully!")
      return true;
    }

    this.router.navigate(['login'])
    return false;
  }
}




