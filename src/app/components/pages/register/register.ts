import { Component } from '@angular/core';
import { RegisterForm } from '../../shared/authentification/register-form/register-form';

@Component({
  selector: 'app-register',
  imports: [RegisterForm],
  standalone: true,
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {}
