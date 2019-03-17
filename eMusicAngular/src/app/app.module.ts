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
import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider } from "angularx-social-login";

import {
  LoginComponent,
  RegisterComponent,
  DashboardComponent,
  AuthorizationComponent,
  MusicComponent,
  ProfileComponent,
  CartComponent
} from './components/';

import { UserService, BackgroundService } from './services/';
import { MustMatchDirective } from './directives';
import { MatNativeDateModule } from '@angular/material/core';
import { AuthGuardService } from './guards';
import { PlayerComponent } from './components/dashboard/player/player.component';
import { MusicService } from './services/music.service';

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
    PlayerComponent
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
    MatProgressBarModule
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
    MusicService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
