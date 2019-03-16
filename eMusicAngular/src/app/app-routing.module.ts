import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent, RegisterComponent, AuthorizationComponent, DashboardComponent } from './components';
import { AuthGuardService } from './guards';

const routes: Routes = [
  { path: "", redirectTo: "/auth/login", pathMatch: "full"},
  {
    path: 'auth', component: AuthorizationComponent, children: [
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
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
