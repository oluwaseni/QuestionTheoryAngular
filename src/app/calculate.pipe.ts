import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calculate'
})
export class CalculatePipe implements PipeTransform {

  transform(items: any, searchText: string, ...args: any[]): any[] {
    if(!items) return [];
    if(!searchText) return items;
searchText = searchText.toLowerCase();
return items.filter( it => {
      return it.name.toLowerCase().includes(searchText);
    }).reduce((a, b) => a.total + b.total, 0);
   }
}