import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { concat, from, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { EnemyCardService } from '../../services/enemy-card.service';
import * as cardActions from './actions';

@Injectable()
export class CardStoreEffects {
  constructor(
    private enemyCardService: EnemyCardService,
    private actions$: Actions
  ) {}

  addRequestEffect$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(cardActions.addEnemyCardRequest),
        tap((action) => from(this.enemyCardService.add(action.card)))
      ),
    { dispatch: false }
  );

  updateRequestEffect$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(cardActions.updateEnemyCardRequest),
        tap((action) => from(this.enemyCardService.update(action.card)))
      ),
    { dispatch: false }
  );

  updateManyRequestEffect$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(cardActions.updateManyEnemyCardsRequest),
        tap((action) =>
          from(this.enemyCardService.addUpdateMultipleDocs(action.cards))
        )
      ),
    { dispatch: false }
  );

  deleteRequestEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(cardActions.deleteEnemyCardRequest),
        tap((action) => from(this.enemyCardService.delete(action.card)))
      ),
    { dispatch: false }
  );

  loadRequestEffect$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(cardActions.loadEnemyCardsRequest),
      switchMap(() => concat(this.allCards$, this.changedCards$))
    )
  );

  allCards$ = this.enemyCardService
    .getAll()
    .pipe(map((cards) => cardActions.loadEnemyCardsSuccess({ cards })));

  changedCards$: Observable<Action> = this.enemyCardService.getChanges().pipe(
    map((card) => {
      if (card._deleted) {
        return cardActions.deleteEnemyCardSuccess({ id: String(card._id) });
      } else {
        return cardActions.addUpdateEnemyCardSuccess({ card });
      }
    })
  );
}
