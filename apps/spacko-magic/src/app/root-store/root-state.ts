import { CardState } from './card-store/state';
import { EnemyCardState } from './enemy-card-store/state';
import { PlayerState } from './player-store/state';

export interface State {
  cards: CardState;
  players: PlayerState;
  enemyCards: EnemyCardState;
}
