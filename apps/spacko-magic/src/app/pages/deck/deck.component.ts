import { Component, HostListener, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';

import { GameService } from '../../game.service';
import { ActiveDeck } from '../../interfaces/activeDeck';
import { Card } from '../../interfaces/card';
import { Player } from '../../interfaces/player';
import { CardSelectors, PlayerSelectors, RootStoreState } from '../../root-store';
import { updatePlayerRequest } from '../../root-store/player-store/actions';

@Component({
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css'],
})
export class ActiveDeckComponent implements OnInit {
  username = '';
  activeDeck: ActiveDeck = {
    id: -1,
    name: "Unsaved",
    cardList: ""
  };
  cardList: string;
  enemyUsername = '';
  userIsReady = false;
  edit = false;

  loadingRequests: BehaviorSubject<number>;
  isLoading = false;

  deck: Card[];
  selectedCard?: Card;
  cardWidth: number;
  cardHeight: number;
  innerHeight: number;
  cardBorderRadius: number;
  selectedPlayer: Player;

  rotation = 0;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setCardHeight();
  }

  ngOnInit() {
    const username = localStorage.getItem('current-user');
    if (username) {
      this.username = username;
      this.userIsReady = true;
    }
    this.setCardHeight();
  }

  constructor(
    private game: GameService,
    private store$: Store<RootStoreState.State>
  ) {
    this.store$
      .pipe(select(CardSelectors.selectAllCards))
      .subscribe((cards) => (this.deck = cards));
    this.store$
      .pipe(select(PlayerSelectors.selectPlayerBySelectedId))
      .subscribe((player) => {
        this.selectedPlayer = player;
        this.activeDeck = { ...player?.activeDeck };
      });
    this.store$
      .pipe(select(CardSelectors.selectCardIsLoading))
      .subscribe((loading) => (this.isLoading = loading));
  }

  initDeck() {
    if (this.edit) {
      const playerToUpdate = { ...this.selectedPlayer };
      playerToUpdate.activeDeck = this.activeDeck;
      this.game.initDeck(playerToUpdate.activeDeck.cardList, this.username);
      this.store$.dispatch(updatePlayerRequest({ player: playerToUpdate }));
    }
    this.edit = !this.edit;
  }

  setCardHeight() {
    this.innerHeight = window.innerHeight;
    this.cardHeight = Math.trunc((this.innerHeight - 300) / 3);
    this.cardWidth = Math.trunc(this.cardHeight * 0.7159);
    this.cardBorderRadius = Math.trunc(this.cardHeight * 0.06);
  }

  selectCard(card: Card) {
    this.selectedCard = card;
  }

  deselectCard() {
    this.selectedCard = undefined;
  }

  triggerAction(event: { card?: Card; actionType: string }) {
    const card = event.card;
    const actionType = event.actionType;
    if (card) {
      switch (actionType) {
        case 'zoom': {
          this.selectCard(card);
          break;
        }
      }
    }
  }

  rotate(event: any) {
    event.stopPropagation();
    this.rotation += 90;
  }

  flip(card: Card, event: any) {
    event.stopPropagation();
    if (card.url === card.cardFaces?.frontUrl) {
      card.url = card.cardFaces?.backUrl;
    } else if (card.url === card.cardFaces?.backUrl) {
      card.url = card.cardFaces?.frontUrl;
    }
  }
}
