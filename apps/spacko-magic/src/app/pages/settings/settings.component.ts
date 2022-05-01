import { Component } from '@angular/core';
import { GameService } from '../../game.service';
import { DeckstatsDeck } from '../../interfaces/deckstats/types';

@Component({
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  decklist: DeckstatsDeck[];
  id: string;

  constructor(private gameService: GameService) {
  }

  async loadDecks(id: string) {
    this.decklist = (await this.gameService.getDeckstatsDeckFromId(id)).folder.decks;
    console.log(this.decklist);
  }
}
