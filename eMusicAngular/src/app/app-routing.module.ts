import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent, RegisterComponent, AuthorizationComponent, DashboardComponent, MusicComponent, ProfileComponent, CartComponent } from './components';
import { AuthGuardService } from './guards';

const routes: Routes = [
  { path: "", redirectTo: "/auth/login", pathMatch: "full"},
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
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService], children: [
      { path: "", redirectTo: "/dashboard/profile", pathMatch: "full"},
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
