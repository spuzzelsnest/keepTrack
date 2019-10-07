import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { UserIdleModule } from 'angular-user-idle';
import * as moment from 'moment';
import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { ClockComponent } from './clock/clock.component';
import { UserComponent } from './login/user/user.component';
import { OverviewComponent } from './overview/overview.component';
import { EditComponent } from './overview/edit/edit.component';
import { AngularMaterialModule } from './angular-material.module';

registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    ClockComponent,
    UserComponent,
    OverviewComponent,
    EditComponent
  ],
  entryComponents: [
    UserComponent,
    EditComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularMaterialModule,
    UserIdleModule.forRoot({idle:10, timeout:20, ping: 12})
  ],
  providers: [
      { provide: LOCALE_ID, useValue: "es-ES" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }