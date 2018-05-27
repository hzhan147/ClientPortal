import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import { HeaderComponent } from './header/header.component';
import { ActivityFormComponent } from './activity-form/activity-form.component';
import {DataStorageService} from "./data-storage.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ActivityFormComponent
  ],
  imports: [
    FormsModule,
    HttpModule,
    BrowserModule
  ],
  providers: [DataStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
