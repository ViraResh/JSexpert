import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Observable } from "rxjs"
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { MatTabChangeEvent } from '@angular/material';

// interfaces
import { Film } from 'src/app/interfaces/film';
import { Actors } from 'src/app/interfaces/actors';

// services
import { FilmService } from '../film.service';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css'],
  // animations: [
  //   trigger('filmsAnimation', [
  //     transition('* => *', [
  //       query('mat-grid-tile',style({ transform: 'translateY(100%)'})),
  //       query('mat-grid-tile',
  //         stagger('300ms', [
  //           animate('600ms', style({ transform: 'translateY(0)'}))
  //       ]))
  //     ])
  //   ])
  // ]
})
export class FilmListComponent implements OnInit {
  sortingMethod: number;
  // favCount: number;
  changeIndex: number = 0;
  qwery: string;
  
  //obserable from filmService
  filmsData$: Array<Film>;
  actorsData$: Array<Actors>;

  //data variables of films
  filmCurrentPage: number;
  filmTotalPage: number;
  filmTotalResults: number;

  //data variables of actors
  actorCurrentPage: number;
  actorTotalPage: number;
  actorTotalResults: number;


  constructor(
    private filmsService: FilmService) {  }
    
  ngOnInit() {
    this.filmsService.getAllFilms()
    .subscribe((response:any) => {
      this.filmsData$ = response.results;
      this.filmCurrentPage = response.page;
      this.filmTotalPage = response.total_pages;
      this.filmTotalResults = response.total_results;
    },
      error => {
        console.log("error");
    }); 
    
    this.filmsService.getAllActors()
    .subscribe((response:any) => {
      this.actorsData$ = response.results;
      this.actorCurrentPage = response.page;
      this.actorTotalPage = response.total_pages;
      this.actorTotalResults = response.total_results;
    },
      error => {
        console.log("error");
    });
  } 

  //get value from search component
  getSearchValue(serchParam){
    this.qwery = serchParam;
    this.search(this.qwery);
  }

  changeLayout(event) {
    this.changeIndex = event.index;
    this.sortingMethod = 0;
    this.filmCurrentPage = 1;
    this.actorCurrentPage = 1;
    this.qwery = '';
    this.transform();
    this.search(this.qwery);
  }

  // filter by tab
  transform () {
    this.changeIndex == 0 ? this.transformFilms() : this.transformActors();
  }

  // filter films from A to Z and from Z to A
  transformFilms():any {
    this.filmsData$.sort((a:any, b:any) => {
      let x = a.title.toLowerCase();
      let y = b.title.toLowerCase();
      if (x < y) {return -1 * this.sortingMethod;}
      if (x > y) {return 1 * this.sortingMethod;}
      return 0;
    })
  }

  // filter actors from A to Z and from Z to A
  transformActors():any {
   this.actorsData$.sort((a:any, b:any) => {
      let x = a.name.toLowerCase();
      let y = b.name.toLowerCase();
      if (x < y) {return -1 * this.sortingMethod;}
      if (x > y) {return 1 * this.sortingMethod;}
      return 0;
    })
  }

  // search by tab
  search (value) {
    this.changeIndex == 0 ? this.searchFilms(value) : this.searchActors(value);    
  }

  // search films
  searchFilms(value) {
    value = value.toLowerCase().trim();
    this.filmCurrentPage = 1;
    !!this.qwery ? 
    this.filmsService.searchFilm(this.qwery, this.filmCurrentPage) : 
      this.filmsService.getAllFilms(this.filmCurrentPage);
  }

  // search actors
  searchActors(value) {
    value = value.toLowerCase().trim();
    this.actorCurrentPage = 1;
    !!this.qwery ? 
      this.filmsService.searchActors(this.qwery, this.actorCurrentPage) : 
      this.filmsService.getAllActors(this.actorCurrentPage);
  }

  nextPageFilm(){
    this.filmCurrentPage++;
    this.sortingMethod = 0; 
    !!this.qwery ? 
      this.filmsService.searchFilm(this.qwery, this.filmCurrentPage) : 
      this.filmsService.getAllFilms(this.filmCurrentPage);
    
  }

  previousPageFilm() {
    this.filmCurrentPage--;
    this.sortingMethod = 0;
    !!this.qwery ? 
      this.filmsService.searchFilm(this.qwery, this.filmCurrentPage) : 
      this.filmsService.getAllFilms(this.filmCurrentPage);
  }

  nextPageActor(){
    this.actorCurrentPage++;
    this.sortingMethod = 0;
    !!this.qwery ? 
      this.filmsService.searchActors(this.qwery, this.actorCurrentPage) : 
      this.filmsService.getAllActors(this.actorCurrentPage);
  }

  previousPageActor() {
    this.actorCurrentPage--;
    this.sortingMethod = 0;
    !!this.qwery ? 
      this.filmsService.searchActors(this.qwery, this.actorCurrentPage) : 
      this.filmsService.getAllActors(this.actorCurrentPage);
  }

 


  // filter for favorites films
  // setFavFilms(){
  //   this.favCount = this.searchArray.filter(el => el.isFavorite).length;
  // }

}
