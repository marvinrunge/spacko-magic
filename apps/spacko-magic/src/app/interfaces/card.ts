import { Base } from "./base";

export interface Card extends Base {
  url: string;
  counter: number;
  tapped: boolean;
  marked: boolean;
  position: number;
  type: "creature" | "land" | "spell";
  place: "deck" | "hand" | "graveyard" | "stack" | "battlefield" | "exile";
  attachedCards: Card[];
}
