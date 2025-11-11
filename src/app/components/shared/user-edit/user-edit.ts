import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../services/user';
import { User } from '../../../interfaces/user';
import { AlertHandler } from '../../../services/alert-handler';

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
  isLoading: boolean = false;

  // Internal property to hold the user data
  private _user: User | null = null;

  // Setter for the @Input() 'user' to react to data changes from the parent
  @Input()
  set user(value: User | null) {
    this._user = value;
    // When the input changes AND the form is ready, update the form immediately
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

    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      password: new FormControl('', [Validators.pattern(passwordPattern)]),
      cPassword: new FormControl('', [Validators.pattern(passwordPattern)]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^(?:(?:\\+33|0)[1-9])(?:[\\s.-]?\\d{2}){4}$'),
      ]),
      mail: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  patchFormValues(user: User): void {
    this.userForm.patchValue({
      name: user.name,
      lastName: user.lastName,
      phone: user.phone,
      mail: user.mail,
    });
    this.userForm.get('password')?.setValue('');
    this.userForm.get('cPassword')?.setValue('');

    // Rerun form validation
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
    if (this.userForm.valid && this._user) {
      this.isLoading = true;

      const formValue = { ...this.userForm.value };

      delete formValue.cPassword;

      if (formValue.password === '') {
        delete formValue.password;
      }

      this.httpService.updateUser(this._user._id, formValue).subscribe({
        next: () => {
          this.alertHandler.showSuccess('User updated successfully', 'success');
          this.isLoading = false;
          this.save.emit(true);
        },
        error: (error) => {
          this.alertHandler.showError(
            'Error updating user',
            error.error.message || 'Unknown error'
          );
          this.isLoading = false;
        },
      });
    }
  }
}
