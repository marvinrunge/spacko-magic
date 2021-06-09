import { MemoizedSelector, createSelector } from '@ngrx/store';

import { CardSelectors } from './card-store';
import { PlayerSelectors } from './player-store';
import { EnemyCardSelectors } from './enemy-card-store';

export const selectError: MemoizedSelector<object, string> = createSelector(
  CardSelectors.selectCardError,
  PlayerSelectors.selectPlayerError,
  EnemyCardSelectors.selectCardError,
  (card: string, player: string, enemyCard: string) => { // add new Features with , myOtherFeature: string
    return card || player || enemyCard; // add new Features with || myOtherFeature
  }
);

export const selectIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  CardSelectors.selectCardIsLoading,
  PlayerSelectors.selectPlayerIsLoading,
  EnemyCardSelectors.selectCardIsLoading,
  (card: boolean) => {
    return card;
  }
);
