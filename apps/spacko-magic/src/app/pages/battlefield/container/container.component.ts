import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Card } from '../../../interfaces/card';
import { Player } from '../../../interfaces/player';
import {
  CardSelectors,
  PlayerSelectors,
  RootStoreState,
} from '../../../root-store';
import { EnemyCardSelectors } from '../../../root-store/enemy-card-store';

@Component({
  selector: 'spacko-magic-container',
  templateUrl: './container.component.html',
})
export class BattlefieldContainerComponent implements OnInit {
  deck: Observable<Card[]>;
  hand: Observable<Card[]>;
  graveyard: Observable<Card[]>;
  exile: Observable<Card[]>;
  creatures: Observable<Card[]>;
  lands: Observable<Card[]>;
  other: Observable<Card[]>;
  stack: Observable<Card[]>;

  enemyDeck: Observable<Card[]>;
  enemyHand: Observable<Card[]>;
  enemyGraveyard: Observable<Card[]>;
  enemyExile: Observable<Card[]>;
  enemyCreatures: Observable<Card[]>;
  enemyLands: Observable<Card[]>;
  enemyOther: Observable<Card[]>;
  enemyStack: Observable<Card[]>;

  enemies: string[] = [];
  selectedEnemyPlayer: Observable<Player>;

  players: Observable<Player[]>;
  selectedPlayer: Observable<Player>;
  selectedCard?: Observable<Card>;
  activeAttachCard: Observable<Card>;

  minMaxPositionDeck: Observable<{ min: number; max: number }>;
  minMaxPositionGraveyard: Observable<{ min: number; max: number }>;
  minMaxPositionExile: Observable<{ min: number; max: number }>;

  isLoadingCards: Observable<boolean>;

  constructor(private store$: Store<RootStoreState.State>) {}

  ngOnInit(): void {
    this.players = this.store$.pipe(select(PlayerSelectors.selectAllPlayers));
    this.deck = this.store$.pipe(
      select(CardSelectors.selectByPlaceAndSortByPosition('deck'))
    );
    this.hand = this.store$.pipe(select(CardSelectors.selectByPlace('hand')));
    this.creatures = this.store$.pipe(
      select(
        CardSelectors.selectByPlaceAndTypeAndSortByPosition(
          'battlefield',
          'creature'
        )
      )
    );
    this.lands = this.store$.pipe(
      select(
        CardSelectors.selectByPlaceAndTypeAndSortById('battlefield', 'land')
      )
    );
    this.other = this.store$.pipe(
      select(
        CardSelectors.selectByPlaceAndNotTypes('battlefield', [
          'creature',
          'land',
          'instant',
          'sorcery',
        ])
      )
    );
    this.graveyard = this.store$.pipe(
      select(CardSelectors.selectByPlaceAndSortByPosition('graveyard'))
    );
    this.exile = this.store$.pipe(
      select(CardSelectors.selectByPlaceAndSortByPosition('exile'))
    );
    this.stack = this.store$.pipe(
      select(CardSelectors.selectByPlaceAndSortByPosition('stack'))
    );
    this.selectedPlayer = this.store$.pipe(
      select(PlayerSelectors.selectPlayerBySelectedId)
    );
    this.activeAttachCard = this.store$.pipe(
      select(CardSelectors.selectActiveAttachCardBySelectedId)
    );
    this.enemyDeck = this.store$.pipe(
      select(EnemyCardSelectors.selectByPlaceAndSortByPosition('deck'))
    );
    this.enemyHand = this.store$.pipe(
      select(EnemyCardSelectors.selectByPlace('hand'))
    );
    this.enemyCreatures = this.store$.pipe(
      select(EnemyCardSelectors.selectByPlaceAndType('battlefield', 'creature'))
    );
    this.enemyLands = this.store$.pipe(
      select(
        EnemyCardSelectors.selectByPlaceAndTypeAndSortById(
          'battlefield',
          'land'
        )
      )
    );
    this.enemyOther = this.store$.pipe(
      select(
        EnemyCardSelectors.selectByPlaceAndNotTypes(
          'battlefield',
          'creature',
          'land'
        )
      )
    );
    this.enemyGraveyard = this.store$.pipe(
      select(EnemyCardSelectors.selectByPlaceAndSortByPosition('graveyard'))
    );
    this.enemyExile = this.store$.pipe(
      select(EnemyCardSelectors.selectByPlaceAndSortByPosition('exile'))
    );
    this.enemyStack = this.store$.pipe(
      select(EnemyCardSelectors.selectByPlaceAndSortByPosition('stack'))
    );
    this.selectedEnemyPlayer = this.store$.pipe(
      select(PlayerSelectors.selectEnemyPlayerBySelectedId)
    );
    this.minMaxPositionDeck = this.store$.pipe(
      select(CardSelectors.selectMinMaxPosition('deck'))
    );
    this.minMaxPositionGraveyard = this.store$.pipe(
      select(CardSelectors.selectMinMaxPosition('graveyard'))
    );
    this.minMaxPositionExile = this.store$.pipe(
      select(CardSelectors.selectMinMaxPosition('exile'))
    );
    this.isLoadingCards = this.store$.pipe(
      select(CardSelectors.selectCardIsLoading)
    );
  }
}
