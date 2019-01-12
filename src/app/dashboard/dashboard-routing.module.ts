import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routes';
// import { AuthProtectService } from '../auth/auth-protect.service';

const routes: Routes = [
  {
    // aqui se mandan la rustas hijas
    path: '',
    component: DashboardComponent,
    children: dashboardRoutes,
    // activamos la ruta del protector de autentificado
    // canActivate: [ AuthProtectService ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
  declarations: []
})
export class DashboardRoutingModule { }
