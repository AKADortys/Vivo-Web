import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';
import { Register } from './components/pages/register/register';
import { Products } from './components/pages/products/products';
import { Login } from './components/pages/login/login';
import { ConfirmAccount } from './components/pages/confirm-account/confirm-account';
import { DashboardClient } from './components/pages/dashboard-client/dashboard-client';
import { PassRecovery } from './components/pages/pass-recovery/pass-recovery';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'register', component: Register },
  { path: 'products', component: Products },
  { path: 'login', component: Login },
  { path: 'confirm-account/:token', component: ConfirmAccount },
  { path: 'dashboard', component: DashboardClient },
  { path: 'pass-recovery/:token', component: PassRecovery },
  { path: 'cart', component: Products }, // Temporary until cart page is created
];
