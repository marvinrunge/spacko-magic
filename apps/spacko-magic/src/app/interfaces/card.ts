import { Base } from "./base";

export class Card implements Base {
  _id: string;
  _deleted: boolean;
  _rev: string;
  url: string;
  counter: number;
  tapped: boolean;
  marked: boolean;
  position: number;
  cardFaces?: {
    frontUrl: string,
    backUrl: string
  }
  type: string;
  place: "deck" | "hand" | "graveyard" | "stack" | "battlefield" | "exile";
  attachedCards: Card[];
  isEnemyCard?: boolean;
  count: number;
  cmc: number;
  scryfall_uri: string;
}
