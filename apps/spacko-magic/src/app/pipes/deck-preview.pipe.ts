import { Pipe, PipeTransform } from '@angular/core';
import { Card } from '../interfaces/card';

@Pipe({
  name: 'deckPreview'
})
export class DeckPreviewPipe implements PipeTransform {
  transform(cards: Card[], types: string[]): Card[] {
    const uniqueCards: Card[] = [];
    cards.filter(card => types.includes(card.type)).forEach(card => {
      const uniqueCardIndex = uniqueCards.findIndex(uniqueCard => card.url === uniqueCard.url);
      if (uniqueCardIndex > -1) {
        uniqueCards[uniqueCardIndex].count = uniqueCards[uniqueCardIndex].count + 1;
      } else {
        uniqueCards.push({ ...card, place: 'deck' });
      }
    });
    return uniqueCards.sort((a, b) => a.cmc - b.cmc);
  }
}
