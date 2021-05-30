import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from '../../interfaces/card';

@Component({
  selector: 'spacko-magic-library',
  animations: [
    trigger('showHide', [
      state('show', style({
        opacity: '1'
      })),
      state('hide', style({
        opacity: '0'
      })),
      transition('show <=> hide', [
        animate('0.3s ease')
      ]),
    ]),
  ],
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent {
  @Input() cards: Card[];
  @Input() height: number;
  @Input() width: number;
  @Output() cardUpdated = new EventEmitter<Card>();
  @Output() shuffleClicked = new EventEmitter();
  showActions = false;

  drawCard() {
    if (this.cards.length > 0) {
      const card: Card = { ...this.cards[this.cards.length - 1], place: "hand" }
      this.cardUpdated.emit(card);
    }
  }

  toggleActions() {
    this.showActions = !this.showActions;
  }

  shuffle() {
    this.shuffleClicked.emit();
  }
}
