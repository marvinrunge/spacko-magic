import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Card } from '../../interfaces/card';
import { Player } from '../../interfaces/player';
import {
  CardSelectors,
  PlayerSelectors,
  RootStoreState,
} from '../../root-store';
import {
  deleteCardRequest,
  setActiveAttachCardId,
  setSelectedCardId,
  updateCardRequest,
  updateManyCardsRequest,
} from '../../root-store/card-store/actions';
import { EnemyCardSelectors } from '../../root-store/enemy-card-store';
import { setSelectedEnemyCardId } from '../../root-store/enemy-card-store/actions';
import { updatePlayerRequest } from '../../root-store/player-store/actions';

@Component({
  templateUrl: './two-player.component.html',
  styleUrls: ['./two-player.component.css'],
})
export class TwoPlayerComponent implements OnInit {
  @ViewChild('handScroll') handScroll: ElementRef;

  title = 'spacko-magic';
  deck: Card[] = [];
  hand: Card[] = [];
  graveyard: Card[] = [];
  exile: Card[] = [];
  creatures: Card[] = [];
  lands: Card[] = [];
  other: Card[] = [];

  enemyDeck: Card[] = [];
  enemyHand: Card[] = [];
  enemyGraveyard: Card[] = [];
  enemyExile: Card[] = [];
  enemyCreatures: Card[] = [];
  enemyLands: Card[] = [];
  enemyOther: Card[] = [];
  selectedEnemyPlayer: Player;
  selectedEnemyCard?: Card;

  settingsOpen = true;
  selectedCard?: Card;
  cardHeight = 160;
  cardWidth = 115;
  cardBorderRadius = 10;
  innerHeight: number;
  selectedPlayer: Player;
  activeAttachCard: Card;
  mode?: string;
  searchMode?: string;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setCardHeight();
  }

  constructor(private store$: Store<RootStoreState.State>) {
    this.store$
      .pipe(select(CardSelectors.selectByPlaceAndSortByPosition('deck')))
      .subscribe((cards) => (this.deck = cards));
    this.store$
      .pipe(select(CardSelectors.selectByPlace('hand')))
      .subscribe((cards) => (this.hand = cards));
    this.store$
      .pipe(
        select(CardSelectors.selectByPlaceAndType('battlefield', 'creature'))
      )
      .subscribe((cards) => (this.creatures = cards));
    this.store$
      .pipe(select(CardSelectors.selectByPlaceAndType('battlefield', 'land')))
      .subscribe((cards) => (this.lands = cards));
    this.store$
      .pipe(
        select(
          CardSelectors.selectByPlaceAndNotTypes(
            'battlefield',
            'creature',
            'land'
          )
        )
      )
      .subscribe((cards) => (this.other = cards));
    this.store$
      .pipe(select(CardSelectors.selectByPlace('graveyard')))
      .subscribe((cards) => (this.graveyard = cards));
    this.store$
      .pipe(select(CardSelectors.selectByPlace('exile')))
      .subscribe((cards) => (this.exile = cards));
    this.store$
      .pipe(select(CardSelectors.selectCardBySelectedId))
      .subscribe((card) => (this.selectedCard = card));
    this.store$
      .pipe(select(PlayerSelectors.selectPlayerBySelectedId))
      .subscribe((player) => {
        this.selectedPlayer = player;
      });
    this.store$
      .pipe(select(CardSelectors.selectActiveAttachCardBySelectedId))
      .subscribe((card) => {
        this.activeAttachCard = card;
      });

    this.store$
      .pipe(select(EnemyCardSelectors.selectByPlaceAndSortByPosition('deck')))
      .subscribe((cards) => (this.enemyDeck = cards));
    this.store$
      .pipe(select(EnemyCardSelectors.selectByPlace('hand')))
      .subscribe((cards) => (this.enemyHand = cards));
    this.store$
      .pipe(
        select(
          EnemyCardSelectors.selectByPlaceAndType('battlefield', 'creature')
        )
      )
      .subscribe((cards) => (this.enemyCreatures = cards));
    this.store$
      .pipe(
        select(EnemyCardSelectors.selectByPlaceAndType('battlefield', 'land'))
      )
      .subscribe((cards) => (this.enemyLands = cards));
    this.store$
      .pipe(
        select(
          EnemyCardSelectors.selectByPlaceAndNotTypes(
            'battlefield',
            'creature',
            'land'
          )
        )
      )
      .subscribe((cards) => (this.enemyOther = cards));
    this.store$
      .pipe(select(EnemyCardSelectors.selectByPlace('graveyard')))
      .subscribe((cards) => (this.enemyGraveyard = cards));
    this.store$
      .pipe(select(EnemyCardSelectors.selectByPlace('exile')))
      .subscribe((cards) => (this.enemyExile = cards));
    this.store$
      .pipe(select(PlayerSelectors.selectEnemyPlayerBySelectedId))
      .subscribe((player) => {
        this.selectedEnemyPlayer = player;
      });
    this.store$
      .pipe(select(EnemyCardSelectors.selectCardBySelectedId))
      .subscribe((card) => (this.selectedEnemyCard = card));
  }

  ngOnInit() {
    this.setCardHeight();
  }

  draw() {
    let randomCard = this.deck[Math.floor(Math.random() * this.deck.length)];
    randomCard = { ...randomCard, place: 'hand' };
    this.store$.dispatch(updateCardRequest({ card: randomCard }));
  }

  play(card: Card) {
    const playedCard: Card = { ...card, place: 'battlefield' };
    this.store$.dispatch(updateCardRequest({ card: playedCard }));
  }

  sacrifice(card: Card) {
    const playedCard: Card = { ...card, place: 'graveyard' };
    this.store$.dispatch(updateCardRequest({ card: playedCard }));
  }

  toggleSettings() {
    this.settingsOpen = !this.settingsOpen;
  }

  updateCard(card: Card) {
    this.store$.dispatch(updateCardRequest({ card }));
  }

  selectCard(card: Card) {
    if (card.isEnemyCard) {
      this.store$.dispatch(
        setSelectedEnemyCardId({ selectedCardId: card._id })
      );
    } else {
      this.store$.dispatch(setSelectedCardId({ selectedCardId: card._id }));
    }
  }

  deselectCard() {
    this.store$.dispatch(setSelectedCardId({ selectedCardId: undefined }));
    this.store$.dispatch(
      setSelectedEnemyCardId({ selectedCardId: undefined })
    );
  }

  updatePlayer(player: Player) {
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
    const height = Math.trunc((this.innerHeight - 254) / 6);
    this.cardHeight = height;
    this.cardWidth = Math.trunc(this.cardHeight * 0.7159);
    this.cardBorderRadius = Math.trunc(this.cardHeight * 0.06);
  }

  shuffle() {
    const deck: Card[] = [];
    this.deck.forEach((card) =>
      deck.push({ ...card, position: Math.random() })
    );
    this.store$.dispatch(updateManyCardsRequest({ cards: deck }));
  }

  zoomIn() {
    this.cardHeight += 25;
    this.cardWidth = Math.trunc(this.cardHeight * 0.7159);
  }

  zoomOut() {
    this.cardHeight -= 25;
    this.cardWidth = Math.trunc(this.cardHeight * 0.7159);
  }

  toggleSearchMode() {
    this.mode === 'search' ? (this.mode = undefined) : (this.mode = 'search');
  }

  triggerAction(event: { card?: Card; actionType: string }) {
    const card = event.card;
    const actionType = event.actionType;
    if (card) {
      let place = card.place;
      switch (actionType) {
        case 'toggle-tap': {
          setTimeout(() => {
            this.updateCard({ ...card, tapped: !card.tapped });
          }, 600);
          break;
        }
        case 'kill': {
          place = 'graveyard';
          this.updateCard({ ...card, place });
          break;
        }
        case 'exile': {
          place = 'exile';
          this.updateCard({ ...card, place });
          break;
        }
        case 'return-to-hand': {
          place = 'hand';
          this.updateCard({ ...card, place });
          break;
        }
        case 'add-counter': {
          const counter = card.counter + 1;
          this.updateCard({ ...card, counter });
          break;
        }
        case 'remove-counter': {
          if (card.counter > 0) {
            const counter = card.counter - 1;
            this.updateCard({ ...card, counter });
          }
          break;
        }
        case 'zoom': {
          this.selectCard(card);
          break;
        }
        case 'attach-to': {
          this.store$.dispatch(
            setActiveAttachCardId({ activeAttachCardId: card._id })
          );
          this.mode = 'attach';
          break;
        }
        case 'attach': {
          if (
            card._id !== this.activeAttachCard._id &&
            !card.isEnemyCard &&
            card.place !== 'hand'
          ) {
            const updatedCard: Card = {
              ...card,
              attachedCards: card.attachedCards.concat(this.activeAttachCard),
            };
            this.updateCard(updatedCard);
            this.store$.dispatch(
              deleteCardRequest({ card: this.activeAttachCard })
            );
            this.mode = undefined;
          }
          break;
        }
        case 'unattach': {
          card.attachedCards.forEach((c) => {
            this.updateCard({ ...c, _rev: undefined });
          });
          const updatedCard: Card = {
            ...card,
            attachedCards: [],
          };
          this.updateCard(updatedCard);
          break;
        }
        case 'search': {
          if (card.place === 'deck') {
            this.searchMode = 'deck';
          } else if (card.place === 'graveyard') {
            this.searchMode = 'graveyard';
          } else if (card.place === 'exile') {
            this.searchMode = 'exile';
          }
          this.toggleSearchMode();
          break;
        }
      }
    }
    switch (actionType) {
      case 'draw': {
        this.draw();
        break;
      }
      case 'shuffle': {
        this.shuffle();
        break;
      }
    }
  }
}
