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
  updateCardRequest,
  updateManyCardsRequest,
} from '../../root-store/card-store/actions';
import { EnemyCardSelectors } from '../../root-store/enemy-card-store';
import { updatePlayerRequest } from '../../root-store/player-store/actions';
import { MatDialog } from '@angular/material/dialog';
import { AddEnemyModalComponent } from '../../components/add-enemy-modal/add-enemy-modal.component';
import { GameService } from '../../game.service';
import { MatSnackBar } from '@angular/material/snack-bar';

function isTouchScreendevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints;
}

@Component({
  templateUrl: './battlefield.component.html',
  styleUrls: ['./battlefield.component.css'],
})
export class BattlefieldComponent implements OnInit {
  @ViewChild('handScroll') handScroll: ElementRef;

  title = 'spacko-magic';
  deck: Card[] = [];
  hand: Card[] = [];
  graveyard: Card[] = [];
  exile: Card[] = [];
  creatures: Card[] = [];
  lands: Card[] = [];
  other: Card[] = [];
  enemies: string[] = [];

  enemyDeck: Card[] = [];
  enemyHand: Card[] = [];
  enemyGraveyard: Card[] = [];
  enemyExile: Card[] = [];
  enemyCreatures: Card[] = [];
  enemyLands: Card[] = [];
  enemyOther: Card[] = [];
  selectedEnemyPlayer: Player;

  minPositionDeck?: number = 0;
  maxPositionDeck?: number = 0;
  minPositionGraveyard?: number = 0;
  maxPositionGraveyard?: number = 0;
  minPositionExile?: number = 0;
  maxPositionExile?: number = 0;

  players: Player[];
  selectedPlayer: Player;
  selectedCard?: Card;
  activeAttachCard: Card;
  settingsOpen = true;
  cardHeight = 160;
  cardWidth = 115;
  cardBorderRadius = 10;
  innerHeight: number;
  mode?: string;
  searchMode?: string;
  rotateActive = false;

  touch = false;
  activeHandCard?: string;

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
    this.store$
      .pipe(select(PlayerSelectors.selectAllPlayers))
      .subscribe((players) => (this.players = players));
    this.store$
      .pipe(select(CardSelectors.selectByPlaceAndSortByPosition('deck')))
      .subscribe((cards) => (this.deck = cards));
    this.store$
      .pipe(select(CardSelectors.selectByPlace('hand')))
      .subscribe((cards) => (this.hand = cards));
    this.store$
      .pipe(
        select(
          CardSelectors.selectByPlaceAndTypeAndSortByPosition(
            'battlefield',
            'creature'
          )
        )
      )
      .subscribe((cards) => (this.creatures = cards));
    this.store$
      .pipe(
        select(
          CardSelectors.selectByPlaceAndTypeAndSortByPosition(
            'battlefield',
            'land'
          )
        )
      )
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
      .pipe(select(CardSelectors.selectByPlaceAndSortByPosition('graveyard')))
      .subscribe((cards) => (this.graveyard = cards));
    this.store$
      .pipe(select(CardSelectors.selectByPlaceAndSortByPosition('exile')))
      .subscribe((cards) => (this.exile = cards));
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
      .pipe(
        select(EnemyCardSelectors.selectByPlaceAndSortByPosition('graveyard'))
      )
      .subscribe((cards) => (this.enemyGraveyard = cards));
    this.store$
      .pipe(select(EnemyCardSelectors.selectByPlaceAndSortByPosition('exile')))
      .subscribe((cards) => (this.enemyExile = cards));
    this.store$
      .pipe(select(PlayerSelectors.selectEnemyPlayerBySelectedId))
      .subscribe((player) => {
        this.selectedEnemyPlayer = player;
      });
    this.store$
      .pipe(select(CardSelectors.selectMinMaxPosition('deck')))
      .subscribe((result) => {
        this.maxPositionDeck = result.max;
        this.minPositionDeck = result.min;
      });
    this.store$
      .pipe(select(CardSelectors.selectMinMaxPosition('graveyard')))
      .subscribe((result) => {
        this.maxPositionGraveyard = result.max;
        this.minPositionGraveyard = result.min;
      });
    this.store$
      .pipe(select(CardSelectors.selectMinMaxPosition('exile')))
      .subscribe((result) => {
        this.maxPositionExile = result.max;
        this.minPositionExile = result.min;
      });
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
    if (!this.touch) {
      const playedCard: Card = { ...card, place: 'battlefield' };
      this.store$.dispatch(updateCardRequest({ card: playedCard }));
    } else {
      if (this.activeHandCard === card._id) {
        const playedCard: Card = { ...card, place: 'battlefield' };
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
    this.rotateActive = !this.rotateActive;
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

  private exileCard(card: Card) {
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
    this.updateCard({ ...this.unattach(card), place: 'hand', tapped: false });
  }

  private kill(card: Card) {
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

  private putOnBottom(card: Card) {
    const place = 'deck';
    const position =
      this.maxPositionDeck !== undefined ? this.maxPositionDeck + 1 : 0;
    this.updateCard({
      ...this.unattach({ ...card, place, position, tapped: false }),
    });
  }

  private putOnTop(card: Card) {
    const place = 'deck';
    const position =
      this.minPositionDeck !== undefined ? this.minPositionDeck - 1 : 0;
    this.updateCard({
      ...this.unattach({ ...card, place, position, tapped: false }),
    });
  }

  private search(card: Card) {
    if (card.place === 'deck') {
      this.searchMode = 'deck';
    } else if (card.place === 'graveyard') {
      this.searchMode = 'graveyard';
    } else if (card.place === 'exile') {
      this.searchMode = 'exile';
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
}
