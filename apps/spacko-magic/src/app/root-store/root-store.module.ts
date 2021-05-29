
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CardStoreModule } from './card-store';
import { PlayerStoreModule } from './player-store';

@NgModule({
  imports: [
    CommonModule,
    CardStoreModule,
    PlayerStoreModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([])
  ],
  declarations: []
})
export class RootStoreModule {}
