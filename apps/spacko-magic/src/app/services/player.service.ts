import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import PouchDBAuthentication from 'pouchdb-authentication';
import { Observable } from 'rxjs';
import { Player } from '../interfaces/player';

PouchDB.plugin(PouchDBAuthentication);

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private localPlayerDb: any;
  private remotePlayerDb: any;

  initDb(username: string) {
    const dbPrefix = username.toLocaleLowerCase();
    this.localPlayerDb = new PouchDB(dbPrefix + '_players', {
      auto_compaction: true,
    });
    this.remotePlayerDb = new PouchDB('http://18.192.3.168:5984/players', { skip_setup: true });
    this.localPlayerDb.sync(this.remotePlayerDb, {live: true, retry: true});
  }

  resetDB(username: string): Promise<any> {
    return this.localPlayerDb.allDocs().then((result: any) => {
      return Promise.all(
        result.rows.map((row: any) => {
          return this.localPlayerDb.remove(row.id, row.value.rev);
        })
      );
    });
  }

  addUpdateMultipleDocs(players: Player[]) {
    return this.localPlayerDb.bulkDocs(players);
  }

  add(player: Player): Promise<any> {
    return this.localPlayerDb.put(player);
  }

  update(player: Player): Promise<any> {
    return this.localPlayerDb.put(player);
  }

  delete(player: Player): Promise<any> {
    return this.localPlayerDb.remove(player);
  }

  getAll(): Observable<any> {
    return new Observable((observer) => {
      this.localPlayerDb.allDocs({ include_docs: true }).then((docs: any) => {
        const players = docs.rows.map((element: any) => element.doc);
        observer.next(players);
        observer.complete();
      });
    });
  }

  getChanges(): Observable<Player> {
    return new Observable((observer) => {
      this.localPlayerDb
        .changes({ live: true, since: 'now', include_docs: true })
        .on('change', (change: any) => {
          observer.next(change.doc);
        });
    });
  }

  getDb() {
    return this.remotePlayerDb;
  }

  reset() {
    this.remotePlayerDb = undefined;
    this.localPlayerDb = undefined;
  }
}
