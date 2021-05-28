import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GameService } from './game.service';
import { RootStoreState } from './root-store';
import { loadRequest } from './root-store/card-store/actions';

@Component({
  selector: 'spacko-magic-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor(private game: GameService,
    private store$: Store<RootStoreState.State>) {

  }

  ngOnInit() {
    const username = localStorage.getItem('current-user');
    if (username) {
      this.game.initUser(username);
      this.store$.dispatch(loadRequest());
    }
  }
}
