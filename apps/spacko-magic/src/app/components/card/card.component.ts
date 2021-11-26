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
      console.log('onTap', this.touch);
      if (this.mode === 'attach') {
        this.triggerAction('attach', event);
      } else {
        this.toggleActions();
      }
    } else {
      console.log('onClick', this.touch);
      if (this.mode === 'attach') {
        this.triggerAction('attach', event);
      } else {
        this.triggerAction('toggle-tap', event);
      }
    }
  }

  onClickAction(type: string, event: Event): void {
    if (this.showActions) {
      console.log('onClickAction', this.touch);
      this.triggerAction(type, event);
      event.stopPropagation();
      event.preventDefault();
    }
  }

  onMouseEnter() {
    if (!this.touch) {
      console.log('onMouseEnter', this.touch);
      this.showActions = true;
    }
  }

  onMouseLeave() {
    if (!this.touch) {
      console.log('onMouseLeave', this.touch);
      this.showActions = false;
    }
  }

  toggleActions() {
    console.log('toggleActions');
    this.showActions = !this.showActions;
  }

  triggerAction(type: string, event?: Event) {
    console.log('trigger action', this.showActions, this.mode);
    if (!this.isEnemyCard || type === 'zoom') {
      if (type === 'toggle-tap' && this.card.place === 'battlefield') {
        this.setTappedValue(this.tappedValue !== 'tapped');
      }
      this.actionTriggered.emit({ card: this.card, actionType: type });
    }
  }
}
