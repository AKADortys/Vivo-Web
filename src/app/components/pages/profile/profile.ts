import { Component, inject } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { AuthUserService } from '../../../services/auth-user';
import { OrderHistory } from '../../shared/order/order-history/order-history';

@Component({
  selector: 'app-profile',
  imports: [OrderHistory, AsyncPipe, JsonPipe],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  private authUserService = inject(AuthUserService);
  user$ = this.authUserService.user$;
}
