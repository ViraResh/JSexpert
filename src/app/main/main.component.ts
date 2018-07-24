import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { Film } from 'src/app/interfaces/film';
import { Actors } from 'src/app/interfaces/actors';
import { FilmService } from 'src/app/main/films/film.service';
import { ActorService } from 'src/app/main/actors/actor.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  sortingMethod: number;
  // favCount: number;
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


  constructor(private router: Router,
    private filmsService: FilmService,
    private actorService: ActorService) { }

  ngOnInit() {
    this.filmsService.getAllFilms()
      .subscribe((response: any) => {
        this.filmsData$ = response.results;
        this.filmCurrentPage = response.page;
        this.filmTotalPage = response.total_pages;
        this.filmTotalResults = response.total_results;
        console.log(response, "response")
      },
      error => {
        console.log("error");
      });

    this.actorService.getAllActors()
      .subscribe((response: any) => {
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
  getSearchValue(serchParam) {
    this.qwery = serchParam;
    this.search(this.qwery);
  }

  // search by tab
  search(value) {
    this.router.url == '/films' ? this.searchFilms(value) : this.searchActors(value);
  }

  // search films
  searchFilms(value) {
    value = value.toLowerCase().trim();
    this.filmCurrentPage = 1;
    this.filmsService.searchFilm(this.qwery, this.filmCurrentPage)
    // !!this.qwery ?
    //   this.filmsService.searchFilm(this.qwery, this.filmCurrentPage) :
    //   this.filmsService.getAllFilms(this.filmCurrentPage);
  }

  // search actors
  searchActors(value) {
    value = value.toLowerCase().trim();
    this.actorCurrentPage = 1;
    this.actorService.searchActors(this.qwery, this.actorCurrentPage)
    // !!this.qwery ?
    //   this.actorService.searchActors(this.qwery, this.actorCurrentPage) :
    //   this.actorService.getAllActors(this.actorCurrentPage);
  }

  // filter by tab
  transform() {
    this.router.url == '/films' ? this.transformFilms() : this.transformActors();
  }

  // filter films from A to Z and from Z to A
  transformFilms(): any {
    this.filmsData$.sort((a: any, b: any) => {
      let x = a.title.toLowerCase();
      let y = b.title.toLowerCase();
      if (x < y) { return -1 * this.sortingMethod; }
      if (x > y) { return 1 * this.sortingMethod; }
      return 0;
    })
  }

  // filter actors from A to Z and from Z to A
  transformActors(): any {
    this.actorsData$.sort((a: any, b: any) => {
      let x = a.name.toLowerCase();
      let y = b.name.toLowerCase();
      if (x < y) { return -1 * this.sortingMethod; }
      if (x > y) { return 1 * this.sortingMethod; }
      return 0;
    })
  }

  nextPageFilm() {
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

}
