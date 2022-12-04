import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';
import { AppUpdateService } from '../../services/app-update.service';
@Component({
  selector: 'spacko-magic-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() isActive = false;
  version = environment.version;

  constructor(private authService: AuthService, private updateService: AppUpdateService) {}

  toggleMenu() {
    this.isActive = !this.isActive;
  }

  onLogout() {
    this.authService.logOut();
  }

  checkForUpdates() {
    this.updateService.isNewVersionAvailable();
  }
}
