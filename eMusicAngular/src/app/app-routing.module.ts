import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent, RegisterComponent, AuthorizationComponent, DashboardComponent, MusicComponent, ProfileComponent, CartComponent } from './components';
import { AuthGuardService } from './guards';

const routes: Routes = [
  {
    path: 'auth', component: AuthorizationComponent, children: [
      { path: "", redirectTo: "/auth/login", pathMatch: "full"},
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      }
    ]
  },
  {
    path: '', component: DashboardComponent, canActivate: [AuthGuardService], children: [
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'cart',
        component: CartComponent
      },
      {
        path: 'music',
        component: MusicComponent
      }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
