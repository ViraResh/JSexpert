import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FilmService } from '../film.service';
import { Input } from '@angular/core';
import { SearchFilterPipe } from '../search-filter.pipe'
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
  show: number = 3;
  qwery: string;
  searchArray: Film[];
  // filter from A to Z and from Z to A
  transform(films: object[], sortingMethod: boolean):any {
    return this.films.sort((a:any, b:any) => {
      let x = a.name.toLowerCase();
      let y = b.name.toLowerCase();
      if (x < y) {return -1 * this.sortingMethod;}
      if (x > y) {return 1 * this.sortingMethod;}
      return 0;
    })
  }
  // filter search  
  search(value) {
    value = value.toLowerCase().trim();
    value.length <= 2 ? this.films = this.searchArray :
    this.films = this.searchArray.filter((item) =>  item.name.toLowerCase().indexOf(value) !== -1);
    console.log()
  }
  // filter for favorites films
  setFavFilms(){
    this.favCount = this.searchArray.filter(el => el.isFavorite).length;
  }
  
  animation(e){
    console.log(e);
    console.log(this.show);
    console.log(this.films)
  } 

  constructor(public filmsService: FilmService) {  }
    
  ngOnInit() { 
    this.getAllFilms();
    this.setFavFilms();
  }
  // get data from service
  getAllFilms() {
    this.films = this.filmsService.getFilms();
    this.searchArray = this.films;
  }


}
