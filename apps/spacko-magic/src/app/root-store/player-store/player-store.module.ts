import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { PlayerStoreEffects } from './effects';
import { playerreducer } from './reducer';

@NgModule({
  imports: [
    CommonModule,
    MatSnackBarModule,
    StoreModule.forFeature('players', playerreducer),
    EffectsModule.forFeature([PlayerStoreEffects])
  ],
  providers: [PlayerStoreEffects]
})
export class PlayerStoreModule { }
