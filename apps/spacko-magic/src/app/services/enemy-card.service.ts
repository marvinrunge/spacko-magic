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
  private localCardDb: PouchDB.Database;
  private remoteCardDb: PouchDB.Database;
  private sync: PouchDB.Replication.Sync<any>;

  initDb(username: string): Promise<boolean> {
    if (this.sync) {
      this.sync.cancel();
    }
    if (this.localCardDb) {
      this.localCardDb.close();
    }
    if (this.remoteCardDb) {
      this.remoteCardDb.close();
    }
    const dbPrefix = username.toLowerCase();
    this.localCardDb = new PouchDB(dbPrefix + '_cards', {
      auto_compaction: true
    });
    this.remoteCardDb = new PouchDB(environment.db + dbPrefix + '_cards', {
      skip_setup: true,
    });

    this.sync = this.localCardDb.sync(this.remoteCardDb, {
      live: true,
      retry: true,
    });
    return Promise.resolve(true);
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

  createRemoteDb(username: string): PouchDB.Database {
    return new PouchDB(environment.db + username + '_cards', {
      skip_setup: true,
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
    this.remoteCardDb.close();
    this.localCardDb.close();
  }
}
