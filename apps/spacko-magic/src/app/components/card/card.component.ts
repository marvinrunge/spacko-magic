import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from '../../interfaces/card';
import { tapAnimation } from './tapAnimation';

@Component({
  selector: 'spacko-magic-card',
  animations: [tapAnimation,
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
  @Input() type: string;
  @Output() cardUpdated = new EventEmitter<Card>();
  @Output() cardSelected = new EventEmitter<Card>();
  tappedValue = 'untapped';
  showActions = false;

  setTappedValue(tapped: boolean) {
    this.tappedValue = tapped ? 'tapped' : 'untapped';
  }

  ngOnInit(): void {
    this.setTappedValue(this.card.tapped);
  }

  toggleTap() {
    const tapped = this.tappedValue === 'tapped' ? false : true;
    const card = { ...this.card, tapped };
    this.setTappedValue(tapped);
    setTimeout(() => {
      this.cardUpdated.emit(card)
    }, 600);
  }

  addCounter() {
    const counter = this.card.counter + 1;
    const card: Card = { ...this.card, counter}
    this.cardUpdated.emit(card);
  }

  removeCounter() {
    if (this.card.counter > 0) {
      const counter = this.card.counter - 1;
      const card: Card = { ...this.card, counter}
      this.cardUpdated.emit(card);
    }
  }

  toggleActions() {
    this.showActions = !this.showActions;
  }

  select() {
    this.cardSelected.emit(this.card);
  }

  kill() {
    const place = "graveyard";
    const card: Card = { ...this.card, place}
    this.cardUpdated.emit(card);
  }

  returnToHand() {
    const place = "hand";
    const card: Card = { ...this.card, place}
    this.cardUpdated.emit(card);
  }

  scroll(event: any) {
    console.log('scroll', event);
  }
}
