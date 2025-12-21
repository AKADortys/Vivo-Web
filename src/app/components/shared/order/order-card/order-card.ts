import { Component, EventEmitter, input, Output } from '@angular/core';
import { FormatDatePipe } from '../../../../pipes/format-date-pipe';
import { Order } from '../../../../interfaces/order';
import { ValidateOrderBtn } from '../validate-order-btn/validate-order-btn';
import { RefuseOrderBtn } from '../refuse-order-btn/refuse-order-btn';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-order-card',
  imports: [FormatDatePipe, ValidateOrderBtn, RefuseOrderBtn, CurrencyPipe],
  templateUrl: './order-card.html',
  styleUrl: './order-card.scss',
})
export class OrderCard {
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
