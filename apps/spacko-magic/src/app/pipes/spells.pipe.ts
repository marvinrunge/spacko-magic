import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spells'
})
export class SpellsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
