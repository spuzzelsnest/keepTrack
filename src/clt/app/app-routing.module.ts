import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component'; 
import { LogComponent } from './log/log.component';
import { LogAddComponent } from './log-add/log-add.component';
import { LogDetailComponent } from './log-detail/log-detail.component';
import { LogEditComponent } from './log-edit/log-edit.component';

const routes: Routes = [
    {
      path:'/login',
      component: LoginComponent,
      data: { title: 'Login' }
    },
    {
    path: 'logs',
    component: LogComponent,
    data: { title: 'Logs List' }
  },
  {
    path: 'log/:id',
    component: LogDetailComponent,
    data: { title: 'Log Details' }
  },
  {
    path: 'add',
    component: LogAddComponent,
    data: { title: 'Log Add' }
  },
  {
    path: 'edit/:id',
    component: LogEditComponent,
    data: { title: 'Log Edit' }
  },
  { path: '',
    redirectTo: '/logs',
    pathMatch: 'full'
  }
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
