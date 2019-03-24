import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { SocialUser } from "angularx-social-login";
import { BackgroundService, UserService } from 'src/app/services';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Login } from 'src/app/models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FacebookRegisterModel } from 'src/app/models/facebook.register';

export interface DialogData {
  firstName: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: Date;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  hide = true;
  returnUrl: string;
  error = '';

  constructor(private backgroundService: BackgroundService, private userService: UserService, private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    this.userService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  }

  signInWithFacebook() {
    var user;
    this.userService.externalSignIn().then(externalUser => {
      user = externalUser;
      this.userService.externalLogin(externalUser).subscribe(extUser => {
        if (extUser == null) {
          this.openDialog(user).subscribe(data => {
            this.userService.externalRegister(new FacebookRegisterModel(
              user.id,
              data.email,
              data.password,
              data.confirmPassword,
              user.firstName,
              user.lastName,
              data.dateOfBirth
            )).subscribe(
              data => {
                this.router.navigate([this.returnUrl])
              },
              error => {
                this.snackBar.open(error, "Close", {
                  duration: 3000
                });
              }
            )
          });
        } else {
          this.router.navigate([this.returnUrl]);
        }
      });
    });
  }

  login() {
    this.userService.login(new Login(this.email.value, this.password.value))
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.snackBar.open(error, "Close", {
            duration: 3000
          });
        });
  }

  openDialog(user: SocialUser): Observable<any> {
    const dialogRef = this.dialog.open(EmailDialog, {
      width: '400px',
      data: { firstName: user.firstName, email: user.email }
    });

    return dialogRef.afterClosed();
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

@Component({
  selector: 'app-email-dialog',
  templateUrl: './email.dialog.html',
})
export class EmailDialog {

  form: FormGroup;
  hide = false;

  constructor(
    public dialogRef: MatDialogRef<EmailDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.maxLength(6)]],
      dateOfBirth: ['', Validators.required]
    });
  }

}