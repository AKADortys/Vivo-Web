import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../../services/auth';
import { AlertHandler } from '../../../../services/alert-handler';
import { AuthUserService } from '../../../../services/auth-user';
import { User } from '../../../../interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private alertHandler: AlertHandler,
    private AuthUService: AuthUserService,
    private router: Router
  ) {}

  form: FormGroup = new FormGroup({
    mail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  OnSubmit() {
    this.isLoading = true;
    if (this.form.valid) {
      const credentials = this.form.value;
      this.authService.Login(credentials).subscribe({
        next: (response) => {
          this.alertHandler.showSuccess(
            'Connexion réussie !',
            `Bienvenue ${response.data?.name} ${response.data?.lastName} !`
          );
          this.form.reset();
          this.AuthUService.setUser(response.data ?? null);
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Login failed:', error);
          this.alertHandler.showError(
            'Échec de la connexion',
            error.error.message ||
              'Une erreur est survenue lors de la connexion.'
          );
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    } else {
      this.alertHandler.showWarning(
        'Formulaire invalide',
        'Veuillez vérifier vos informations.'
      );
      this.isLoading = false;
    }
  }

  onReset() {
    this.form.reset();
  }
}
