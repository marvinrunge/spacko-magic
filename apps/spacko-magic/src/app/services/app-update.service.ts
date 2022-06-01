import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root',
})
export class AppUpdateService {
  constructor(private readonly updates: SwUpdate) {
    this.updates.available.subscribe((event) => {
      this.showAppUpdateAlert();
    });
  }

  showAppUpdateAlert() {
    const message = 'App Update available: Choose Ok to update';
    if (confirm(message)) {
      this.doAppUpdate();
    };
  }

  doAppUpdate() {
    this.updates.activateUpdate().then(() => document.location.reload());
  }
}
