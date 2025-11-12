import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersList } from './components/shared/users-list/users-list';
import { ProductsList } from './components/shared/products-list/products-list';
import { LoginForm } from './components/shared/login-form/login-form';
import { RegisterForm } from './components/shared/register-form/register-form';
import { AddProduct } from './components/shared/add-product/add-product';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    UsersList,
    ProductsList,
    LoginForm,
    RegisterForm,
    AddProduct,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'Vivo-Web';
}
