import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent, RegisterComponent, MyMusicComponent, AuthorizationComponent, DashboardComponent, MusicComponent, ProfileComponent, CartComponent, AdminPanelComponent } from './components';
import { AuthGuardService } from './guards';
import { InfoComponent } from './components/dashboard/music/track/info/info.component';
import { RoleGuardService } from './guards/role-guard.service';

const routes: Routes = [
  {
    path: 'auth', component: AuthorizationComponent, children: [
      { path: "", redirectTo: "/auth/login", pathMatch: "full" },
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
        path: '',
        redirectTo: "/profile", 
        pathMatch: "full"
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'mymusic',
        component: MyMusicComponent
      },
      {
        path: 'cart',
        component: CartComponent
      },
      {
        path: 'music',
        component: MusicComponent
      },
      {
        path: 'info/:id',
        component: InfoComponent
      },
      {
        path: 'admin', component: AdminPanelComponent, canActivate: [RoleGuardService]
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
