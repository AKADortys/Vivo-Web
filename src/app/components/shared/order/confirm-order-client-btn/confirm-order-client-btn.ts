import { Component } from '@angular/core';
import { OrderService } from '../../../../services/order.service';
import { AlertHandler } from '../../../../services/alert-handler';

@Component({
  selector: 'app-confirm-order-client-btn',
  imports: [],
  templateUrl: './confirm-order-client-btn.html',
  styleUrl: './confirm-order-client-btn.scss',
})
export class ConfirmOrderClientBtn {
  constructor(
    private readonly orderService: OrderService,
    private alertService: AlertHandler
  ) {}

  createOrder(): void {
    this.orderService.createOrderFromCart().subscribe({
      next: (response) => {
        this.alertService.showSuccess(response.message, 'Succès !');
      },
      error: (error) => {
        this.alertService.showError(error.message, 'Erreur !');
      },
    });
  }
}
