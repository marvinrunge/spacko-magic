import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LandsPipe } from './pipes/lands.pipe';
import { CreaturesPipe } from './creatures.pipe';
import { SpellsPipe } from './pipes/spells.pipe';
import { RootStoreModule } from './root-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './pages/settings/settings.component';
import { CardComponent } from './components/card/card.component';
import { LaneComponent } from './components/lane/lane.component';
import { LibraryComponent } from './components/library/library.component';
import { GraveyardComponent } from './components/graveyard/graveyard.component';
import { SinglePlayerComponent } from './pages/single-player/single-player.component';
import { PlayerStatsComponent } from './components/player-stats/player-stats.component';

const routes: Routes = [
  { path: 'settings', component: SettingsComponent },
  { path: 'single-player', component: SinglePlayerComponent },
  { path: '',   redirectTo: '/settings', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    LandsPipe,
    CreaturesPipe,
    SpellsPipe,
    SettingsComponent,
    CardComponent,
    LaneComponent,
    LibraryComponent,
    GraveyardComponent,
    SinglePlayerComponent,
    PlayerStatsComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    HttpClientModule,
    RootStoreModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
