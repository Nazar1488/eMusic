import { Injectable } from '@angular/core';
import { AuthService, SocialUser, FacebookLoginProvider } from 'angularx-social-login';
import { Router } from '@angular/router';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user = new User();
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.authState.subscribe((externalUser) => {
      if (externalUser != null) {
        this.user.firstName = externalUser.firstName;
        this.user.lastName = externalUser.lastName;
        this.user.balance = 1000;
        this.isLoggedIn = true;
        this.router.navigate(['/dashboard']);
      }
    });
  }

  externalSignIn() {
    let socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    this.authService.signIn(socialPlatformProvider).then((user) => {
    }
    );
  }

  signOut() {
    this.isLoggedIn = false;
    this.authService.signOut();
    this.router.navigate(['/auth/login']);
  }
}
