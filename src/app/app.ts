import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterForm } from './components/shared/register-form/register-form';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RegisterForm, NgbModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'Vivo-Web';
}
