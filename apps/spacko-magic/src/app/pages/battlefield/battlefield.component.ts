import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';

import { AddEnemyModalComponent } from '../../components/add-enemy-modal/add-enemy-modal.component';
import { GameService } from '../../game.service';
import { Card } from '../../interfaces/card';
import { Player } from '../../interfaces/player';
import { RootStoreState } from '../../root-store';
import {
  addCardRequest,
  deleteCardRequest,
  setActiveAttachCardId,
  updateCardRequest,
  updateManyCardsRequest,
} from '../../root-store/card-store/actions';
import { updatePlayerRequest } from '../../root-store/player-store/actions';

function isTouchScreendevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints;
}

@Component({
  selector: 'spacko-magic-battlefield',
  templateUrl: './battlefield.component.html',
  styleUrls: ['./battlefield.component.css'],
})
export class BattlefieldComponent implements OnInit {
  @ViewChild('handScroll') handScroll: ElementRef;

  @Input() deck: Card[] = [];
  @Input() hand: Card[] = [];
  @Input() graveyard: Card[] = [];
  @Input() exile: Card[] = [];
  @Input() creatures: Card[] = [];
  @Input() lands: Card[] = [];
  @Input() other: Card[] = [];
  private _stack: Card[] = [];

  @Input() set stack(value: Card[]) {
    this._stack = value;
    if (value.length > 0 && !this.isStackOpen) {
      this.isStackOpen = true;
    } else if (
      value.length === 0 &&
      this._enemyStack.length === 0 &&
      this.isStackOpen
    ) {
      this.isStackOpen = false;
    }
  }

  get stack(): Card[] {
    return this._stack;
  }

  private _enemyStack: Card[] = [];
  @Input() set enemyStack(value: Card[]) {
    this._enemyStack = value;
    if (value.length > 0 && !this.isStackOpen) {
      this.isStackOpen = true;
    } else if (
      value.length === 0 &&
      this._stack.length === 0 &&
      this.isStackOpen
    ) {
      this.isStackOpen = false;
    }
  }

  get enemyStack(): Card[] {
    return this._enemyStack;
  }
  @Input() enemyDeck: Card[] = [];
  @Input() enemyHand: Card[] = [];
  @Input() enemyGraveyard: Card[] = [];
  @Input() enemyExile: Card[] = [];
  @Input() enemyCreatures: Card[] = [];
  @Input() enemyLands: Card[] = [];
  @Input() enemyOther: Card[] = [];
  @Input() selectedEnemyPlayer: Player;

  @Input() minPositionDeck?: number = 0;
  @Input() maxPositionDeck?: number = 0;
  @Input() minPositionGraveyard?: number = 0;
  @Input() maxPositionGraveyard?: number = 0;
  @Input() minPositionExile?: number = 0;
  @Input() maxPositionExile?: number = 0;

  @Input() players: Player[];
  @Input() selectedPlayer: Player;
  @Input() selectedCard?: Card;
  @Input() activeAttachCard: Card;
  @Input() isLoading = false;

  enemies: string[] = [];
  settingsOpen = true;
  cardHeight = 160;
  cardWidth = 115;
  cardBorderRadius = 10;
  innerHeight: number;
  mode?: string;
  searchOptions?: { location: string; openCardAmount?: number };
  rotation = 0;
  tokenOptions: {
    searchName: string;
    searchResult: Card[];
    isTokenFilterActive: boolean;
  } = { searchName: '', searchResult: [], isTokenFilterActive: true };

  touch = false;
  activeHandCard?: string;
  isStackOpen = true;

  get stackWidth() {
    const maxStackLength = Math.max(this.stack.length, this.enemyStack.length);
    const additionalStackWidth =
      maxStackLength > 0
        ? ((maxStackLength - 1) * (this.cardWidth * 1.6)) / 3
        : 0;
    return this.cardWidth * 1.6 + additionalStackWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setCardHeight();
  }

  constructor(
    private store$: Store<RootStoreState.State>,
    private dialog: MatDialog,
    private game: GameService,
    private snackBar: MatSnackBar
  ) {
    if (isTouchScreendevice()) {
      this.touch = true;
    } else {
      this.touch = false;
    }
  }

  ngOnInit() {
    this.setCardHeight();
    this.loadEnemies();
  }

  loadEnemies() {
    const usernames = localStorage.getItem('current-enemies');
    if (usernames) {
      this.enemies = usernames.split(',');
      this.game.addEnemies(this.enemies);
    }
  }

  changeEnemy(username: string) {
    this.game.changeEnemy(username);
  }

  toggleSearchToken() {
    if (this.mode !== 'token') {
      this.mode = 'token';
    } else {
      this.mode = undefined;
    }
  }

  searchCards(cardSearchName: string, onlyTokens: boolean) {
    this.game
      .getCardsByName(cardSearchName, onlyTokens)
      .then((cards) => (this.tokenOptions.searchResult = cards));
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddEnemyModalComponent, {
      width: '300px',
    });

    dialogRef.componentInstance.players = this.players;
    dialogRef.componentInstance.selectedPlayerNames = [...this.enemies];

    dialogRef.afterClosed().subscribe((playerNames: string[]) => {
      if (playerNames.length > 0) {
        this.game.addEnemies(playerNames);
        this.enemies = playerNames;
      }
    });
  }

  draw() {
    if (this.deck.length > 0) {
      let card = this.deck[0];
      card = { ...card, place: 'hand' };
      this.store$.dispatch(updateCardRequest({ card: card }));
    } else {
      this.snackBar.open('Deck is empty');
    }
  }

  play(card: Card) {
    const playedCard: Card = {
      ...card,
      place: ['instant', 'sorcery'].includes(card.type)
        ? 'stack'
        : 'battlefield',
      lastPlayedDate: new Date().toUTCString(),
    };
    if (!this.touch) {
      this.store$.dispatch(updateCardRequest({ card: playedCard }));
    } else {
      if (this.activeHandCard === card._id) {
        this.store$.dispatch(updateCardRequest({ card: playedCard }));
      }
      this.activeHandCard = this.activeHandCard ? undefined : card._id;
    }
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
    this.selectedCard = card;
  }

  deselectCard() {
    this.selectedCard = undefined;
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
    this.cardHeight = Math.trunc((this.innerHeight - 158) / 4);
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

  rotate(event: any) {
    event.stopPropagation();
    this.rotation += 90;
  }

  restart() {
    if (confirm('Are you sure to restart?')) {
      this.game.initDeck(
        this.selectedPlayer.activeDeck.cardList,
        this.selectedPlayer.name
      );
    }
  }

  untapAll() {
    const allTapped: Card[] = this.creatures
      .concat(this.other)
      .concat(this.lands);
    const allUntapped: Card[] = [];
    allTapped.forEach((card) => allUntapped.push({ ...card, tapped: false }));
    this.store$.dispatch(updateManyCardsRequest({ cards: allUntapped }));
  }

  triggerAction(event: { card?: Card; actionType: string }) {
    const card = event.card;
    const actionType = event.actionType;
    if (card) {
      switch (actionType) {
        case 'toggle-tap': {
          this.toggleTap(card);
          break;
        }
        case 'kill': {
          this.kill(card);
          break;
        }
        case 'exile': {
          this.exileCard(card);
          break;
        }
        case 'return-to-hand': {
          this.returnToHand(card);
          break;
        }
        case 'put-on-top': {
          this.putOnTop(card);
          break;
        }
        case 'put-on-bottom': {
          this.putOnBottom(card);
          break;
        }
        case 'add-counter': {
          this.addCounter(card);
          break;
        }
        case 'remove-counter': {
          this.removeCounter(card);
          break;
        }
        case 'zoom': {
          this.selectCard(card);
          break;
        }
        case 'attach-to': {
          this.attachTo(card);
          break;
        }
        case 'attach': {
          this.attach(card);
          break;
        }
        case 'unattach': {
          this.updateCard(this.unattach(card));
          break;
        }
        case 'search': {
          this.search(card);
          break;
        }
        case 'look-at-top': {
          this.search(card, 1);
          break;
        }
        case 'flip': {
          this.flip(card);
          break;
        }
        case 'spawn-token': {
          this.spawnToken(card);
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
      case 'restart': {
        this.restart();
        break;
      }
      case 'untapAll': {
        this.untapAll();
        break;
      }
    }
  }

  spawnToken(card: Card) {
    card.place = 'battlefield';
    card.isToken = true;
    this.store$.dispatch(addCardRequest({ card }));
  }

  toggleStack() {
    this.isStackOpen = !this.isStackOpen;
  }

  private exileCard(card: Card) {
    this.reduceOpenCardAmount();
    this.updateCard({
      ...this.unattach({
        ...card,
        place: 'exile',
        tapped: false,
        position:
          this.minPositionExile && Number.isFinite(this.minPositionExile)
            ? this.minPositionExile - 1
            : card.position,
      }),
    });
  }

  private returnToHand(card: Card) {
    this.reduceOpenCardAmount();
    this.updateCard({ ...this.unattach(card), place: 'hand', tapped: false });
  }

  private kill(card: Card) {
    this.reduceOpenCardAmount();
    if (card.isToken) {
      this.store$.dispatch(deleteCardRequest({ card }));
    } else {
      this.updateCard({
        ...this.unattach({
          ...card,
          place: 'graveyard',
          tapped: false,
          position:
            this.minPositionGraveyard &&
            Number.isFinite(this.minPositionGraveyard)
              ? this.minPositionGraveyard - 1
              : card.position,
        }),
      });
    }
  }

  private putOnBottom(card: Card) {
    this.reduceOpenCardAmount();
    const place = 'deck';
    const position =
      this.maxPositionDeck !== undefined ? this.maxPositionDeck + 1 : 0;
    this.updateCard({
      ...this.unattach({ ...card, place, position, tapped: false }),
    });
  }

  private putOnTop(card: Card) {
    this.reduceOpenCardAmount();
    const place = 'deck';
    const position =
      this.minPositionDeck !== undefined ? this.minPositionDeck - 1 : 0;
    this.updateCard({
      ...this.unattach({ ...card, place, position, tapped: false }),
    });
  }

  private search(card: Card, openCardAmount?: number) {
    this.searchOptions;
    if (card.place === 'deck') {
      this.searchOptions = {
        location: 'deck',
        openCardAmount,
      };
    } else if (card.place === 'graveyard') {
      this.searchOptions = {
        location: 'graveyard',
      };
    } else if (card.place === 'exile') {
      this.searchOptions = {
        location: 'exile',
      };
    }
    this.toggleSearchMode();
  }

  private toggleTap(card: Card) {
    if (card.place === 'battlefield') {
      setTimeout(() => {
        this.updateCard({ ...card, tapped: !card.tapped });
      }, 300);
    }
  }

  private addCounter(card: Card) {
    const counter = card.counter + 1;
    this.updateCard({ ...card, counter });
  }

  private removeCounter(card: Card) {
    if (card.counter > 0) {
      const counter = card.counter - 1;
      this.updateCard({ ...card, counter });
    }
  }

  private flip(card: Card) {
    if (card.url === card.cardFaces?.frontUrl) {
      this.updateCard({ ...card, url: card.cardFaces?.backUrl });
    } else if (card.url === card.cardFaces?.backUrl) {
      this.updateCard({ ...card, url: card.cardFaces?.frontUrl });
    }
  }

  private attachTo(card: Card) {
    this.store$.dispatch(
      setActiveAttachCardId({ activeAttachCardId: card._id })
    );
    this.mode = 'attach';
  }

  private attach(card: Card) {
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
      this.store$.dispatch(deleteCardRequest({ card: this.activeAttachCard }));
      this.mode = undefined;
    }
  }

  private unattach(card: Card): Card {
    card.attachedCards.forEach((c) => {
      this.updateCard({ ...c, position: card.position, _rev: '' });
    });
    const updatedCard: Card = {
      ...card,
      attachedCards: [],
    };
    return updatedCard;
  }

  private reduceOpenCardAmount() {
    if (this.searchOptions && this.searchOptions.openCardAmount !== undefined) {
      this.searchOptions.openCardAmount -= 1;
    }
  }
}
