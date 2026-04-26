import { Component, EventEmitter, input, Output } from '@angular/core';
import { FormatDatePipe } from '../../../../pipes/format-date-pipe';
import { Order } from '../../../../interfaces/order';
import { ValidateOrderBtn } from '../validate-order-btn/validate-order-btn';
import { RefuseOrderBtn } from '../refuse-order-btn/refuse-order-btn';
import { ClientCancelOrderBtn } from '../client-cancel-order-btn/client-cancel-order-btn';

import { CurrencyPipe, NgClass } from '@angular/common';
import { AuthUserService } from '../../../../services/auth-user';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../../../services/order.service';
import { AlertHandler } from '../../../../services/alert-handler';

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
  constructor(
    readonly authUserService: AuthUserService,
    private readonly orderService: OrderService,
    private readonly alertHandler: AlertHandler
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

  onResumePayment() {
    if (!this.order()._id) return;
    this.orderService.resumeCheckoutSession(this.order()._id as string).subscribe({
      next: (res) => {
        if (res.url) {
          window.location.href = res.url;
        } else if (res.data?.url) {
          window.location.href = res.data.url;
        }
      },
      error: (err) => {
        this.alertHandler.showError(err.message || 'Erreur lors de la reprise du paiement');
      }
    });
  }

  getFullAddress(): string {
    const address = this.order().deliveryAddress;
    if (!address) {
      return "En magasin (Aucune adresse)";
    }
    return `${address.street}, ${address.city}, ${address.zipCode}`;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Payée':
        return 'text-bg-primary';
      case 'En préparation':
        return 'text-bg-success';
      case 'Refusée':
        return 'text-bg-danger';
      case 'Annulée':
        return 'text-bg-secondary';
      case 'Terminée':
        return 'text-bg-info';
      default:
        return 'text-bg-light';
    }
  }
}
