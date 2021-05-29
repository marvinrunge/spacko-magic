import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from '../../interfaces/card';

@Component({
  selector: 'spacko-magic-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent {
  @Input() cards: Card[];
  @Input() height: number;
  @Input() width: number;
  @Output() cardUpdated = new EventEmitter<Card>();

  drawCard() {
    if (this.cards.length > 0) {
      const card: Card = { ...this.cards[this.cards.length - 1], place: "hand" }
      this.cardUpdated.emit(card);
    }
  }
}
