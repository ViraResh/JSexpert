import { Component, OnInit, Input, Injectable, Output, EventEmitter } from '@angular/core';
import { Film } from '../../film';

@Component({
  selector: 'app-film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.css']
})
export class FilmItemComponent implements OnInit {
  @Input() filmItem:Film;
  @Output() add = new EventEmitter();

  //add to favoriteson click and send to parent component "add" output
  addToFavorite(){
    this.filmItem.isFavorite = !this.filmItem.isFavorite;
    this.add.emit(this.filmItem.isFavorite);
  }

  public get isFavorite(): string {
    return this.filmItem.isFavorite ? ' deleted from ' : ' added to '
  }

  constructor() {}
  
  ngOnInit() {}

}
