import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService, FacebookLoginProvider, SocialUser } from "angularx-social-login";
import { BackgroundService } from 'src/app/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('',[Validators.required]);
  hide = true;
  user: SocialUser;
  loggedIn: boolean;

  constructor(private authService: AuthService, private backgroundService: BackgroundService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(user);
    });
  }

  signInWithFB(): void {
    let socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    this.authService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(userData);
      }
    );
  }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'You must enter a value' : '';
  }
}
