import { Component } from '@angular/core';
import { OrderHistory } from '../../shared/order/order-history/order-history';

@Component({
  selector: 'app-profile',
  imports: [OrderHistory],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {}
