import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { FormsModule } from '@angular/forms';
import { DetailsComponent } from './details/details.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { FilmListComponent } from './film-list/film-list.component';
import { FilmItemComponent } from './film-list/film-item/film-item.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatToolbarModule,
    MatTabsModule,
    MatSelectModule,
    MatIconModule
  ],
  declarations: [
    MainComponent, 
    FilmListComponent, 
    FilmItemComponent,
    DetailsComponent
  ]
})
export class FilmCatalogModule { }
