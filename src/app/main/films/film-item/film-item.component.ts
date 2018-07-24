import { Component, OnInit, Input, Injectable, Output, EventEmitter, Inject } from '@angular/core';


import { FavoriteService } from 'src/app/services/favorite.service';

import { apiConfig, API_CONFIG } from '../../../api.config'

import { Film } from 'src/app/interfaces/film';
import { FilmService } from 'src/app/main/films/film.service';


@Component({
  selector: 'app-film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.css']
})
export class FilmItemComponent implements OnInit {

  @Input() filmItem: Film;
  @Input() filmImg: any;
  // @Output() add = new EventEmitter();

  startPath: any;
  size: string = '/w500';

  constructor( @Inject(API_CONFIG)
  public apiConfig,
    private filmService: FilmService,
    private favService: FavoriteService) { }

  ngOnInit() {
    this.startPath = this.apiConfig.imgPath;
  }

  // add to favorites on click
  addToFavorite() {
    this.filmItem.favorite = !this.filmItem.favorite;
    this.filmItem.favorite ?
      this.favService.addFavor(this.filmItem.id)
        .subscribe(() => this.filmItem.favorite = true) :
      this.favService.dellFavor(this.filmItem.id)
        .subscribe(() => this.filmItem.favorite = false);
    // this.add.emit(this.filmItem.favorite);
  }

  public get isFavorite(): string {
    return this.filmItem.favorite ? ' deleted from ' : ' added to '
  }

}
