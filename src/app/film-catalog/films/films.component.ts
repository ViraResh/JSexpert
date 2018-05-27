import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FilmService } from '../film.service';

@Component({
  selector: '.films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {

  description: string = 'Middle card description';
  films: object;
  
  
  constructor(filmsService: FilmService) { 
    this.films = filmsService.films;
  }
  
  ngOnInit() { 
    
  }
  
}
