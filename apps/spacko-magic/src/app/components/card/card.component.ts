import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from '../../interfaces/card';
import { tapAnimation, tapAttachmentAnimation } from './tapAnimation';

@Component({
  selector: 'spacko-magic-card',
  animations: [tapAnimation, tapAttachmentAnimation,
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
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() card: Card;
  @Input() height: number;
  @Input() width: number;
  @Input() borderRadius: number;
  @Input() type: string;
  @Input() mode?: string;
  @Output() actionTriggered = new EventEmitter<{ card?: Card, actionType: string }>();
  tappedValue = 'untapped';
  showActions = false;
  attachments = 0;
  marginLeft: number;

  setTappedValue(tapped: boolean) {
    this.tappedValue = tapped ? 'tapped' : 'untapped';
  }

  ngOnInit(): void {
    this.setTappedValue(this.card.tapped);
    this.attachments = this.card.attachedCards.length;
    this.marginLeft = Math.trunc((this.height - this.width) / 2);
  }

  toggleActions() {
    this.showActions = !this.showActions;
  }

  triggerAction(type: string) {
    let actionType = type;
    if (type === 'toggle-tap' && this.mode === 'attach') {
      actionType = 'attach'
    } else if (type === 'toggle-tap') {
      this.setTappedValue(this.tappedValue === 'tapped' ? false : true);
    }
    this.actionTriggered.emit({ card: this.card, actionType });
  }
}
