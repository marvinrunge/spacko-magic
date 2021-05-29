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
      ofType(cardActions.addCardRequest),
      tap(action => from(this.cardService.add(action.card)))
    ), { dispatch: false }
  );

  updateRequestEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(cardActions.updateCardRequest),
      tap(action => from(this.cardService.update(action.card)))
    ), { dispatch: false }
  );

  deleteRequestEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cardActions.deleteCardRequest),
      tap(action => from(this.cardService.delete(action.card)))
    ), { dispatch: false }
  );

  loadRequestEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(cardActions.loadCardsRequest),
      switchMap(() => concat(this.allCards$, this.changedCards$))
    )
  );

  allCards$ = this.cardService.getAll().pipe(
    map(cards => cardActions.loadCardsSuccess({ cards })
  ));

  changedCards$: Observable<Action> = this.cardService.getChanges().pipe(
    map(card => {
      if (card._deleted) {
        return cardActions.deleteCardSuccess({ id: String(card._id) });
      } else {
        return cardActions.addUpdateCardSuccess({ card });
      }
    })
  );
}
