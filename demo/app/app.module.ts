import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {
  TsDocumentService,
  TsWindowService,
} from '@terminus/ngx-tools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChildComponent } from './child/child.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    TsWindowService,
    TsDocumentService,
  ],
  declarations: [
    AppComponent,
    ChildComponent,
    HomeComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
