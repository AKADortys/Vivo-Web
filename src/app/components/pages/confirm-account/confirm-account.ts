import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth';
import { AlertHandler } from '../../../services/alert-handler';

@Component({
  selector: 'app-confirm-account',
  imports: [],
  templateUrl: './confirm-account.html',
  styleUrl: './confirm-account.scss',
})
export class ConfirmAccount implements OnInit {
  token = signal<string | null>('');
  constructor(
    private route: ActivatedRoute,
    private http: AuthService,
    private alertHandler: AlertHandler,
    private router: Router
  ) { }

  ngOnInit() {
    this.token.set(this.route.snapshot.paramMap.get('token'));
    this.CheckToken();
  }

  CheckToken() {
    if (this.token()) {
      this.http.confirmEmail(this.token()!).subscribe({
        next: async () => {
          await this.alertHandler.showSuccess(
            'Votre compte a été confirmé ! Vous allez être redirigé vers le formulaire de connexion',
            'Succès'
          );
          this.router.navigate(['/login']);
        },
        error: async (error) => {
          await this.alertHandler.showError(
            error.message,
            'Erreur'
          );
          this.router.navigate(['/login']);
        },
      });
    }
  }
}
