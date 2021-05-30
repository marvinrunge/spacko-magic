import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { cardreducer } from './reducer';
import * as fromCards from './state';

export interface State {
  cards: fromCards.CardState;
}

/** https://stackoverflow.com/questions/47406386/cannot-read-property-of-map-of-undefined-when-using-featureselector-ngrx */
export const reducers: ActionReducerMap<State> = {
  cards: cardreducer,
};

export const selectCardState = createFeatureSelector<fromCards.CardState>(
  'cards'
);

export const selectAllCards = createSelector(
  selectCardState,
  fromCards.selectAllCards
);

export const selectCardError = createSelector(
  selectCardState,
  (state: fromCards.CardState) => state.error
);

export const selectCardIsLoading = createSelector(
  selectCardState,
  (state: fromCards.CardState) => state.isLoading
);

export const selectSelectedCardId = createSelector(
  selectCardState,
  (state: fromCards.CardState) => state.selectedCardId
);

export const selectCardBySelectedId = createSelector(
  selectAllCards,
  selectSelectedCardId,
  (cards, selectedId) => cards.filter((card) => card._id === selectedId)[0]
);

export const selectByPlace = (place: string) =>
  createSelector(selectAllCards, (cards) =>
    cards.filter((card) => card.place === place)
  );

export const selectTopByPlace = (place: string) =>
  createSelector(selectByPlace(place), (cards) =>
    cards[0]
  );

export const selectByPlaceAndType = (place: string, type: string) =>
  createSelector(selectByPlace(place), (cards) =>
    cards.filter((card) => card.type.toLowerCase().includes(type.toLowerCase()))
  );

export const selectByPlaceAndSortByPosition = (place: string) =>
  createSelector(selectByPlace(place), (cards) =>
    cards
      .sort((a, b) => a.position - b.position)
  );

export const selectByPlaceAndNotTypes = (
  place: string,
  type1: string,
  type2: string
) =>
  createSelector(selectByPlace(place), (cards) =>
    cards.filter(
      (card) => !card.type.toLowerCase().includes(type1.toLowerCase()) && !card.type.toLowerCase().includes(type2.toLowerCase())
    )
  );
