import { Card } from './card';
import { Deck } from './deck';

export interface Player {
  _id?: string;
  deck: Deck;
  hand: Array<Card>;
  avatar: string;
  counter: number;
  mana: Array<Card>;
  creature: Array<Card>;
  graveyard: Array<Card>;
  other: Array<Card>;
  revealed: Array<Card>;
}
