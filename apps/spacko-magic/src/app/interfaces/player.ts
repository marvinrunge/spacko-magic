import { Base } from './base';

export interface Player extends Base {
  name: string;
  life: number;
  poison: number;
  energy: number;
  other: number;
  activeDeck: string;
}
