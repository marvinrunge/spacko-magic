import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Player } from '../../interfaces/player';

/** additional entity state properties */
export interface PlayerState extends EntityState<Player> {
  isLoading: boolean;
  error?: any;
  selectedPlayerId?: string;
}

/** function to determine which field to use as a ID inside the store */
export function selectPlayerId(player: Player): string {
  return String(player._id);
}

export const playerAdapter: EntityAdapter<Player> = createEntityAdapter<Player>({
  selectId: selectPlayerId
});

export const initialPlayerState: PlayerState = playerAdapter.getInitialState(
  {
    isLoading: false,
    error: undefined,
    selectedPlayerId: undefined
  }
);

/** use some of the selectors implemented by the ngrx store library */
const {
  selectAll
} = playerAdapter.getSelectors();

export const selectAllPlayers = selectAll;
