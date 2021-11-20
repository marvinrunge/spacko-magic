import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'spacko-magic-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() isActive = true;

  constructor(private authService: AuthService) {}

  toggleMenu() {
    this.isActive = !this.isActive;
  }

  onLogout() {
    this.authService.logOut();
  }
}
