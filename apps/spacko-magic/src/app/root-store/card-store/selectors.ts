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

export const selectCardState =
  createFeatureSelector<fromCards.CardState>('cards');

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

export const selectActiveAttachCardId = createSelector(
  selectCardState,
  (state: fromCards.CardState) => state.activeAttachCardId
);

export const selectActiveAttachCardBySelectedId = createSelector(
  selectAllCards,
  selectActiveAttachCardId,
  (cards, selectedId) => cards.filter((card) => card._id === selectedId)[0]
);

export const selectMinMaxPosition = (place: string) =>
  createSelector(selectByPlace(place), (cards) => {
    const positions = cards.map((card) => card.position);
    return { min: Math.min(...positions), max: Math.max(...positions) };
  });

export const selectByPlace = (place: string) =>
  createSelector(selectAllCards, (cards) =>
    cards.filter((card) => card.place === place)
  );

export const selectByPlaceAndTypes = (place: string, types: string[]) =>
  createSelector(selectAllCards, (cards) =>
    cards.filter((card) => card.place === place && types.includes(card.type))
  );

export const selectTopByPlace = (place: string) =>
  createSelector(selectByPlace(place), (cards) => cards[0]);

export const selectByPlaceAndTypeAndSortByPosition = (
  place: string,
  type: string
) =>
  createSelector(selectByPlaceAndSortByPosition(place), (cards) =>
    cards.filter((card) => card.type.toLowerCase().includes(type.toLowerCase()))
  );

export const selectByPlaceAndTypeAndSortById = (place: string, type: string) =>
  createSelector(selectByPlaceAndSortByPosition(place), (cards) =>
    cards
      .filter((card) => card.type.toLowerCase().includes(type.toLowerCase()))
      .sort((a, b) => a._id.localeCompare(b._id))
  );

export const selectByPlaceAndSortByPosition = (place: string) =>
  createSelector(selectByPlace(place), (cards) =>
    cards.sort((a, b) => a.position - b.position)
  );

export const selectByPlaceAndSortByLastPlayedDate = (place: string) =>
  createSelector(selectByPlace(place), (cards) =>
    cards.sort((a, b) => {
      if (a.lastPlayedDate === undefined || b.lastPlayedDate === undefined) return 0;
      const dateA = new Date(a.lastPlayedDate);
      const dateB = new Date(b.lastPlayedDate);
      return dateA.getTime() - dateB.getTime();
    })
  );
  
export const selectByPlaceAndNotTypes = (place: string, types: string[]) =>
  createSelector(selectByPlace(place), (cards) =>
    cards.filter(
      (card) =>
        !types.some((type) =>
          card.type.toLowerCase().includes(type.toLowerCase())
        )
    )
  );

export const selectByPlaceAndNotType = (place: string, type: string) =>
  createSelector(selectByPlace(place), (cards) =>
    cards.filter(
      (card) => !card.type.toLowerCase().includes(type.toLowerCase())
    )
  );
