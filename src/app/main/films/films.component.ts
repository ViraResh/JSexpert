import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Observable } from "rxjs"
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { MatTabChangeEvent } from '@angular/material';

// interfaces
import { Film } from 'src/app/interfaces/film';

// services
import { Actors } from 'src/app/interfaces/actors';
import { FilmService } from 'src/app/main/films/film.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})

export class FilmsComponent implements OnInit {
  sortingMethod: number;
  // favCount: number;
  changeIndex: number = 0;
  qwery: string;

  //obserable from filmService
  filmsData$: Array<Film>;

  //data variables of films
  filmCurrentPage: number;
  filmTotalPage: number;
  filmTotalResults: number;

  constructor(
    private filmsService: FilmService) { }

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
  }

  // filter for favorites films
  // setFavFilms(){
  //   this.favCount = this.searchArray.filter(el => el.isFavorite).length;
  // }


}
