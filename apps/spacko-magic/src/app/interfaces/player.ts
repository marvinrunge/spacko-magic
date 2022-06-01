import { ActiveDeck } from './activeDeck';
import { Base } from './base';
import { DeckstatsDeck } from './deckstats/types';

export interface Player extends Base {
  name: string;
  life: number;
  poison: number;
  energy: number;
  other: number;
  activeDeck: ActiveDeck;
  decks: DeckstatsDeck[];
  deckstatsUserId: string;
}
