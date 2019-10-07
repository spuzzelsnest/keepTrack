import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { OverviewComponent } from './overview/overview.component';

//import { AuthGuardService as AuthGuard } from './guards/auth-guard.service';

const routes: Routes = [
  {
    path:'login',
    component: LoginComponent
  },{
    path: ':key/logs',
    component: OverviewComponent,
    //canActivate: [AuthGuard]
  },{
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },{
    path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }