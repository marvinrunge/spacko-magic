import { Base } from "./base";

export interface Card extends Base {
  url: string;
  counter: number;
  tapped: boolean;
  marked: boolean;
  type: "creature" | "land" | "spell";
  place: "deck" | "hand" | "graveyard" | "stack" | "battlefield";
}
