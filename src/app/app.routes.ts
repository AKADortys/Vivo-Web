import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';
import { Register } from './components/pages/register/register';
import { Products } from './components/pages/products/products';
import { Login } from './components/pages/login/login';
import { ResetPassword } from './components/pages/reset-password/reset-password';
import { DashboardClient } from './components/pages/dashboard-client/dashboard-client';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'register', component: Register },
  { path: 'products', component: Products },
  { path: 'login', component: Login },
  { path: 'reset-password', component: ResetPassword },
  { path: 'dashboard', component: DashboardClient },
];
