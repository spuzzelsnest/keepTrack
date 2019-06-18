import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClockComponent } from './clock/clock.component';
import { LogComponent } from './log/log.component';
import { LogAddComponent } from './log-add/log-add.component';
import { LogDetailComponent } from './log-detail/log-detail.component';
import { LogEditComponent } from './log-edit/log-edit.component';

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

@NgModule({
  declarations: [
    AppComponent,
    ClockComponent,
    LogComponent,
    LogAddComponent,
    LogDetailComponent,
    LogEditComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
