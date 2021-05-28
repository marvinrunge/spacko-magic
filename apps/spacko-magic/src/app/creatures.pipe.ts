import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creatures'
})
export class CreaturesPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
