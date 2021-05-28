import { Action, createReducer, on } from '@ngrx/store';

import * as CardActions from './actions';
import { CardState, initialCardState, cardAdapter } from './state';
import { Update } from '@ngrx/entity';
import { Card } from '../../interfaces/card';

export const cardReducer = createReducer(
  initialCardState,
  on(CardActions.loadRequest, state => ({
    ...state, isLoading: true, error: undefined
  })),
  on(CardActions.loadSuccess, (state, { cards }) => {
    return cardAdapter.upsertMany(cards, {
      ...state, isLoading: false, error: undefined });
  }),
  on(CardActions.loadFailure, (state, { error }) => ({
    ...state, isLoading: false, error
  })),
  on(CardActions.addUpdateSuccess, (state, { card }) => {
    const id = card._id as string;
    const ids = state.ids as string[];
    if (ids.includes(id)) {
      const update: Update<Card> = {
        id: card._id,
        changes: card as Card
      };
      return cardAdapter.updateOne(update, {
        ...state, isLoading: false, error: undefined });
    } else {
      return cardAdapter.upsertOne(card, {
        ...state, isLoading: false, error: undefined });
    }
  }),
  on(CardActions.deleteRequest, state => ({
    ...state, isLoading: true, error: undefined
  })),
  on(CardActions.deleteSuccess, (state, { id }) => {
    return cardAdapter.removeOne(id, {
      ...state, isLoading: false, error: undefined });
  }),
  on(CardActions.deleteFailure, (state, { error }) => ({
    ...state, isLoading: false, error
  })),
  on(CardActions.addRequest, state => ({
    ...state, isLoading: true, error: undefined
  })),
  on(CardActions.addSuccess, state => ({
    ...state, isLoading: false, error: undefined
  })),
  on(CardActions.addFailure, (state, { error }) => ({
    ...state, isLoading: false, error
  })),
  on(CardActions.resetRequest, state => ({
    ...state, isLoading: true, error: undefined
  })),
  on(CardActions.resetSuccess, state => {
    return cardAdapter.removeAll({
      ...state, isLoading: false, error: undefined
    });
  }),
  on(CardActions.resetFailure, (state, { error }) => ({
    ...state, isLoading: false, error
  })),
  on(CardActions.setSelectedCardId, (state, { selectedCardId }) => ({
    ...state, selectedCardId
  }))
);

export function cardreducer(state: CardState | undefined, action: Action) {
  return cardReducer(state, action);
}
