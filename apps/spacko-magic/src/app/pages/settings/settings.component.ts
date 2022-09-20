import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { GameService } from '../../game.service';
import { DeckstatsDeck } from '../../interfaces/deckstats/types';
import { Player } from '../../interfaces/player';
import { PlayerSelectors, RootStoreState } from '../../root-store';
import { updatePlayerRequest } from '../../root-store/player-store/actions';

@Component({
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent {
  id: string;
  selectedPlayer: Player;
  panelOpenState = false;
  isLoading = false;

  constructor(
    private store$: Store<RootStoreState.State>,
    private gameService: GameService
  ) {
    this.store$
      .pipe(select(PlayerSelectors.selectPlayerBySelectedId))
      .subscribe((player) => {
        this.selectedPlayer = player;
        this.id = this.selectedPlayer?.deckstatsUserId;
      });
  }

  loadDeck(deck: DeckstatsDeck) {
    this.gameService.loadDeckstatsDeck(deck);
  }

  async addDeckstatsUserId(id: string) {
    this.isLoading = true;
    const playerToUpdate = { ...this.selectedPlayer };
    playerToUpdate.deckstatsUserId = id;
    playerToUpdate.decks = await this.gameService.getDeckstatsDecksFromId(
      this.id
    );
    this.updatePlayer(playerToUpdate);
    this.isLoading = false;
  }

  updatePlayer(player: Player) {
    this.store$.dispatch(updatePlayerRequest({ player }));
  }
}
