import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FilmService } from '../film.service';
import { Input } from '@angular/core';
import { Film } from '../film';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit {
  
  films: Film[];
  sortingMethod: number;
  favCount: number;
    

  transform(films: object[], sortingMethod: boolean):any {
    return this.films.sort((a:any, b:any) => {
      let x = a.name.toLowerCase();
      let y = b.name.toLowerCase();
      if (x < y) {return -1 * this.sortingMethod;}
      if (x > y) {return 1 * this.sortingMethod;}
      return 0;
    })
  }
    
  setFavFilms(like, film){
    film.isFavorite  = film.isFavorite ? true : false;
    this.favCount = this.films.filter(f => !f.isFavorite).length;
  }

  constructor(public filmsService: FilmService) {  }
    
  ngOnInit() { 
    this.getAllFilms();
  }

  getAllFilms() {
    this.films = this.filmsService.getFilms();
  }


}
