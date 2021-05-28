import { Card } from "./card";

export interface Deck {
  _id: string;
  cards: Array<Card>;
}
