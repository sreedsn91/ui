import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {

  transform(navigations: any[], searchText: string): any[] {
  
    if (!searchText) return navigations;
    return navigations.filter(item =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }

}
