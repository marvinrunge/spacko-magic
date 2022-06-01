import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { delay, finalize } from 'rxjs/operators';
import { PlayerSelectors, RootStoreState } from './root-store';
import { addCardRequest } from './root-store/card-store/actions';
import {
  loadEnemyCardsRequest,
  resetEnemyCardSuccess,
} from './root-store/enemy-card-store/actions';
import {
  setSelectedEnemyPlayerId,
  updatePlayerRequest,
} from './root-store/player-store/actions';
import { CardService } from './services/card.service';
import { EnemyCardService } from './services/enemy-card.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { DeckstatsResponse, DeckstatsDeck } from './interfaces/deckstats/types';
import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Player } from './interfaces/player';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  selectedPlayer: Player;

  public constructor(
    private http: HttpClient,
    public router: Router,
    private store$: Store<RootStoreState.State>,
    private cardService: CardService,
    private enemyCardService: EnemyCardService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.store$
      .pipe(select(PlayerSelectors.selectPlayerBySelectedId))
      .subscribe((player) => {
        this.selectedPlayer = player;
      });
  }

  loadingRequests: BehaviorSubject<number> = new BehaviorSubject<number>(-1);

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
            .pipe(delay(50))
            .subscribe(
              (card: any) => {
                for (let i = 1; i <= count; i++) {
                  this.store$.dispatch(
                    addCardRequest({
                      card: {
                        _id: String(card.name) + i,
                        _deleted: false,
                        _rev: '',
                        counter: 0,
                        marked: false,
                        position: Math.random(),
                        tapped: false,
                        type: this.getType(card.type_line),
                        place: 'deck',
                        attachedCards: [],
                        url: (card.card_faces?.length > 1 && !card.image_uris) ? card.card_faces[0].image_uris?.normal : String(card.image_uris?.normal),
                        count: 1,
                        cmc: card.cmc,
                        scryfall_uri: card.scryfall_uri,
                        cardFaces:
                          (card.card_faces?.length > 1 && !card.image_uris)
                            ? {
                                frontUrl: card.card_faces[0].image_uris?.normal,
                                backUrl: card.card_faces[1].image_uris?.normal,
                              }
                            : undefined,
                      },
                    })
                  );
                }
              },
              (error) => {
                this.snackBar.open(error?.error?.details, undefined, {
                  duration: 2500,
                });
              }
            );
        }
      });
    });
  }

  async loadDeckstatsDeck(deck: DeckstatsDeck) {
    const url = deck.url_neutral.replace('//deckstats.net/', environment.deckstats);
    const respone = await this.http
      .get<string>(
        `${url}?include_comments=1&do_not_include_printings=0&export_txt=1`,
        { responseType: 'text' as 'json' }
      )
      .toPromise();
    this.router.navigate(['deck']);
    const playerToUpdate = { ...this.selectedPlayer };
    playerToUpdate.activeDeck = {
      id: deck.saved_id,
      name: deck.name,
      cardList: respone
    };
    this.store$.dispatch(updatePlayerRequest({ player: playerToUpdate }));
    this.initDeck(respone, this.authService.username);
  }

  addEnemies(usernames: string[]) {
    if (usernames.length > 0) {
      localStorage.setItem('current-enemies', usernames.toString());
      this.changeEnemy(usernames[0]);
    }
  }

  changeEnemy(username: string) {
    this.enemyCardService.initDb(username).then((success) => {
      if (success) {
        this.store$.dispatch(
          setSelectedEnemyPlayerId({ selectedPlayerId: username })
        );
        this.store$.dispatch(resetEnemyCardSuccess());
        this.store$.dispatch(loadEnemyCardsRequest());
      }
    });
  }

  async getDeckstatsDecksFromId(id: string) {
    const decks: DeckstatsDeck[] = [];
    let response;
    let firstRequest = true;
    let page = 1;
    while (
      firstRequest ||
      (response &&
        response.folder.decks_current_page <
          response.folder.decks_total / response.folder.decks_per_page)
    ) {
      firstRequest = false;
      response = await this.http
        .get<DeckstatsResponse>(
          `${environment.deckstats}api.php?action=user_folder_get&result_type=folder%3Bdecks%3Bparent_tree%3Bsubfolders&owner_id=${id}&decks_page=${page}&folder_id=-1`
        )
        .toPromise();
      response.folder.decks.forEach((deck) => decks.push(deck));
      page++;
    }
    return decks;
  }

  getType(type: string): string {
    if (type.toLocaleLowerCase().includes('creature')) {
      return 'creature';
    } else if (type.toLocaleLowerCase().includes('land')) {
      return 'land';
    } else {
      return 'other';
    }
  }
}
