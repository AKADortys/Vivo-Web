import { Component, EventEmitter, input, Output } from '@angular/core';
import { FormatDatePipe } from '../../../../pipes/format-date-pipe';
import { Order } from '../../../../interfaces/order';
import { RefuseOrderBtn } from '../refuse-order-btn/refuse-order-btn';
import { ValidateOrderBtn } from '../validate-order-btn/validate-order-btn';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'tr[app-order-table]',
  imports: [FormatDatePipe, RefuseOrderBtn, ValidateOrderBtn, CurrencyPipe],
  templateUrl: './order-table.html',
  styleUrl: './order-table.scss',
})
export class OrderTable {
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
