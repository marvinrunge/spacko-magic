import 'hammerjs';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import {
  BrowserModule,
  HAMMER_GESTURE_CONFIG,
  HammerGestureConfig,
  HammerModule,
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AddEnemyModalComponent } from './components/add-enemy-modal/add-enemy-modal.component';
import { CardComponent } from './components/card/card.component';
import { DeckComponent } from './components/deck/deck.component';
import { EnemyStatsComponent } from './components/enemy-stats/enemy-stats.component';
import { GaleryComponent } from './components/galery/galery.component';
import { GraveyardComponent } from './components/graveyard/graveyard.component';
import { HeaderComponent } from './components/header/header.component';
import { LaneComponent } from './components/lane/lane.component';
import { LibraryComponent } from './components/library/library.component';
import { PlayerStatsComponent } from './components/player-stats/player-stats.component';
import { CreaturesPipe } from './creatures.pipe';
import { BattlefieldComponent } from './pages/battlefield/battlefield.component';
import { BattlefieldContainerComponent } from './pages/battlefield/container/container.component';
import { ActiveDeckComponent } from './pages/deck/deck.component';
import { DragfieldComponent } from './pages/dragfield/dragfield.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { DeckPreviewPipe } from './pipes/deck-preview.pipe';
import { LandsPipe } from './pipes/lands.pipe';
import { RootStoreModule } from './root-store';
import { SpellStackComponent } from './components/spell-stack/spell-stack.component';

@Injectable()
export class CustomHammerConfig extends HammerGestureConfig {
  overrides = {
    tap: {
      enable: true,
    },
  };
  options = {
    touchAction: 'pan-x',
  };
}

const routes: Routes = [
  { path: 'deck', component: ActiveDeckComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'battlefield', component: BattlefieldContainerComponent },
  { path: 'dragfield', component: DragfieldComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    LandsPipe,
    CreaturesPipe,
    DeckPreviewPipe,
    ActiveDeckComponent,
    DeckComponent,
    CardComponent,
    LaneComponent,
    LibraryComponent,
    GraveyardComponent,
    BattlefieldComponent,
    PlayerStatsComponent,
    EnemyStatsComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    AddEnemyModalComponent,
    SettingsComponent,
    DragfieldComponent,
    BattlefieldContainerComponent,
    GaleryComponent,
    SpellStackComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    MatExpansionModule,
    MatCheckboxModule,
    HttpClientModule,
    RootStoreModule,
    DragDropModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    MatDialogModule,
    FormsModule,
    HammerModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 4000 } },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: CustomHammerConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
