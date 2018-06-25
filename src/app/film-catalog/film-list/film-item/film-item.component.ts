import { Component, OnInit, Input, Injectable, Output, EventEmitter } from '@angular/core';

import { FilmService } from 'src/app/film-catalog/film.service';
import { Film } from 'src/app/interfaces/film';

@Component({
  selector: 'app-film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.css']
})

export class FilmItemComponent implements OnInit {
  @Input() filmItem: Film;
  @Input() filmImg:any;
  @Output() add = new EventEmitter();

  startPath: any;
  size: string = '/w500';

  constructor(private filmService: FilmService) { }
  
  ngOnInit() {
    this.startPath = this.filmService.imgPath;
  }


  //add to favoriteson click and send to parent component to "add" output
  // addToFavorite(){
  //   this.filmItem.isFavorite = !this.filmItem.isFavorite;
  //   this.add.emit(this.filmItem.isFavorite);
  // }

  // public get isFavorite(): string {
  //   return this.filmItem.isFavorite ? ' deleted from ' : ' added to '
  // }

}
