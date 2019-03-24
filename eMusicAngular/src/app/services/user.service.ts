import { Injectable } from '@angular/core';
import { AuthService, SocialUser, FacebookLoginProvider } from 'angularx-social-login';
import { Router } from '@angular/router';
import { User, Register, Login } from '../models';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FacebookRegisterModel } from '../models/facebook.register';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "https://localhost:44370/api";
  user = new User();
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {
  }

  externalSignIn() : Promise<SocialUser> {
    let socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    return this.authService.signIn(socialPlatformProvider);
  }

  externalLogin(socialUser: SocialUser) {
    return this.http.post<any>(`${this.apiUrl}/authorization/facebooklogin`,
      {
        UserId: socialUser.id
      })
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      }));
  }

  externalRegister(registerModel: FacebookRegisterModel) {
    return this.http.post<any>(`${this.apiUrl}/authorization/facebookregister`,
      {
        UserId: registerModel.userId,
        Email: registerModel.email,
        Password: registerModel.password,
        ConfirmPassword: registerModel.confirmPassword,
        FirstName: registerModel.firstName,
        LastName: registerModel.lastName,
        DateOfBirth: registerModel.dateOfBirth
      })
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      }));
  }

  register(registerModel: Register) {
    return this.http.post<any>(`${this.apiUrl}/authorization/register`,
      {
        Email: registerModel.email,
        Password: registerModel.password,
        ConfirmPassword: registerModel.confirmPassword,
        FirstName: registerModel.firstName,
        LastName: registerModel.lastName,
        DateOfBirth: registerModel.dateOfBirth
      })
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      }));
  }

  login(loginModel: Login) {
    return this.http.post<any>(`${this.apiUrl}/authorization/login`, { Email: loginModel.email, Password: loginModel.password })
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      }));
  }

  logout() {
    if (!this.authService.authState) {
      this.authService.signOut();
    }
    localStorage.removeItem('currentUser');
  }
}
