import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import PouchDB from 'pouchdb';
import { Version } from '../interfaces/version';

@Injectable({
  providedIn: 'root',
})
export class AppUpdateService {
  private remoteVersionDb: PouchDB.Database;
  newVersion: string;

  checkVersion() {
    this.initDb();
    this.remoteVersionDb.get<Version>("version").then(result => {
      this.newVersion = result.version;
      if (result.version && result.version !== environment.version) {
        this.showAppUpdateAlert();
      }
    });
  }

  isNewVersionAvailable() {
    this.remoteVersionDb.get<Version>("version").then(result => {
      this.newVersion = result.version;
      if (result.version && result.version !== environment.version) {
        this.showAppUpdateAlert();
      } else {
        this.showNoUpdateAlert();
      }
    });
  }

  initDb() {
    this.remoteVersionDb = new PouchDB(environment.db + 'version', {
      skip_setup: true,
    })
  }

  showAppUpdateAlert() {
    const message = 'Spacko Magic version ' + this.newVersion + ' is available! Choose Ok to update.';
    if (confirm(message)) {
      document.location.reload();
    };
  }

  showNoUpdateAlert() {
    confirm("No updates available.");
  }
}
