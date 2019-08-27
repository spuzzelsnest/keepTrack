import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { OverviewComponent } from './overview/overview.component';
import { EditComponent } from './overview/edit/edit.component';



const routes: Routes = [
  {
    path:'login',
    component: LoginComponent
  },{
    path: ':key/logs',
    component: OverviewComponent
  },{
    path: ':key/logs/:logid',
    component: EditComponent
  },{
    path: ':key/add',
    component: EditComponent
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