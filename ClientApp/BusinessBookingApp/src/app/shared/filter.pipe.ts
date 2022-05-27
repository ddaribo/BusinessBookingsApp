import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, filterCriteria: string): any {
    if(value === null){
      return;
    }

    if(value.length === 0 || filterString === ''){
      return value;
    }

    const resultArr = [];
    if(filterCriteria === 'author'){
      for (const item of value){
        if(item[filterCriteria].name.toLowerCase().includes(filterString.toLowerCase())){
          resultArr.push(item);
        }
      }
      return resultArr;
    }

    for (const item of value){
      if(item[filterCriteria].toLowerCase().includes(filterString.toLowerCase())){
        resultArr.push(item);
      }
    }
    return resultArr;
  }

}