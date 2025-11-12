import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth';
import { AlertHandler } from '../../../services/alert-handler';

@Component({
  selector: 'app-logout-button',
  imports: [],
  templateUrl: './logout-button.html',
  styleUrl: './logout-button.scss',
})
export class LogoutButton {
  constructor(
    private httpService: AuthService,
    private alertHandler: AlertHandler
  ) {}

  logout(): void {
    this.httpService.Logout().subscribe({
      next: () =>
        this.alertHandler.showSuccess('Déconnection réusie !', 'Succès !'),
      error: (error) =>
        this.alertHandler.showError(
          error.error.message || error.message,
          'Erreur'
        ),
    });
  }
}
