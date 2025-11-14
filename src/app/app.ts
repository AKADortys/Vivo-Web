import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthUserService } from './services/auth-user';
import { User } from './interfaces/user';
import { LogoutButton } from './components/shared/authentification/logout-button/logout-button';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    LogoutButton,
    AsyncPipe,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'Vivo-Web';
  public user$;
  constructor(private authService: AuthUserService) {
    authService = new AuthUserService();
    this.user$ = this.authService.user$;
  }
}
