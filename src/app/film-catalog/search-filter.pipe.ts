import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchfilter'
})

@Injectable()
export class SearchFilterPipe implements PipeTransform {

  public transform(value, keys: string, term: string) {
    if (!term) return value;
    let result = (value || []).filter((item) => keys.split(',').some(key => item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key])));
    if(result.length === 0) {
      return [-1];
    }
    return result;
  }
  
}
