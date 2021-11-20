import { Base } from "./base";

export interface Card extends Base {
  url: string;
  counter: number;
  tapped: boolean;
  marked: boolean;
  position: number;
  type: string;
  place: "deck" | "hand" | "graveyard" | "stack" | "battlefield" | "exile";
  attachedCards: Card[];
  isEnemyCard?: boolean;
  count: number;
  cmc: number;
  scryfall_uri: string;
}
