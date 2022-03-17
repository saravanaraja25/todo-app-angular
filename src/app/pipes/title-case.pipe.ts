import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleCase'
})
export class TitleCasePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    if(!value)
      return null;

    let titleCaseValue = value.toString().split(' ');

    for(let i = 0; i < titleCaseValue.length; i++){
      titleCaseValue[i] = titleCaseValue[i].charAt(0).toUpperCase() + titleCaseValue[i].slice(1);
    }

    return titleCaseValue.join(' ');
    
  }

}
