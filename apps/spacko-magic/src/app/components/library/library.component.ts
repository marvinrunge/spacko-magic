import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from '../../interfaces/card';

@Component({
  selector: 'spacko-magic-library',
  animations: [
    trigger('showHide', [
      state(
        'show',
        style({
          opacity: '1',
        })
      ),
      state(
        'hide',
        style({
          opacity: '0',
        })
      ),
      transition('show <=> hide', [animate('0.3s ease')]),
    ]),
  ],
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
})
export class LibraryComponent {
  @Input() cards: Card[];
  @Input() isEnemyCard = false;
  @Input() height: number;
  @Input() width: number;
  @Input() borderRadius: number;
  @Input() mode?: string;
  @Output() actionTriggered = new EventEmitter<{
    card?: Card;
    actionType: string;
  }>();
  showActions = false;

  toggleActions() {
    this.showActions = !this.showActions;
  }

  triggerAction(actionType: string) {
    if (!this.isEnemyCard) {
      this.actionTriggered.emit({ card: this.cards[0], actionType });
    }
  }
}
