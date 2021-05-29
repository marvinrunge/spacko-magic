import { Component, OnInit } from '@angular/core';
import { GameService } from './game.service';

@Component({
  selector: 'spacko-magic-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private game: GameService) {}

  ngOnInit() {
    const username = localStorage.getItem('current-user');
    if (username) {
      this.game.initUser(username);
    }
  }
}
