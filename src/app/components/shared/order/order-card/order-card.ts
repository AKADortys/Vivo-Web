import { Component, EventEmitter, input, Output } from '@angular/core';
import { FormatDatePipe } from '../../../../pipes/format-date-pipe';
import { Order } from '../../../../interfaces/order';
import { ValidateOrderBtn } from '../validate-order-btn/validate-order-btn';
import { RefuseOrderBtn } from '../refuse-order-btn/refuse-order-btn';
import { ClientCancelOrderBtn } from '../client-cancel-order-btn/client-cancel-order-btn';

import { CurrencyPipe, NgClass } from '@angular/common';
import { AuthUserService } from '../../../../services/auth-user';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-card',
  imports: [
    FormatDatePipe,
    ValidateOrderBtn,
    RefuseOrderBtn,
    CurrencyPipe,
    ClientCancelOrderBtn,
    NgClass,
    RouterLink,
  ],
  templateUrl: './order-card.html',
  styleUrl: './order-card.scss',
})
export class OrderCard {
  constructor(readonly authUserService: AuthUserService) { }
  order = input.required<Order>();
  @Output() editOrder = new EventEmitter<Order>();
  @Output() removeOrder = new EventEmitter<void>();

  onEdit() {
    this.editOrder.emit(this.order());
  }

  onRemove() {
    this.removeOrder.emit();
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Confirmée':
        return 'text-bg-primary';
      case 'Accepté':
        return 'text-bg-success';
      case 'Refusée':
        return 'text-bg-danger';
      case 'Annulée':
        return 'text-bg-secondary';
      case 'Complétée':
        return 'text-bg-info';
      default:
        return 'text-bg-light';
    }
  }
}
