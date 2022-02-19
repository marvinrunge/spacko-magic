import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { BattlefieldComponent } from './battlefield/battlefield.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {
    path: "battlefield",
    component: BattlefieldComponent
  },
  {
    path: "",
    component: AuthComponent
  }
]

@NgModule({
  declarations: [AppComponent, BattlefieldComponent, AuthComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
