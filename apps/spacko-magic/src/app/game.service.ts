import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { delay, finalize } from 'rxjs/operators';
import { RootStoreState } from './root-store';
import { addCardRequest } from './root-store/card-store/actions';
import { loadEnemyCardsRequest } from './root-store/enemy-card-store/actions';
import { setSelectedEnemyPlayerId } from './root-store/player-store/actions';
import { CardService } from './services/card.service';
import { EnemyCardService } from './services/enemy-card.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  public constructor(
    private http: HttpClient,
    private store$: Store<RootStoreState.State>,
    private cardService: CardService,
    private enemyCardService: EnemyCardService,
    private snackBar: MatSnackBar
  ) {}

  loadingRequests: BehaviorSubject<number> = new BehaviorSubject<number>(-1);

  initDeck(deckList: string, username: string) {
    this.loadingRequests.next(0);
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
          this.loadingRequests.next(this.loadingRequests.getValue() + 1);
          const name = entry.slice(2);
          this.http
            .get('https://api.scryfall.com/cards/named?exact=' + name)
            .pipe(delay(50), finalize(() => this.loadingRequests.next(this.loadingRequests.getValue() - 1)))
            .subscribe(
              (card: any) => {
                for (let i = 1; i <= count; i++) {
                  this.store$.dispatch(
                    addCardRequest({
                      card: {
                        _id: String(card.name) + i,
                        _deleted: false,
                        counter: 0,
                        marked: false,
                        position: Math.random(),
                        tapped: false,
                        type: this.getType(card.type_line),
                        place: 'deck',
                        attachedCards: [],
                        url: String(card.image_uris.normal),
                        count: 1,
                        cmc: card.cmc,
                        scryfall_uri: card.scryfall_uri
                      },
                    })
                  );
                }
              },
              (error) => {
                console.log(error);
              }
            );
        }
      });
    });
  }

  addEnemy(username: string) {
    this.enemyCardService
      .initDb(username)
      .then((success) => {
        if (success) {
          localStorage.setItem('current-enemy', username);
          this.store$.dispatch(
            setSelectedEnemyPlayerId({ selectedPlayerId: username })
          );
          this.store$.dispatch(loadEnemyCardsRequest());
          this.snackBar.open(
            'Successfully added Enemy "' + username + '"',
            undefined,
            { duration: 4000 }
          );
        } else {
          this.snackBar.open('Enemy "' + username + '" not found', undefined, {
            duration: 4000,
          });
        }
      })
      .catch(() =>
        this.snackBar.open('Enemy "' + username + '" not found', undefined, {
          duration: 4000,
        })
      );
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
