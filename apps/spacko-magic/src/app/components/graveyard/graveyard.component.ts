import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from '../../interfaces/card';

@Component({
  selector: 'spacko-magic-graveyard',
  templateUrl: './graveyard.component.html',
  styleUrls: ['./graveyard.component.css']
})
export class GraveyardComponent {
  @Input() cards: Card[];
  @Input() height: number;
  @Input() width: number;
  @Output() cardUpdated = new EventEmitter<Card>();
  @Output() cardSelected = new EventEmitter<Card>();

  updateCard(card: Card) {
    this.cardUpdated.emit(card);
  }

  selectCard(card: Card) {
    this.cardUpdated.emit(card);
  }
}
