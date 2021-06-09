import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { CardStoreEffects } from './effects';
import { cardreducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    MatSnackBarModule,
    StoreModule.forFeature('enemy-cards', cardreducer),
    EffectsModule.forFeature([CardStoreEffects])
  ],
  providers: [CardStoreEffects]
})
export class EnemyCardStoreModule { }
