import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { LogComponent } from './log/log.component';
import { LogAddComponent } from './log-add/log-add.component';


const routes: Routes = [
  {
    path:'login',
    component: LoginComponent
  },{
    path: ':key/logs',
    component: LogComponent
  },{
    path: ':key/logs/:logid',
    component: LogComponent
  },{
    path: ':key/add',
    component: LogAddComponent
  },{ 
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }