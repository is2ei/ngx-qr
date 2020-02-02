import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { NgxQrModule } from 'ngx-qr';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxQrModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
