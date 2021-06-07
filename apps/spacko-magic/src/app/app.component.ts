import { Component, OnInit } from '@angular/core';
import { GameService } from './game.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'spacko-magic-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private game: GameService) {}

  ngOnInit() {
    this.authService.checkSession();
  }
}
