import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { GraveyardComponent } from './components/graveyard/graveyard.component';
import { LaneComponent } from './components/lane/lane.component';
import { LibraryComponent } from './components/library/library.component';
import { PlayerStatsComponent } from './components/player-stats/player-stats.component';
import { CreaturesPipe } from './creatures.pipe';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { SinglePlayerComponent } from './pages/single-player/single-player.component';
import { LandsPipe } from './pipes/lands.pipe';
import { SpellsPipe } from './pipes/spells.pipe';
import { RootStoreModule } from './root-store';


const routes: Routes = [
  { path: 'settings', component: SettingsComponent },
  { path: 'single-player', component: SinglePlayerComponent },
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
    SpellsPipe,
    SettingsComponent,
    CardComponent,
    LaneComponent,
    LibraryComponent,
    GraveyardComponent,
    SinglePlayerComponent,
    PlayerStatsComponent,
    RegisterComponent,
    LoginComponent
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
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    RootStoreModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
