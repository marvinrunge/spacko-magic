import { Component, OnInit } from '@angular/core';
import { AppUpdateService } from './services/app-update.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'spacko-magic-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private updateService: AppUpdateService) {}

  ngOnInit() {
    this.authService.checkSession();
    // this.updateService.checkVersion();
    // this.setBackgroundPosition();
  }

  async setBackgroundPosition() {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    document.body.style.backgroundPosition = x + "% " + y + "%";
    setTimeout(() => this.setBackgroundPosition(), 20000);
  }
}
