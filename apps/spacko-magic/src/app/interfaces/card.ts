import { Base } from "./base";

export interface Card extends Base {
  borderCrop: string,
  artCrop: string,
  name: string,
  power: string,
  toughness: string,
  counter: number;
  tapped: boolean;
  marked: boolean;
  position: number;
  type: "creature" | "land" | "spell";
  place: "deck" | "hand" | "graveyard" | "stack" | "battlefield" | "exile";
  attachedCards: Card[];
  isEnemyCard?: boolean;
}
