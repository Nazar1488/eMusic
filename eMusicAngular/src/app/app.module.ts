import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule } from '@angular/material/dialog';
import { FacebookModule } from 'ngx-facebook';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider } from "angularx-social-login";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {
  LoginComponent,
  RegisterComponent,
  DashboardComponent,
  AuthorizationComponent,
  MusicComponent,
  ProfileComponent,
  CartComponent,
  TrackComponent,
  PlayerComponent,
  CartTrackComponent,
  EmailDialog,
  InfoComponent,
  AdminPanelComponent
} from './components/';

import { UserService, BackgroundService, MusicService, CartService } from './services/';

import { MustMatchDirective } from './directives';

import { AuthGuardService } from './guards';

import { JwtInterceptor, ErrorInterceptor } from './helpers';
import { UserComponent } from './components/dashboard/admin-panel/user/user.component';
import { RoleGuardService } from './guards/role-guard.service';

let config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("1619950191482099")
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    AuthorizationComponent,
    MustMatchDirective,
    MusicComponent,
    ProfileComponent,
    CartComponent,
    PlayerComponent,
    TrackComponent,
    CartTrackComponent,
    EmailDialog,
    InfoComponent,
    AdminPanelComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    SocialLoginModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatProgressBarModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatSliderModule,
    HttpClientModule,
    MatDialogModule,
    MatTabsModule,
    MatRadioModule,
    MatSelectModule,
    FacebookModule.forRoot()
  ],
  providers: [
    UserService,
    BackgroundService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    MatDatepickerModule,
    AuthGuardService,
    RoleGuardService,
    MusicService,
    CartService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [ EmailDialog ]
})
export class AppModule { }
