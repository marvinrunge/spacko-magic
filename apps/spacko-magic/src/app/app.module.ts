import 'hammerjs';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MAT_SNACK_BAR_DATA, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AddEnemyModalComponent } from './components/add-enemy-modal/add-enemy-modal.component';
import { CardComponent } from './components/card/card.component';
import { EnemyStatsComponent } from './components/enemy-stats/enemy-stats.component';
import { GraveyardComponent } from './components/graveyard/graveyard.component';
import { HeaderComponent } from './components/header/header.component';
import { LaneComponent } from './components/lane/lane.component';
import { LibraryComponent } from './components/library/library.component';
import { PlayerStatsComponent } from './components/player-stats/player-stats.component';
import { CreaturesPipe } from './creatures.pipe';
import { BattlefieldComponent } from './pages/battlefield/battlefield.component';
import { DeckComponent } from './pages/deck/deck.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DeckPreviewPipe } from './pipes/deck-preview.pipe';
import { LandsPipe } from './pipes/lands.pipe';
import { RootStoreModule } from './root-store';

export class CustomHammerConfig extends HammerGestureConfig {
  overrides = {
    tap: {
      enable: true,
    },
  };
}

const routes: Routes = [
  { path: 'deck', component: DeckComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'battlefield', component: BattlefieldComponent },
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
    SettingsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    HttpClientModule,
    RootStoreModule,
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
