import { Pipe, PipeTransform } from '@angular/core';
import { Card } from '../interfaces/card';

@Pipe({
  name: 'lands'
})
export class LandsPipe implements PipeTransform {

  transform(cards: Card[]): unknown {
    return cards.filter(card => card.type === "land");
  }

}
