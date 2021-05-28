import { Injectable } from '@angular/core';
import { Observable, concat } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from } from 'rxjs';

import { CardService } from '../../services/card.service';

import * as cardActions from './actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Action } from '@ngrx/store';

@Injectable()
export class CardStoreEffects {
  constructor(private cardService: CardService, private actions$: Actions, private snackBar: MatSnackBar) {}

  addRequestEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(cardActions.addRequest),
      tap(action => from(this.cardService.add(action.card)))
    ), { dispatch: false }
  );

  updateRequestEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(cardActions.updateRequest),
      tap(action => from(this.cardService.update(action.card)))
    ), { dispatch: false }
  );

  deleteRequestEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cardActions.deleteRequest),
      tap(action => from(this.cardService.delete(action.card)))
    ), { dispatch: false }
  );

  loadRequestEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(cardActions.loadRequest),
      switchMap(() => concat(this.allCards$, this.changedCards$))
    )
  );

  allCards$ = this.cardService.getAll().pipe(
    map(cards => cardActions.loadSuccess({ cards })
  ));

  changedCards$: Observable<Action> = this.cardService.getChanges().pipe(
    map(card => {
      if (card._deleted) {
        return cardActions.deleteSuccess({ id: String(card._id) });
      } else {
        return cardActions.addUpdateSuccess({ card });
      }
    })
  );
}
