import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClockComponent } from './clock/clock.component';
import { LogComponent } from './log/log.component';
import { LogAddComponent } from './log-add/log-add.component';
import { LogDetailComponent } from './log-detail/log-detail.component';
import { LogEditComponent } from './log-edit/log-edit.component';

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
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
