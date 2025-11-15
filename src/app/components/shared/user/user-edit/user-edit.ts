import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../../services/user';
import { User } from '../../../../interfaces/user';
import { AlertHandler } from '../../../../services/alert-handler';

@Component({
  selector: 'app-user-edit',
  imports: [ReactiveFormsModule],
  standalone: true, // Assuming standalone is used
  templateUrl: './user-edit.html',
  styleUrl: './user-edit.scss',
})
export class UserEdit implements OnInit {
  @Output() save = new EventEmitter<boolean>();
  userForm!: FormGroup;
  isLoading = signal<boolean>(false);

  private _user: User | null = null;

  @Input()
  set user(value: User | null) {
    this._user = value;
    if (value && this.userForm) {
      this.patchFormValues(value);
    }
  }

  get user(): User | null {
    return this._user;
  }

  constructor(
    private httpService: UserService,
    private alertHandler: AlertHandler
  ) {
    this.initializeForm();
  }

  ngOnInit() {
    if (this._user) {
      this.patchFormValues(this._user);
    }
  }

  initializeForm(): void {
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
        password: new FormControl('', [Validators.pattern(passwordPattern)]),
        cPassword: new FormControl('', [Validators.pattern(passwordPattern)]),
        phone: new FormControl('', [
          Validators.required,
          Validators.pattern('^(?:(?:\\+33|0)[67]\\d{8}|(?:\\+32|0)4\\d{8})$'),
        ]),
        mail: new FormControl('', [Validators.required, Validators.email]),
        isActive: new FormControl(),
      },
      { validators: this.passwordsMatch }
    );
  }

  patchFormValues(user: User): void {
    this.userForm.patchValue({
      name: user.name,
      lastName: user.lastName,
      phone: user.phone,
      mail: user.mail,
      isActive: user.isActive,
    });
    this.userForm.get('password')?.setValue('');
    this.userForm.get('cPassword')?.setValue('');

    this.userForm.updateValueAndValidity();
  }

  passwordsMatch: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const cPassword = control.get('cPassword')?.value;

    if (!password && !cPassword) {
      return null;
    }

    return password === cPassword ? null : { passwordsMismatch: true };
  };

  onSubmit() {
    if (this.userForm.valid && this._user!._id) {
      this.isLoading.set(true);

      const formValue: any = { ...this.userForm.value };

      delete formValue.cPassword;

      (Object.keys(formValue) as (keyof User)[]).forEach((key) => {
        if (formValue[key] === '' || formValue[key] === this.user![key]) {
          delete formValue[key];
        }
      });

      if (Object.keys(formValue).length < 1) {
        this.isLoading.set(false);
        return this.alertHandler.showInfo(
          'Fournissez au moins une modification'
        );
      }
      this.alertHandler
        .showConfirm('Confirmer les modification ?')
        .then((confirm) => {
          if (confirm) {
            this.httpService.updateUser(this._user!._id, formValue).subscribe({
              next: () => {
                this.alertHandler.showSuccess(
                  'User updated successfully',
                  'success'
                );
                this.isLoading.set(false);
                this.save.emit(true);
              },
              error: (error) => {
                this.alertHandler.showError(
                  'Error updating user',
                  error.error.message || 'Unknown error'
                );
                this.isLoading.set(false);
              },
            });
          } else {
            this.isLoading.set(false);
            return;
          }
        });
    }
  }
}
