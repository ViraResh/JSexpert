import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

import { SharedModule } from 'src/app/shared/shared.module';

import { HomeComponent } from 'src/app/home/home.component';
import { MainComponent } from 'src/app/main/main.component';
import { FilmsComponent } from 'src/app/main/films/films.component';
import { FilmItemComponent } from 'src/app/main/films/film-item/film-item.component';
import { ActorsComponent } from 'src/app/main/actors/actors.component';
import { ActorItemComponent } from 'src/app/main/actors/actor-item/actor-item.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    SweetAlert2Module.forRoot()
  ],
  declarations: [
    HomeComponent, 
    MainComponent,
    FilmsComponent, 
    FilmItemComponent,
    ActorsComponent,
    ActorItemComponent
  ]
})
export class MainCatalogModule { }
