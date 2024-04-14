import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from '../../interfaces/card';
import { tapAnimation, tapAttachmentAnimation } from './tapAnimation';

@Component({
  selector: 'spacko-magic-card',
  animations: [
    tapAnimation,
    tapAttachmentAnimation,
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
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() card: Card;
  @Input() height: number;
  @Input() width: number;
  @Input() borderRadius: number;
  @Input() type: string;
  @Input() mode?: string;
  @Input() isEnemyCard = false;
  @Input() touch: boolean;
  @Input() faceDown = false;
  @Output() actionTriggered = new EventEmitter<{
    card?: Card;
    actionType: string;
  }>();
  tappedValue = 'untapped';
  showActions = false;
  attachments = 0;
  marginLeft: number;
  actionTapped = false;

  setTappedValue(tapped: boolean) {
    this.tappedValue = tapped ? 'tapped' : 'untapped';
  }

  ngOnInit(): void {
    this.setTappedValue(this.card.tapped);
    this.attachments = this.card.attachedCards.length;
    this.marginLeft = Math.trunc((this.height - this.width) / 2);
  }

  onClick(event: MouseEvent): void {
    if (this.touch) {
      if (this.mode === 'attach') {
        this.triggerAction('attach', event);
      } else {
        this.toggleActions(event);
      }
    } else {
      if (this.mode === 'attach') {
        this.triggerAction('attach', event);
      } else {
        this.triggerAction('toggle-tap', event);
      }
    }
  }

  onClickAction(type: string, event: Event): void {
    if (this.showActions) {
      this.triggerAction(type, event);
      event.stopPropagation();
      event.preventDefault();
    }
  }

  onMouseEnter() {
    if (!this.touch) {
      this.showActions = true;
    }
  }

  onMouseLeave() {
    if (!this.touch) {
      this.showActions = false;
    }
  }

  toggleActions(event: Event) {
    this.showActions = !this.showActions;
    event.stopPropagation();
    event.preventDefault();
  }

  triggerAction(type: string, event?: Event) {
    if (!this.isEnemyCard || type === 'zoom') {
      if (type === 'toggle-tap' && this.card.place === 'battlefield') {
        this.setTappedValue(this.tappedValue !== 'tapped');
      }
      this.actionTriggered.emit({ card: this.card, actionType: type });
    }
  }
}
