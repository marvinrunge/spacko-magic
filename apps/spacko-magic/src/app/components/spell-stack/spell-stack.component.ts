import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from '../../interfaces/card';

@Component({
  selector: 'spacko-magic-spell-stack',
  templateUrl: './spell-stack.component.html',
  styleUrls: ['./spell-stack.component.scss'],
})
export class SpellStackComponent {
  @Input() cards: Card[];
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
  }}
