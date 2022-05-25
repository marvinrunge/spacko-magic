import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { GameService } from '../../game.service';
import { DeckstatsDeck } from '../../interfaces/deckstats/types';
import { Player } from '../../interfaces/player';
import { PlayerSelectors, RootStoreState } from '../../root-store';
import { updatePlayerRequest } from '../../root-store/player-store/actions';
import { PlayerService } from '../../services/player.service';

@Component({
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  decklist: DeckstatsDeck[];
  id: string;

  constructor(private gameService: GameService,
    private playerService: PlayerService) {
  }

  async loadDecks(id: string) {
    this.decklist = (await this.gameService.getDeckstatsDeckFromId(id)).folder.decks;
    console.log(this.decklist);
  }

  addDeckstatsUserId(id: string) {
    return;
  }
}
