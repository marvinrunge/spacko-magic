import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import PouchDBAuthentication from 'pouchdb-authentication';
import PouchDB from 'pouchdb';
import { Card } from '../interfaces/card';
import { environment } from '../../environments/environment';

PouchDB.plugin(PouchDBAuthentication);

@Injectable({
  providedIn: 'root',
})
export class EnemyCardService {
  private localCardDb: any;
  private remoteCardDb: any;

  initDb(username: string): Promise<boolean> {
    const dbPrefix = username.toLocaleLowerCase();
    const newRemoteCardDb = this.createRemoteDb(dbPrefix);
    return newRemoteCardDb.info().then(response => {
      if (!response.error) {
        this.localCardDb = new PouchDB(dbPrefix + '_cards', {
          auto_compaction: true,
        });
        this.remoteCardDb = newRemoteCard;
        this.localCardDb.sync(this.remoteCardDb, {live: true, retry: true});
        return Promise.resolve(true);
      } else {
        newRemoteCardDb.close();
        return Promise.resolve(false);
      }
    }).catch(() => {
      newRemoteCardDb.close();
      return Promise.reject(false);
    });
  }

  resetDB(username: string): Promise<any> {
    return this.localCardDb.allDocs().then((result: any) => {
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
        const cards = docs.rows.map((element: any) => element.doc);
        observer.next(cards);
        observer.complete();
      });
    });
  }

  createRemoteDb(username: string): Promise<any> {
    return new PouchDB(environment.db + username + '_cards', {skip_setup: true});
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
