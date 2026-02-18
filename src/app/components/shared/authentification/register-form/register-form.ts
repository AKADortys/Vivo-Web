import { Component, EventEmitter, Output, signal } from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { NewUser, ResponseUser } from '../../../../interfaces/user';
import { UserService } from '../../../../services/user';
import { CommonModule } from '@angular/common';
import { AlertHandler } from '../../../../services/alert-handler';
@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register-form.html',
  styleUrls: ['./register-form.scss'],
})
export class RegisterForm {
  userForm: FormGroup;
  isLoading = signal<boolean>(false);
  @Output() submited = new EventEmitter<boolean>(false);

  constructor(
    private userService: UserService,
    private alertHandler: AlertHandler
  ) {
    const passwordPattern = '^(?=.*[A-Z])(?=.*\\d).{8,}$';

    this.userForm = new FormGroup(
      {
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(passwordPattern),
        ]),
        cPassword: new FormControl('', [
          Validators.required,
          Validators.pattern(passwordPattern),
        ]),
        phone: new FormControl('', [
          Validators.required,
          Validators.pattern('^(?:(?:\\+33|0)[1-9])(?:[\\s.-]?\\d{2}){4}$'),
        ]),
        mail: new FormControl('', [Validators.required, Validators.email]),
      },
      { validators: this.passwordsMatch }
    );
  }

  passwordsMatch: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const cPassword = control.get('cPassword')?.value;
    return password === cPassword ? null : { passwordsMismatch: true };
  };

  onSubmit() {
    this.isLoading.set(true);
    if (!this.userForm.valid) return;

    const { name, lastName, mail, phone, password } = this.userForm.value;
    const newUser: NewUser = { name, lastName, mail, phone, password };

    this.userService.createUser(newUser).subscribe({
      next: (response: ResponseUser) => {
        this.alertHandler.showSuccess(
          'Inscription réussie !',
          `Bienvenue ${response.data?.name} ${response.data?.lastName} !`
        );
        this.userForm.reset();
        this.isLoading.set(false);
        this.submited.emit(true);
      },
      error: (error: any) => {
        this.alertHandler.showError(
          error.message,
          'Erreur'
        );
        this.isLoading.set(false);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }
}
