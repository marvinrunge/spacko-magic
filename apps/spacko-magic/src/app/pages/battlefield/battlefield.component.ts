import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Card } from '../../interfaces/card';
import { CardSelectors, RootStoreState } from '../../root-store';
import { setSelectedCardId, updateRequest } from '../../root-store/card-store/actions';

@Component({
  templateUrl: './battlefield.component.html',
  styleUrls: ['./battlefield.component.css']
})
export class BattlefieldComponent {
  title = 'spacko-magic';
  deck: Card[] = [];
  hand: Card[] = [];
  stack: Card[] = [];
  graveyard: Card[] = [];
  creatures: Card[] = [];
  lands: Card[] = [];
  other: Card[] = [];
  settingsOpen = true;
  selectedCard?: Card;

  constructor(
    private store$: Store<RootStoreState.State>
  ) {
    this.store$.pipe(
      select(CardSelectors.selectByPlace("deck"))
    ).subscribe(cards => this.deck = cards);
    this.store$.pipe(
      select(CardSelectors.selectByPlace("hand"))
    ).subscribe(cards => this.hand = cards);
    this.store$.pipe(
      select(CardSelectors.selectByPlaceAndType("battlefield", "creature"))
    ).subscribe(cards => this.creatures = cards);
    this.store$.pipe(
      select(CardSelectors.selectByPlaceAndType("battlefield", "land"))
    ).subscribe(cards => this.lands = cards);
    this.store$.pipe(
      select(CardSelectors.selectByPlaceAndNotTypes("battlefield", "creature", "land"))
    ).subscribe(cards => this.other = cards);
    this.store$.pipe(
      select(CardSelectors.selectByPlace("graveyard"))
    ).subscribe(cards => this.graveyard = cards);
    this.store$.pipe(
      select(CardSelectors.selectCardBySelectedId)
    ).subscribe(card => this.selectedCard = card);
  }

  draw() {
    let randomCard = this.deck[Math.floor(Math.random() * this.deck.length)];
    randomCard = { ...randomCard, place: "hand" };
    this.store$.dispatch(updateRequest({ card: randomCard }));
  }

  play(card: Card) {
    const playedCard: Card = { ...card, place: "battlefield" }
    this.store$.dispatch(updateRequest({ card: playedCard }));
  }

  sacrifice(card: Card) {
    const playedCard: Card = { ...card, place: "graveyard" }
    this.store$.dispatch(updateRequest({ card: playedCard }));
  }

  toggleSettings() {
    this.settingsOpen = !this.settingsOpen;
  }

  updateCard(card: Card) {
    this.store$.dispatch(updateRequest({ card }));
  }

  selectCard(card: Card) {
    this.store$.dispatch(setSelectedCardId({ selectedCardId: card._id }));
  }

  deselectCard() {
    this.store$.dispatch(setSelectedCardId({ selectedCardId: undefined }));
  }
}
