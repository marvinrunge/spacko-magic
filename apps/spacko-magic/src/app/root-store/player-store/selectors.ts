import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { playerreducer } from './reducer';
import * as fromPlayers from './state';

export interface State {
  players: fromPlayers.PlayerState;
}

/** https://stackoverflow.com/questions/47406386/cannot-read-property-of-map-of-undefined-when-using-featureselector-ngrx */
export const reducers: ActionReducerMap<State> = {
  players: playerreducer,
};

export const selectPlayerState = createFeatureSelector<fromPlayers.PlayerState>(
  'players'
);

export const selectAllPlayers = createSelector(
  selectPlayerState,
  fromPlayers.selectAllPlayers
);

export const selectPlayerError = createSelector(
  selectPlayerState,
  (state: fromPlayers.PlayerState) => state.error
);

export const selectPlayerIsLoading = createSelector(
  selectPlayerState,
  (state: fromPlayers.PlayerState) => state.isLoading
);

export const selectSelectedPlayerId = createSelector(
  selectPlayerState,
  (state: fromPlayers.PlayerState) => state.selectedPlayerId
);

export const selectPlayerBySelectedId = createSelector(
  selectAllPlayers,
  selectSelectedPlayerId,
  (players, selectedId) => players.filter((player) => player._id === selectedId)[0]
);
