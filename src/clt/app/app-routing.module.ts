import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component'; 
import { LogComponent } from './log/log.component';
import { LogAddComponent } from './log-add/log-add.component';
import { LogEditComponent } from './log-edit/log-edit.component';

const routes: Routes = [
    {
      path:'login',
      component: LoginComponent,
      data: { title: 'Login' }
    },{
    path: ':key/logs',
    component: LogComponent,
    data: { title: 'Logs List' }
  },{
    path: 'add',
    component: LogAddComponent,
    data: { title: 'Log Add' }
  },{
    path: 'edit/:id',
    component: LogEditComponent,
    data: { title: 'Log Edit' }
  },{ path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
