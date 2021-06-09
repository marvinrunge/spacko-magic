import { Component } from '@angular/core';

@Component({
  selector: 'spacko-magic-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isActive = false;

  toggleMenu() {
    this.isActive = !this.isActive;
  }
}
