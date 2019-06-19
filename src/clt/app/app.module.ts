import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule,
         MatInputModule,
         MatCardModule,
         MatButtonModule,
         MatExpansionModule,
         MatDatepickerModule,
         MatNativeDateModule
       } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { ClockComponent } from './clock/clock.component';
import { LogComponent } from './log/log.component';
import { LogAddComponent } from './log-add/log-add.component';
import { LogEditComponent } from './log-edit/log-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    ClockComponent,
    LogComponent,
    LogAddComponent,
    LogEditComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
