import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Card } from '../../interfaces/card';

export const loadEnemyCardsRequest = createAction('[Enemy Card] Load Card Request');
export const loadEnemyCardsFailure = createAction('[Enemy Card] Load Card Failure', props<{error: string}>());
export const loadEnemyCardsSuccess = createAction('[Enemy Card] Load Card Success', props<{cards: Card[]}>());
export const addEnemyCardRequest = createAction('[Enemy Card] Add Card Request', props<{card: Card}>());
export const addEnemyCardFailure = createAction('[Enemy Card] Add Card Failure', props<{error: string}>());
export const addEnemyCardSuccess = createAction('[Enemy Card] Add Card Success');
export const updateEnemyCardRequest = createAction('[Enemy Card] Update Card Request', props<{card: Card}>());
export const updateEnemyCardFailure = createAction('[Enemy Card] Update Card Failure', props<{error: string}>());
export const updateEnemyCardSuccess = createAction('[Enemy Card] Update Card Success', props<{card: Update<Card>}>());
export const updateManyEnemyCardsRequest = createAction('[Enemy Card] Update Many Cards Request', props<{cards: Card[]}>());
export const updateManyEnemyCardsFailure = createAction('[Enemy Card] Update Many Cards Failure', props<{error: string}>());
export const updateManyEnemyCardsSuccess = createAction('[Enemy Card] Update Many Cards Success', props<{cards: Update<Card[]>}>());
export const addUpdateEnemyCardSuccess = createAction('[Enemy Card] Add | Update Card Success', props<{card: Card}>());
export const deleteEnemyCardRequest = createAction('[Enemy Card] Delete Card Request', props<{card: Card}>());
export const deleteEnemyCardFailure = createAction('[Enemy Card] Delete Card Failure', props<{error: string}>());
export const deleteEnemyCardSuccess = createAction('[Enemy Card] Delete Card Success', props<{id: string}>());
export const resetEnemyCardRequest = createAction('[Enemy Card] Reset Card Request');
export const resetEnemyCardFailure = createAction('[Enemy Card] Reset Card Failure', props<{error: string}>());
export const resetEnemyCardSuccess = createAction('[Enemy Card] Reset Card Success');
export const setSelectedEnemyCardId = createAction('[Enemy Card] Set Selected Card Id', props<{selectedCardId?: string}>());
export const setActiveAttachEnemyCardId = createAction('[Enemy Card] Set Active Attach Card Id', props<{activeAttachCardId?: string}>());
