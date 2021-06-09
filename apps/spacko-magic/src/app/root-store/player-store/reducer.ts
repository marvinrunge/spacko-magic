import { Action, createReducer, on } from '@ngrx/store';

import * as PlayerActions from './actions';
import { PlayerState, initialPlayerState, playerAdapter } from './state';
import { Update } from '@ngrx/entity';
import { Player } from '../../interfaces/player';

export const playerReducer = createReducer(
  initialPlayerState,
  on(PlayerActions.loadPlayersRequest, state => ({
    ...state, isLoading: true, error: undefined
  })),
  on(PlayerActions.loadPlayersSuccess, (state, { players }) => {
    return playerAdapter.upsertMany(players, {
      ...state, isLoading: false, error: undefined });
  }),
  on(PlayerActions.loadPlayersFailure, (state, { error }) => ({
    ...state, isLoading: false, error
  })),
  on(PlayerActions.addUpdatePlayerSuccess, (state, { player }) => {
    const id = player._id as string;
    const ids = state.ids as string[];
    if (ids.includes(id)) {
      const update: Update<Player> = {
        id: player._id,
        changes: player as Player
      };
      return playerAdapter.updateOne(update, {
        ...state, isLoading: false, error: undefined });
    } else {
      return playerAdapter.upsertOne(player, {
        ...state, isLoading: false, error: undefined });
    }
  }),
  on(PlayerActions.deletePlayerRequest, state => ({
    ...state, isLoading: true, error: undefined
  })),
  on(PlayerActions.deletePlayerSuccess, (state, { id }) => {
    return playerAdapter.removeOne(id, {
      ...state, isLoading: false, error: undefined });
  }),
  on(PlayerActions.deletePlayerFailure, (state, { error }) => ({
    ...state, isLoading: false, error
  })),
  on(PlayerActions.addPlayerRequest, state => ({
    ...state, isLoading: true, error: undefined
  })),
  on(PlayerActions.addPlayerSuccess, state => ({
    ...state, isLoading: false, error: undefined
  })),
  on(PlayerActions.addPlayerFailure, (state, { error }) => ({
    ...state, isLoading: false, error
  })),
  on(PlayerActions.resetPlayerRequest, state => ({
    ...state, isLoading: true, error: undefined
  })),
  on(PlayerActions.resetPlayerSuccess, state => {
    return playerAdapter.removeAll({
      ...state, isLoading: false, error: undefined
    });
  }),
  on(PlayerActions.resetPlayerFailure, (state, { error }) => ({
    ...state, isLoading: false, error
  })),
  on(PlayerActions.setSelectedPlayerId, (state, { selectedPlayerId }) => ({
    ...state, selectedPlayerId
  })),
  on(PlayerActions.setSelectedEnemyPlayerId, (state, { selectedPlayerId }) => ({
    ...state, selectedEnemyPlayerId: selectedPlayerId
  }))
);

export function playerreducer(state: PlayerState | undefined, action: Action) {
  return playerReducer(state, action);
}
