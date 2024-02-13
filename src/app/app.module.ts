import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import {provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";
import {authInterceptor} from "./http-interceptors/auth.interceptor";
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";
import { TweetsComponent } from './components/tweets/tweets.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    SignupComponent,
    TweetsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideHttpClient(withFetch()),
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
