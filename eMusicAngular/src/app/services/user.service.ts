import { Injectable } from '@angular/core';
import { AuthService, SocialUser, FacebookLoginProvider } from 'angularx-social-login';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  externalUser: SocialUser;
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.authState.subscribe((user) => {
      this.externalUser = user;
      if (user != null) {
        this.isLoggedIn = true;
        this.router.navigate(['/dashboard']);
      }
    });
  }

  externalSignIn() {
    let socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    this.authService.signIn(socialPlatformProvider).then((user) => {
      console.log(user);
    }
    );
  }

  signOut() {
    this.isLoggedIn = false;
    this.authService.signOut();
    this.router.navigate(['/auth/login']);
  }
}
