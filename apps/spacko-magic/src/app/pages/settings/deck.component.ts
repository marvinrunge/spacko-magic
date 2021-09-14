import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../../game.service';

@Component({
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit{
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
    this.router.navigate(["/battlefield"]);
  }
}
