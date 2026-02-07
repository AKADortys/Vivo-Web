import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';
import { Register } from './components/pages/register/register';
import { Login } from './components/pages/login/login';
import { ConfirmAccount } from './components/pages/confirm-account/confirm-account';
import { DashboardClient } from './components/pages/dashboard-client/dashboard-client';
import { PassRecovery } from './components/pages/pass-recovery/pass-recovery';
import { OrderForm } from './components/pages/order-form/order-form';
import { Profile } from './components/pages/profile/profile';
import { ClientMenu } from './components/pages/client-menu/client-menu';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  { path: 'confirm-account/:token', component: ConfirmAccount },
  { path: 'dashboard', component: DashboardClient },
  { path: 'profile', component: Profile },
  { path: 'menu', component: ClientMenu },
  { path: 'pass-recovery/:token', component: PassRecovery },
];
