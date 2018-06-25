import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit {
  @Input() changeIndex: number;
  @Input() value: string;
  @Output() searchItem = new EventEmitter();
  

  constructor() {
  }

  ngOnInit() {}

  setSearchValue(searchValue){
    this.searchItem.emit(searchValue);
  }

}
