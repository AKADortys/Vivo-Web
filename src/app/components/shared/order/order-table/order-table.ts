import { Component, EventEmitter, input, Output } from '@angular/core';
import { FormatDatePipe } from '../../../../pipes/format-date-pipe';
import { Order } from '../../../../interfaces/order';
import { RefuseOrderBtn } from '../refuse-order-btn/refuse-order-btn';
import { ValidateOrderBtn } from '../validate-order-btn/validate-order-btn';
import { ClientCancelOrderBtn } from '../client-cancel-order-btn/client-cancel-order-btn';

import { CurrencyPipe } from '@angular/common';
import { AuthUserService } from '../../../../services/auth-user';
import { AlertHandler } from '../../../../services/alert-handler';
@Component({
  selector: 'tr[app-order-table]',
  imports: [
    FormatDatePipe,
    RefuseOrderBtn,
    ValidateOrderBtn,
    CurrencyPipe,
    ClientCancelOrderBtn,
  ],
  templateUrl: './order-table.html',
  styleUrl: './order-table.scss',
})
export class OrderTable {
  constructor(
    readonly authUserService: AuthUserService,
    private readonly alertService: AlertHandler,
  ) { }
  order = input.required<Order>();
  @Output() editOrder = new EventEmitter<Order>();
  @Output() removeOrder = new EventEmitter<void>();

  onEdit() {
    this.editOrder.emit(this.order());
  }

  onRemove() {
    this.removeOrder.emit();
  }
}
