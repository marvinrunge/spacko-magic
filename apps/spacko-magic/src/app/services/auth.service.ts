import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RootStoreState } from '../root-store';
import { Store } from '@ngrx/store';
import { CardService } from './card.service';
import { loadCardsRequest } from '../root-store/card-store/actions';
import { PlayerService } from './player.service';
import { loadPlayersRequest, setSelectedPlayerId, updatePlayerRequest } from '../root-store/player-store/actions';

export interface LoginData {
  name: string;
  password: string;
}

export class RegistrationData {
  constructor(loginData: LoginData) {
    this.name = loginData.name;
    this.password = loginData.password;
    this.roles = [];
    this.type = 'user';
  }

  name: string;
  password: string;
  roles: string[];
  type: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    public router: Router,
    private cardService: CardService,
    private playerService: PlayerService,
    private snackBar: MatSnackBar,
    private store$: Store<RootStoreState.State>
  ) {}

  checkSession(fromLogin?: boolean) {
    const username = localStorage.getItem('current-user');
    if (username) {
      this.playerService.initDb(username);
      this.cardService.initDb(username);
      this.cardService.getDb().getSession((err: any, response: any) => {
        if (err) {
          this.snackBar.open(err);
        } else if (!response.userCtx.name) {
          // nobody's logged in
        } else {
          this.store$.dispatch(loadCardsRequest());
          this.store$.dispatch(loadPlayersRequest());
          this.store$.dispatch(setSelectedPlayerId({ selectedPlayerId: username }));
          if (fromLogin) {
            this.router.navigate(['deck']);
          }
        }
      });
    }
  }

  public register(loginData: LoginData) {
    localStorage.setItem('current-user', loginData.name);
    this.playerService.initDb(loginData.name);
    this.cardService.initDb(loginData.name);
    this.playerService
      .getDb()
      .signUp(loginData.name, loginData.password, (err: any) => {
        if (err) {
          if (err.name === 'conflict') {
            this.snackBar.open(
              loginData.name + ' already exists, choose another username'
            );
          } else if (err.name === 'forbidden') {
            this.snackBar.open('Invalid user credentials');
          } else {
            this.snackBar.open('Ooops something went wrong...');
          }
        } else {
          this.login(loginData);
        }
      });
  }

  public login(loginData: LoginData) {
    localStorage.setItem('current-user', loginData.name);

    if (!this.playerService.getDb()) {
      this.playerService.initDb(loginData.name);
      this.cardService.initDb(loginData.name);
    }

    this.playerService
      .getDb()
      .logIn(loginData.name, loginData.password, (err: any) => {
        if (err) {
          if (err.name === 'unauthorized' || err.name === 'forbidden') {
            this.snackBar.open('Invalid user credentials');
          } else {
            this.snackBar.open('Ooops something went wrong...');
          }
        } else {
          this.checkSession(true);
        }
      });
  }

  public logOut() {
    this.playerService.getDb().logOut((err: any) => {
      if (err) {
        this.snackBar.open('You are offline');
      } else {
        this.cardService.reset();
        localStorage.removeItem('current-user');
        window.location.href = '/';
      }
    });
    this.cardService.getDb().logOut((err: any) => {
      if (err) {
        this.snackBar.open('You are offline');
      } else {
        this.cardService.reset();
        localStorage.removeItem('current-user');
        window.location.href = '/';
      }
    });
  }
}
