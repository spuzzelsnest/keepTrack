const appRoutes: Routes = [
  {
    path: 'logs',
    component: LogComponent,
    data: { title: 'Logs List' }
  },
  {
    path: 'log-details/:id',
    component: LogDetailComponent,
    data: { title: 'Log Details' }
  },
  {
    path: 'log-add',
    component: LogAddComponent,
    data: { title: 'Log Add' }
  },
  {
    path: 'log-edit/:id',
    component: LogEditComponent,
    data: { title: 'Log Edit' }
  },
  { path: '',
    redirectTo: '/logs',
    pathMatch: 'full'
  }
];