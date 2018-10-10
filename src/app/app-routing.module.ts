import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { dashboardRoutes } from './dashboard/dashboard.routes';
import { AuthProtectService } from './auth/auth-protect.service';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    // aqui se mandan la rustas hijas
    path: '',
    component: DashboardComponent,
    children: dashboardRoutes,
    // activamos la ruta del protector de autentificado
    canActivate: [ AuthProtectService ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({

  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]

})
export class AppRoutingModuel {}
