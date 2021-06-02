import { Action, createReducer, on } from '@ngrx/store';

import * as CardActions from './actions';
import { CardState, initialCardState, cardAdapter } from './state';
import { Update } from '@ngrx/entity';
import { Card } from '../../interfaces/card';

export const cardReducer = createReducer(
  initialCardState,
  on(CardActions.loadCardsRequest, state => ({
    ...state, isLoading: true, error: undefined
  })),
  on(CardActions.loadCardsSuccess, (state, { cards }) => {
    return cardAdapter.upsertMany(cards, {
      ...state, isLoading: false, error: undefined });
  }),
  on(CardActions.loadCardsFailure, (state, { error }) => ({
    ...state, isLoading: false, error
  })),
  on(CardActions.addUpdateCardSuccess, (state, { card }) => {
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
  on(CardActions.deleteCardRequest, state => ({
    ...state, isLoading: true, error: undefined
  })),
  on(CardActions.deleteCardSuccess, (state, { id }) => {
    return cardAdapter.removeOne(id, {
      ...state, isLoading: false, error: undefined });
  }),
  on(CardActions.deleteCardFailure, (state, { error }) => ({
    ...state, isLoading: false, error
  })),
  on(CardActions.addCardRequest, state => ({
    ...state, isLoading: true, error: undefined
  })),
  on(CardActions.addCardSuccess, state => ({
    ...state, isLoading: false, error: undefined
  })),
  on(CardActions.addCardFailure, (state, { error }) => ({
    ...state, isLoading: false, error
  })),
  on(CardActions.resetCardRequest, state => ({
    ...state, isLoading: true, error: undefined
  })),
  on(CardActions.resetCardSuccess, state => {
    return cardAdapter.removeAll({
      ...state, isLoading: false, error: undefined
    });
  }),
  on(CardActions.resetCardFailure, (state, { error }) => ({
    ...state, isLoading: false, error
  })),
  on(CardActions.setSelectedCardId, (state, { selectedCardId }) => ({
    ...state, selectedCardId
  })),
  on(CardActions.setActiveAttachCardId, (state, { activeAttachCardId }) => ({
    ...state, activeAttachCardId
  }))
);

export function cardreducer(state: CardState | undefined, action: Action) {
  return cardReducer(state, action);
}
