import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderService } from '../../../../services/order.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-order-badge',
  standalone: true,
  imports: [AsyncPipe, RouterLink, RouterLinkActive],
  templateUrl: './order-badge.html',
  styleUrl: './order-badge.scss',
})
export class OrderBadge {
  newOrdersCount$: Observable<number>;

  constructor(private orderService: OrderService) {
    this.newOrdersCount$ = this.orderService.newOrdersCount$;
  }
}
