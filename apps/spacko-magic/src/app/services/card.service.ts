import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import PouchDBAuthentication from 'pouchdb-authentication';
import PouchDB from 'pouchdb';
import { Card } from '../interfaces/card';

PouchDB.plugin(PouchDBAuthentication);

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private localCardDb: any;
  private remoteCardDb: any;

  initDb(username: string) {
    const dbPrefix = username.toLocaleLowerCase();
    this.localCardDb = new PouchDB(dbPrefix + '_cards', {
      auto_compaction: true,
    });
    this.remoteCardDb = new PouchDB('http://18.192.3.168:5984/' + dbPrefix + '_cards', { skip_setup: true });
    this.localCardDb.sync(this.remoteCardDb, {live: true, retry: true});
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
