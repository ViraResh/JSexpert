import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { FilmCatalogModule } from './film-catalog/film-catalog.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';

import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

import { MainCatalogModule } from 'src/app/main/main-catalog.module';
import { API_CONFIG, apiConfig } from './api.config';
// import { FilmsComponent } from './films/films.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule, 
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    InfiniteScrollModule,
    SweetAlert2Module.forRoot(),
    MainCatalogModule
  ],
  providers: [
    {provide: API_CONFIG, useValue: apiConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

