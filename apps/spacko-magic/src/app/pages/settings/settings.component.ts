import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../../game.service';

@Component({
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit{
  username = '';
  deckList = '';
  userIsReady = false;

  ngOnInit() {
    const username = localStorage.getItem('current-user');
    if (username) {
      this.username = username;
      this.userIsReady = true;
    }
  }

  constructor(
    private game: GameService,
    private router: Router
  ) {}

  addUser() {
    this.game.initUser(this.username);
    if (this.username) {
      this.userIsReady = true;
    }
    localStorage.setItem('current-user', this.username);
  }

  initDeck() {
    this.game.initDeck(this.deckList, this.username);
    this.router.navigate(["/single-player"]);
  }

}
