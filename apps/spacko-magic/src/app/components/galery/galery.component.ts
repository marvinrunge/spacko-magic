import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Card } from '../../interfaces/card';

@Component({
  selector: 'spacko-magic-galery',
  templateUrl: './galery.component.html',
  styleUrls: ['./galery.component.css'],
})
export class GaleryComponent {
  @Input() cards: Card[];
  @Input() cardHeight: number;
  @Input() cardWidth: number;
  @Input() cardBorderRadius: number;
  @Input() mode?: string;
  @Output() actionTriggered = new EventEmitter<{
    card?: Card;
    actionType: string;
  }>();

  triggerAction(event: { card?: Card; actionType: string }) {
    if (event.actionType !== 'zoom') {
      this.actionTriggered.emit({
        card: event.card,
        actionType: 'spawn-token',
      });
    }
  }
}
