import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth';
import { AlertHandler } from '../../../../services/alert-handler';
import { AuthUserService } from '../../../../services/auth-user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-button',
  imports: [],
  templateUrl: './logout-button.html',
  styleUrl: './logout-button.scss',
})
export class LogoutButton {
  constructor(
    private httpService: AuthService,
    private alertHandler: AlertHandler,
    private authUService: AuthUserService,
    private router: Router
  ) {}

  logout(): void {
    this.httpService.Logout().subscribe({
      next: () => {
        this.alertHandler.showSuccess('Déconnection réusie !', 'Succès !');
        this.authUService.logout();
        this.router.navigate(['/']);
      },
      error: (error) =>
        this.alertHandler.showError(
          error.error.message || error.message,
          'Erreur'
        ),
    });
  }
}
