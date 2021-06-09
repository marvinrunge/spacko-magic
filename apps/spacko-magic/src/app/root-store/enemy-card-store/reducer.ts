import { Action, createReducer, on } from '@ngrx/store';

import * as CardActions from './actions';
import { EnemyCardState, initialCardState, cardAdapter } from './state';
import { Update } from '@ngrx/entity';
import { Card } from '../../interfaces/card';

export const cardReducer = createReducer(
  initialCardState,
  on(CardActions.loadEnemyCardsRequest, state => ({
    ...state, isLoading: true, error: undefined
  })),
  on(CardActions.loadEnemyCardsSuccess, (state, { cards }) => {
    return cardAdapter.upsertMany(cards, {
      ...state, isLoading: false, error: undefined });
  }),
  on(CardActions.loadEnemyCardsFailure, (state, { error }) => ({
    ...state, isLoading: false, error
  })),
  on(CardActions.addUpdateEnemyCardSuccess, (state, { card }) => {
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
  on(CardActions.deleteEnemyCardRequest, state => ({
    ...state, isLoading: true, error: undefined
  })),
  on(CardActions.deleteEnemyCardSuccess, (state, { id }) => {
    return cardAdapter.removeOne(id, {
      ...state, isLoading: false, error: undefined });
  }),
  on(CardActions.deleteEnemyCardFailure, (state, { error }) => ({
    ...state, isLoading: false, error
  })),
  on(CardActions.addEnemyCardRequest, state => ({
    ...state, isLoading: true, error: undefined
  })),
  on(CardActions.addEnemyCardSuccess, state => ({
    ...state, isLoading: false, error: undefined
  })),
  on(CardActions.addEnemyCardFailure, (state, { error }) => ({
    ...state, isLoading: false, error
  })),
  on(CardActions.resetEnemyCardRequest, state => ({
    ...state, isLoading: true, error: undefined
  })),
  on(CardActions.resetEnemyCardSuccess, state => {
    return cardAdapter.removeAll({
      ...state, isLoading: false, error: undefined
    });
  }),
  on(CardActions.resetEnemyCardFailure, (state, { error }) => ({
    ...state, isLoading: false, error
  })),
  on(CardActions.setSelectedEnemyCardId, (state, { selectedCardId }) => ({
    ...state, selectedCardId
  })),
  on(CardActions.setActiveAttachEnemyCardId, (state, { activeAttachCardId }) => ({
    ...state, activeAttachCardId
  }))
);

export function cardreducer(state: EnemyCardState | undefined, action: Action) {
  return cardReducer(state, action);
}
