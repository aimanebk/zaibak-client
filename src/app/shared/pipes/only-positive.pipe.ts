import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'onlyPositive'
})
export class OnlyPositivePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if(value > 0)
      return `${-value} (Avoir)`;

    return -value;
  }

}
