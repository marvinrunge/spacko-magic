import { MemoizedSelector, createSelector } from '@ngrx/store';

import { CardSelectors } from './card-store';
import { PlayerSelectors } from './player-store';

export const selectError: MemoizedSelector<object, string> = createSelector(
  CardSelectors.selectCardError,
  PlayerSelectors.selectPlayerError,
  (card: string, player: string) => { // add new Features with , myOtherFeature: string
    return card || player; // add new Features with || myOtherFeature
  }
);

export const selectIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  CardSelectors.selectCardIsLoading,
  PlayerSelectors.selectPlayerIsLoading,
  (card: boolean) => {
    return card;
  }
);
