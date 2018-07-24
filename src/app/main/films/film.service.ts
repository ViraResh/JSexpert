import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators'
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

import { LoaderService } from 'src/app/services/loader.service';
import { FavoriteService } from 'src/app/services/favorite.service';

import { API_CONFIG, apiConfig } from '../../api.config'

@Injectable({
  providedIn: 'root'
})

export class FilmService {
  allFilms$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  // allActors$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor( @Inject(API_CONFIG)
  public apiConfig: any,
    private http: HttpClient,
    private loaderService: LoaderService,
    private favService: FavoriteService) {
  }

  getAllFilms(page?: number): Observable<any> {
    this.loaderService.display(true);
    this.http.get(`${this.apiConfig.movieUrl}/popular?page=${page}${this.apiConfig.params}`)
      .subscribe((res: any) => {
        let ids = [];
        res.results.forEach(el => {
          ids.push(el.id);
        })
        this.favService.getFavor(ids).subscribe((response) => {
          response.forEach(el => {
            res.results.map(elem => {
              if (el._id == elem.id) {
                elem.favorite = true;
              }
            });
          })
        });
        this.allFilms$.next(res);
      })
    this.loaderService.display(false);
    return this.allFilms$.asObservable();
  }

  // getAllActors(page?: number): Observable<any> {
  //   this.loaderService.display(true);
  //   this.http.get(`${this.apiConfig.personUrl}/popular?page=${page}${this.apiConfig.params}`)
  //     .subscribe((res: any) => {
  //       this.allActors$.next(res)
  //     })
  //   this.loaderService.display(false);
  //   return this.allActors$.asObservable();
  // }

  searchFilm(qwery: any, page?: number) {
    this.loaderService.display(true);
    this.http.get(`${this.apiConfig.searchUrlMovie}?query=${qwery}&page=${page}${this.apiConfig.params}`)
      .subscribe((res: any) => {
        this.allFilms$.next(res);
      })
    this.loaderService.display(false);
  }

  // searchActors(qwery: any, page?: number) {
  //   this.loaderService.display(true);
  //   this.http.get(`${this.apiConfig.searchUrlPerson}?query=${qwery}&page=${page}${this.apiConfig.params}`)
  //     .subscribe((res: any) => {
  //       this.allActors$.next(res);
  //     })
  //   this.loaderService.display(false);
  // }
}
