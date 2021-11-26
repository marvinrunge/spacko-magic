import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from '../../interfaces/card';

@Component({
  selector: 'spacko-magic-graveyard',
  templateUrl: './graveyard.component.html',
  styleUrls: ['./graveyard.component.css'],
})
export class GraveyardComponent {
  @Input() cards: Card[];
  @Input() type: 'graveyard' | 'exile';
  @Input() isEnemyCard = false;
  @Input() height: number;
  @Input() width: number;
  @Input() borderRadius: number;
  @Input() mode?: string;
  @Input() touch = false;
  @Output() actionTriggered = new EventEmitter<{
    card?: Card;
    actionType: string;
  }>();

  triggerAction(event: { card?: Card; actionType: string }) {
    if (!this.isEnemyCard) {
      this.actionTriggered.emit({
        card: this.cards[0],
        actionType: event.actionType,
      });
    }
  }
}
