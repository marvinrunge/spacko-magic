import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DeckstatsDeck } from '../../interfaces/deckstats/types';

@Component({
  selector: 'spacko-magic-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent {
  @Input() deck: DeckstatsDeck;
  @Output() deckClicked = new EventEmitter();

  loadDeck() {
    this.deckClicked.emit();
  }
}
