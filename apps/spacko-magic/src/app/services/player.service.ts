import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import PouchDB from 'pouchdb';
import { Observable } from 'rxjs';
import { Player } from '../interfaces/player';
import { RootStoreState } from '../root-store';
import { loadPlayersRequest } from '../root-store/player-store/actions';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private localPlayerDb: any;
  private remotePlayerDb: any;

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
    this.localPlayerDb = new PouchDB(username + '_players', {
      auto_compaction: true,
    });
  }

  resetDB(username: string): Promise<any> {
    return this.localPlayerDb.allDocs().then((result: any) => {
      // Promise isn't supported by all browsers; you may want to use bluebird
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
        console.log(docs);
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
