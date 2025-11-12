import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthUserService } from './services/auth-user';
import { User } from './interfaces/user';
import { LogoutButton } from './components/shared/logout-button/logout-button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, LogoutButton],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'Vivo-Web';
  user!: User | null;
  constructor(private authService: AuthUserService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => (this.user = user));
  }
}
