import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
<<<<<<< HEAD
    path: 'add',
=======
    path: 'log/add',
>>>>>>> 209e556e85d5ef9c78556ecd6e27ba0871a68582
    component: LogAddComponent,
    data: { title: 'Log Add' }
  },
  {
<<<<<<< HEAD
    path: 'edit/:id',
=======
    path: 'log/:id',
>>>>>>> 209e556e85d5ef9c78556ecd6e27ba0871a68582
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
