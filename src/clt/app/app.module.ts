import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import * as moment from 'moment';

import { MatToolbarModule,
         MatInputModule,
         MatCardModule,
         MatButtonModule,
         MatExpansionModule,
         MatDatepickerModule,
         MatNativeDateModule,
         MatTableModule,
         MatProgressSpinnerModule,
         MatDialogModule,
         MatPaginatorModule
       } from '@angular/material';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { ClockComponent } from './clock/clock.component';
import { UserComponent } from './login/user/user.component';
import { OverviewComponent } from './overview/overview.component';
import { EditComponent } from './overview/edit/edit.component';

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
    UserComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatPaginatorModule
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
