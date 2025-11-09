import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterForm } from './components/shared/register-form/register-form';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { LoginForm } from './components/shared/login-form/login-form';
import { UserCard } from './components/shared/user-card/user-card';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RegisterForm,
    NgbModule,
    CommonModule,
    LoginForm,
    UserCard,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'Vivo-Web';
}
