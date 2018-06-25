import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MainComponent } from './main/main.component';
import { DetailsComponent } from './details/details.component';
import { ActorItemComponent } from './film-list/actor-item/actor-item.component';
import { FilmListComponent } from './film-list/film-list.component';
import { FilmItemComponent } from './film-list/film-item/film-item.component';

import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    SweetAlert2Module.forRoot()
  ],
  declarations: [
    MainComponent, 
    FilmListComponent, 
    FilmItemComponent,
    DetailsComponent,
    ActorItemComponent
  ]
})
export class FilmCatalogModule { }
