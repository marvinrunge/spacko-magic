import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from '../../interfaces/card';

@Component({
  selector: 'spacko-magic-card',
  animations: [
    trigger('tappedUntapped', [
      state('untapped', style({
        transform: 'rotate(0)',
        width: '144px'
      })),
      state('tapped', style({
        transform: 'rotate(90deg)',
        width: '200px'
      })),
      transition('untapped <=> tapped', [
        animate('0.5s ease')
      ]),
    ]),
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
  @Output() cardEmitter = new EventEmitter<Card>();
  @Output() selectEmitter = new EventEmitter<Card>();
  tapped = false;
  showActions = false;

  ngOnInit(): void {
    this.tapped = this.card.tapped;
  }

  toggleTap() {
    this.tapped = !this.tapped;
    const card = { ...this.card, tapped: this.tapped };
    setTimeout(() => {
      this.cardEmitter.emit(card)
    }, 500);
  }

  addCounter() {
    const counter = this.card.counter + 1;
    const card: Card = { ...this.card, counter}
    this.cardEmitter.emit(card);
  }

  removeCounter() {
    if (this.card.counter > 0) {
      const counter = this.card.counter - 1;
      const card: Card = { ...this.card, counter}
      this.cardEmitter.emit(card);
    }
  }

  toggleActions() {
    this.showActions = !this.showActions;
  }

  select() {
    this.selectEmitter.emit(this.card);
  }

  kill() {
    const place = "graveyard";
    const card: Card = { ...this.card, place}
    this.cardEmitter.emit(card);
  }

  returnToHand() {
    const place = "hand";
    const card: Card = { ...this.card, place}
    this.cardEmitter.emit(card);
  }
}
