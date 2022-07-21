import { Component, HostListener, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Card } from '../../interfaces/card';
import { CardSelectors, RootStoreState } from '../../root-store';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  templateUrl: './dragfield.component.html',
  styleUrls: ['./dragfield.component.css'],
})
export class DragfieldComponent implements OnInit {
  cardsTop: Card[] = [];
  cardsBottom: Card[] = [];
  library: Card[] = [];
  hand: Card[] = [];
  graveyard: Card[] = [];
  exile: Card[] = [];
  creatures: Card[] = [];
  lands: Card[] = [];
  other: Card[] = [];
  enemies: string[] = [];


  mode?: string;
  touch = false;

  cardHeight = 160;
  cardWidth = 115;
  cardBorderRadius = 10;
  innerHeight: number;

  drop(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  setCardHeight() {
    this.innerHeight = window.innerHeight;
    this.cardHeight = Math.trunc(this.innerHeight / 4);
    this.cardWidth = Math.trunc(this.cardHeight * 0.7159);
    this.cardBorderRadius = Math.trunc(this.cardHeight * 0.06);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setCardHeight();
  }

  ngOnInit() {
    this.setCardHeight();
  }

  constructor(private store$: Store<RootStoreState.State>) {
    this.store$
      .pipe(
        select(CardSelectors.selectByPlaceAndTypes('battlefield', ['creature']))
      )
      .subscribe((cards) => (this.cardsTop = cards));
    this.store$
      .pipe(
        select(CardSelectors.selectByPlaceAndNotType('battlefield', 'creature'))
      )
      .subscribe((cards) => (this.cardsBottom = cards));
    this.store$
      .pipe(select(CardSelectors.selectByPlace('hand')))
      .subscribe((cards) => (this.hand = cards));
    this.store$
      .pipe(select(CardSelectors.selectByPlaceAndSortByPosition('graveyard')))
      .subscribe((cards) => (this.graveyard = cards));
    this.store$
      .pipe(select(CardSelectors.selectByPlaceAndSortByPosition('exile')))
      .subscribe((cards) => (this.exile = cards));
    this.store$
      .pipe(select(CardSelectors.selectByPlaceAndSortByPosition('graveyard')))
      .subscribe((cards) => (this.graveyard = cards));
    this.store$
      .pipe(select(CardSelectors.selectByPlaceAndSortByPosition('exile')))
      .subscribe((cards) => (this.exile = cards));
    this.store$
      .pipe(select(CardSelectors.selectByPlaceAndSortByPosition('deck')))
      .subscribe((cards) => (this.library = cards));
  }
}
