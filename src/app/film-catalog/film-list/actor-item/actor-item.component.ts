import { Component, OnInit, Input } from '@angular/core';

//services
import { FilmService } from 'src/app/film-catalog/film.service';

//interfaces
import { Actors } from 'src/app/interfaces/actors';

@Component({
  selector: 'app-actor-item',
  templateUrl: './actor-item.component.html',
  styleUrls: ['./actor-item.component.css']
})
export class ActorItemComponent implements OnInit {
  @Input() actorItem: any;
  @Input() actorPopularity: any;
  @Input() actorImg: string;

  startPath: any;
  size: string = '/w500';
 
  constructor( private filmServise: FilmService ) { }

  ngOnInit() {
    this.actorPopularity = Math.round(this.actorPopularity );
    this.startPath = this.filmServise.imgPath;
  }

  
}
