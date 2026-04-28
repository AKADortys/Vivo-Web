import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';
import { Register } from './components/pages/register/register';
import { Login } from './components/pages/login/login';
import { ConfirmAccount } from './components/pages/confirm-account/confirm-account';
import { DashboardClient } from './components/pages/dashboard-client/dashboard-client';
import { PassRecovery } from './components/pages/pass-recovery/pass-recovery';
import { Profile } from './components/pages/profile/profile';
import { ClientMenu } from './components/pages/client-menu/client-menu';
import { AboutComponent } from './components/pages/about/about.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { OrderSuccess } from './components/pages/order-success/order-success';
import { OrderDetailsComponent } from './components/pages/order-details/order-details';
import { OrderForm } from './components/pages/order-form/order-form';
import { ProjectFeaturesComponent } from './components/pages/project-features/project-features.component';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  { path: 'confirm-account/:token', component: ConfirmAccount },
  { path: 'dashboard', component: DashboardClient, canActivate: [authGuard, adminGuard] },
  { path: 'profile', component: Profile, canActivate: [authGuard] },
  { path: 'menu', component: ClientMenu },
  { path: 'about', component: AboutComponent },
  { path: 'pass-recovery/:token', component: PassRecovery },
  { path: 'order', component: OrderForm },
  { path: 'order-success', component: OrderSuccess },
  { path: 'order-details/:id', component: OrderDetailsComponent, canActivate: [authGuard, adminGuard] },
  { path: 'projet', component: ProjectFeaturesComponent, canActivate: [adminGuard] },
];
