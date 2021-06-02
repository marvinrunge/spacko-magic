import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { RootStoreState } from './root-store';
import { addCardRequest, loadCardsRequest } from './root-store/card-store/actions';
import { CardService } from './services/card.service';
import { PlayerService } from './services/player.service';
import { addPlayerRequest, loadPlayersRequest, setSelectedPlayerId } from './root-store/player-store/actions';
import { selectPlayerId } from './root-store/player-store/state';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  public constructor(
    private http: HttpClient,
    private store$: Store<RootStoreState.State>,
    private cardService: CardService,
    private playerService: PlayerService
  ) {}

  initDeck(deckList: string, username: string) {
    this.cardService.resetDB(username).then(() => {
      const splitted = deckList.split('\n');
      splitted.forEach((entry) => {
        let count = 0;
        if (Number(entry[0] + entry[1])) {
          count = Number(entry[0] + entry[1]);
        } else if (Number(entry[0])) {
          count = Number(entry[0]);
        }
        if (count > 0) {
          const name = entry.slice(2);
          this.http
            .get('https://api.scryfall.com/cards/named?exact=' + name)
            .subscribe((card: any) => {
              console.log('add ' + String(card.name) + ' x' + count);
              for (let i = 1; i <= count; i++) {
                this.store$.dispatch(
                  addCardRequest({
                    card: {
                      _id: String(card.name) + i,
                      _deleted: false,
                      counter: 0,
                      marked: false,
                      position: 0,
                      tapped: false,
                      type: card.type_line,
                      place: 'deck',
                      attachedCards: [],
                      url: String(card.image_uris.normal),
                    },
                  })
                );
              }
            });
        }
      });
    });
  }

  initUser(username: string) {
    this.cardService.initDb(username);
    this.playerService.initDb(username);
    this.store$.dispatch(loadCardsRequest());
    this.store$.dispatch(loadPlayersRequest());
    this.store$.dispatch(addPlayerRequest({
      player: {
        _id: username,
        _deleted: false,
        name: username,
        activeDeck: "",
        life: 20,
        energy: 0,
        other: 0,
        poison: 0
      }
    }));
    this.store$.dispatch(setSelectedPlayerId({ selectedPlayerId: username }))
  }
}
