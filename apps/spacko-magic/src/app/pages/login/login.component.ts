import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'spacko-magic-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string;
  password: string;

  constructor(
    public router: Router,
    public http: HttpClient,
    public authService: AuthService
  ) {}

  login() {
    this.authService.login({ name: this.username, password: this.password });
  }

  launchRegister() {
    this.router.navigate(['register']);
  }
}
