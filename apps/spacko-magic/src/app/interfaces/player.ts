import { Base } from './base';
import { DeckstatsDeck } from './deckstats/types';

export interface Player extends Base {
  name: string;
  life: number;
  poison: number;
  energy: number;
  other: number;
  activeDeck: string;
  decks: DeckstatsDeck[];
  deckstatsUserId: string;
}
