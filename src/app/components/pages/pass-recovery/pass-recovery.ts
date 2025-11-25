import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AlertHandler } from '../../../services/alert-handler';

@Component({
  selector: 'app-pass-recovery',
  imports: [ReactiveFormsModule],
  templateUrl: './pass-recovery.html',
  styleUrl: './pass-recovery.scss',
})
export class PassRecovery implements OnInit {
  token = signal<string | null>('');
  passwordPattern = '^(?=.*[A-Z])(?=.*\\d).{8,}$';
  form!: FormGroup;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly http: AuthService,
    private readonly alert: AlertHandler,
    private router: Router
  ) {
    this.form = new FormGroup(
      {
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(this.passwordPattern),
        ]),
        cPassword: new FormControl('', [
          Validators.required,
          Validators.pattern(this.passwordPattern),
        ]),
      },
      { validators: this.passwordsMatch }
    );
  }

  ngOnInit(): void {
    this.token.set(this.route.snapshot.paramMap.get('token'));
  }

  passwordsMatch: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const cPassword = control.get('cPassword')?.value;
    return password === cPassword ? null : { passwordsMismatch: true };
  };

  onSubmit() {
    if (this.form.valid) {
      const { password } = this.form.value;
      this.http.PasswordChange(this.token(), password).subscribe({
        next: () => {
          this.alert.showSuccess('Mot de passe modifié !');
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.alert.showError(err.message || err.error.message);
          this.router.navigate(['/']);
        },
      });
    }
  }
}
