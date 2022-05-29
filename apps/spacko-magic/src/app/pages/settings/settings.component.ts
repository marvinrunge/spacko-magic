import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { GameService } from '../../game.service';
import { Player } from '../../interfaces/player';
import { PlayerSelectors, RootStoreState } from '../../root-store';
import { updatePlayerRequest } from '../../root-store/player-store/actions';

@Component({
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  id: string;
  selectedPlayer: Player;
  panelOpenState = false;

  constructor(
    private store$: Store<RootStoreState.State>,
    private gameService: GameService) {
      this.store$
        .pipe(select(PlayerSelectors.selectPlayerBySelectedId))
        .subscribe((player) => {
          this.selectedPlayer = player;
          this.id = this.selectedPlayer?.deckstatsUserId;
        });
  }

  loadDeck(url:string) {
    this.gameService.loadDeckstatsDeck(url);
  }

  async addDeckstatsUserId(id: string) {
    const playerToUpdate = { ...this.selectedPlayer };
    playerToUpdate.deckstatsUserId = id;
    playerToUpdate.decks = (await this.gameService.getDeckstatsDecksFromId(this.id));
    this.updatePlayer(playerToUpdate);
  }

  updatePlayer(player: Player) {
    this.store$.dispatch(updatePlayerRequest({ player }));
  }
}
