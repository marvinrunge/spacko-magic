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
  enemyUsername = '';
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

  initDeck() {
    this.game.initDeck(this.deckList, this.username);
    this.router.navigate(["/single-player"]);
  }

  addEnemy() {
    this.game.addEnemy(this.enemyUsername);
  }
}
