import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import PouchDBAuthentication from 'pouchdb-authentication';
import PouchDB from 'pouchdb';
import { Card } from '../interfaces/card';
import { loadCardsRequest } from '../root-store/card-store/actions';
import { Store } from '@ngrx/store';
import { RootStoreState } from '../root-store';

//PouchDB.plugin(PouchDBAuthentication);

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private localCardDb: any;
  private remoteCardDb: any;

  constructor(private store$: Store<RootStoreState.State>) {}

  ascii_to_hexa(str: string) {
    const arr1 = [];
    for (let n = 0, l = str.length; n < l; n++) {
      const hex = Number(str.charCodeAt(n)).toString(16);
      arr1.push(hex);
    }
    return arr1.join('');
  }

  initDb(username: string) {
    this.localCardDb = new PouchDB(username + '_cards', {
      auto_compaction: true,
    });
  }

  resetDB(username: string): Promise<any> {
    return this.localCardDb.allDocs().then((result: any) => {
      // Promise isn't supported by all browsers; you may want to use bluebird
      return Promise.all(
        result.rows.map((row: any) => {
          return this.localCardDb.remove(row.id, row.value.rev);
        })
      );
    });
  }

  addUpdateMultipleDocs(cards: Card[]) {
    return this.localCardDb.bulkDocs(cards);
  }

  add(card: Card): Promise<any> {
    return this.localCardDb.put(card);
  }

  update(card: Card): Promise<any> {
    return this.localCardDb.put(card);
  }

  delete(card: Card): Promise<any> {
    return this.localCardDb.remove(card);
  }

  getAll(): Observable<any> {
    return new Observable((observer) => {
      this.localCardDb.allDocs({ include_docs: true }).then((docs: any) => {
        console.log(docs);
        const cards = docs.rows.map((element: any) => element.doc);
        observer.next(cards);
        observer.complete();
      });
    });
  }

  getChanges(): Observable<Card> {
    return new Observable((observer) => {
      this.localCardDb
        .changes({ live: true, since: 'now', include_docs: true })
        .on('change', (change: any) => {
          observer.next(change.doc);
        });
    });
  }

  getDb() {
    return this.remoteCardDb;
  }

  reset() {
    this.remoteCardDb = undefined;
    this.localCardDb = undefined;
  }
}
