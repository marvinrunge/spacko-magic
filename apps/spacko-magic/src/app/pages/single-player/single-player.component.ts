import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Card } from '../../interfaces/card';
import { Player } from '../../interfaces/player';
import { CardSelectors, PlayerSelectors, RootStoreState } from '../../root-store';
import { setSelectedCardId, updateCardRequest } from '../../root-store/card-store/actions';
import { updatePlayerRequest } from '../../root-store/player-store/actions';

@Component({
  templateUrl: './single-player.component.html',
  styleUrls: ['./single-player.component.css']
})
export class SinglePlayerComponent implements OnInit {
  @ViewChild('handScroll') handScroll: ElementRef;

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
  cardHeight = 160;
  cardWidth = 115;
  innerHeight: number;
  selectedPlayer: Player;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setCardHeight();
  }

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
    this.store$.pipe(
      select(PlayerSelectors.selectPlayerBySelectedId)
    ).subscribe(player => {
      console.log(player)
      this.selectedPlayer = player
    });
  }

  ngOnInit() {
    this.setCardHeight();
  }

  draw() {
    let randomCard = this.deck[Math.floor(Math.random() * this.deck.length)];
    randomCard = { ...randomCard, place: "hand" };
    this.store$.dispatch(updateCardRequest({ card: randomCard }));
  }

  play(card: Card) {
    const playedCard: Card = { ...card, place: "battlefield" }
    this.store$.dispatch(updateCardRequest({ card: playedCard }));
  }

  sacrifice(card: Card) {
    const playedCard: Card = { ...card, place: "graveyard" }
    this.store$.dispatch(updateCardRequest({ card: playedCard }));
  }

  toggleSettings() {
    this.settingsOpen = !this.settingsOpen;
  }

  updateCard(card: Card) {
    this.store$.dispatch(updateCardRequest({ card }));
  }

  selectCard(card: Card) {
    this.store$.dispatch(setSelectedCardId({ selectedCardId: card._id }));
  }

  deselectCard() {
    this.store$.dispatch(setSelectedCardId({ selectedCardId: undefined }));
  }

  updatePlayer(player: Player) {
    console.log(player);
    this.store$.dispatch(updatePlayerRequest({ player }));
  }

  scrollRight() {
    this.handScroll.nativeElement.scrollLeft += this.cardWidth;
  }

  scrollLeft() {
   this.handScroll.nativeElement.scrollLeft -= this.cardWidth;
  }

  setCardHeight() {
    this.innerHeight = window.innerHeight;
    const height = Math.trunc((this.innerHeight - 122) / 4);
    this.cardHeight = height;
    this.cardWidth = Math.trunc(this.cardHeight * 0.7159);
  }

  zoomIn() {
    this.cardHeight += 25;
    this.cardWidth = Math.trunc(this.cardHeight * 0.7159);
  }

  zoomOut() {
    this.cardHeight -= 25;
    this.cardWidth = Math.trunc(this.cardHeight * 0.7159);
  }
}
