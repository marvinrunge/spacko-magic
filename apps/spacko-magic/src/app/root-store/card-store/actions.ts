import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Card } from '../../interfaces/card';

export const loadCardsRequest = createAction('[Card] Load Card Request');
export const loadCardsFailure = createAction('[Card] Load Card Failure', props<{error: string}>());
export const loadCardsSuccess = createAction('[Card] Load Card Success', props<{cards: Card[]}>());
export const addCardRequest = createAction('[Card] Add Card Request', props<{card: Card}>());
export const addCardFailure = createAction('[Card] Add Card Failure', props<{error: string}>());
export const addCardSuccess = createAction('[Card] Add Card Success');
export const updateCardRequest = createAction('[Card] Update Card Request', props<{card: Card}>());
export const updateCardFailure = createAction('[Card] Update Card Failure', props<{error: string}>());
export const updateCardSuccess = createAction('[Card] Update Card Success', props<{card: Update<Card>}>());
export const addUpdateCardSuccess = createAction('[Card] Add | Update Card Success', props<{card: Card}>());
export const deleteCardRequest = createAction('[Card] Delete Card Request', props<{card: Card}>());
export const deleteCardFailure = createAction('[Card] Delete Card Failure', props<{error: string}>());
export const deleteCardSuccess = createAction('[Card] Delete Card Success', props<{id: string}>());
export const resetCardRequest = createAction('[Card] Reset Card Request');
export const resetCardFailure = createAction('[Card] Reset Card Failure', props<{error: string}>());
export const resetCardSuccess = createAction('[Card] Reset Card Success');
export const setSelectedCardId = createAction('[Card] Set Selected Card Id', props<{selectedCardId?: string}>());
