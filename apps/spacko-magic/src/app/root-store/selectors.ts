import { MemoizedSelector, createSelector } from '@ngrx/store';

import { CardSelectors } from './card-store';

export const selectError: MemoizedSelector<object, string> = createSelector(
  CardSelectors.selectCardError,
  (card: string) => { // add new Features with , myOtherFeature: string
    return card; // add new Features with || myOtherFeature
  }
);

export const selectIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  CardSelectors.selectCardIsLoading,
  (card: boolean) => {
    return card;
  }
);
