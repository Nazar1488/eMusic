import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService, FacebookLoginProvider, SocialUser } from "angularx-social-login";
import { BackgroundService, UserService } from 'src/app/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('',[Validators.required]);
  hide = true;
  loggedIn: boolean;

  constructor(private backgroundService: BackgroundService, private userService: UserService) { }

  ngOnInit() {
  }

  signInWithFacebook() {
    this.userService.externalSignIn();
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
