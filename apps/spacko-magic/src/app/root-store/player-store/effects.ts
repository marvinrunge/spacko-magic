import { Injectable } from '@angular/core';
import { Observable, concat } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from } from 'rxjs';

import { PlayerService } from '../../services/player.service';

import * as playerActions from './actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Action } from '@ngrx/store';

@Injectable()
export class PlayerStoreEffects {
  constructor(private playerService: PlayerService, private actions$: Actions, private snackBar: MatSnackBar) {}

  addRequestEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(playerActions.addPlayerRequest),
      tap(action => from(this.playerService.add(action.player)))
    ), { dispatch: false }
  );

  updateRequestEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(playerActions.updatePlayerRequest),
      tap(action => from(this.playerService.update(action.player)))
    ), { dispatch: false }
  );

  deleteRequestEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(playerActions.deletePlayerRequest),
      tap(action => from(this.playerService.delete(action.player)))
    ), { dispatch: false }
  );

  loadRequestEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(playerActions.loadPlayersRequest),
      switchMap(() => concat(this.allPlayers$, this.changedPlayers$))
    )
  );

  allPlayers$ = this.playerService.getAll().pipe(
    map(players => playerActions.loadPlayersSuccess({ players })
  ));

  changedPlayers$: Observable<Action> = this.playerService.getChanges().pipe(
    map(player => {
      if (player._deleted) {
        return playerActions.deletePlayerSuccess({ id: String(player._id) });
      } else {
        return playerActions.addUpdatePlayerSuccess({ player });
      }
    })
  );
}
