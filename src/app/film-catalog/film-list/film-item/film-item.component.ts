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


  addToFavorite(){
    this.filmItem.isFavorite = !this.filmItem.isFavorite;
    this.add.emit(this.filmItem.isFavorite);
  }

  constructor() {}
  
  ngOnInit() {}

}
