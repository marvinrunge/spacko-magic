import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import PouchDB from 'pouchdb-browser';
import PouchDBFind from 'pouchdb-find';
import { Store } from '@ngrx/store';
import { RootStoreState } from './root-store';
import { addRequest } from './root-store/card-store/actions';
import { CardService } from './services/card.service';
PouchDB.plugin(PouchDBFind);

@Injectable({
  providedIn: 'root',
})
export class GameService {
  public constructor(
    private http: HttpClient,
    private store$: Store<RootStoreState.State>,
    private cardService: CardService
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
                  addRequest({
                    card: {
                      _id: String(card.name) + i,
                      _deleted: false,
                      counter: 0,
                      marked: false,
                      tapped: false,
                      type: card.type_line,
                      place: 'deck',
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
  }
}
