import { Component, Input, signal, EventEmitter, Output } from '@angular/core';
import { OrderService } from '../../../../services/order.service';
import { AlertHandler } from '../../../../services/alert-handler';

@Component({
  selector: 'app-validate-order-btn',
  imports: [],
  templateUrl: './validate-order-btn.html',
  styleUrl: './validate-order-btn.scss',
})
export class ValidateOrderBtn {
  @Input() orderId!: string;
  @Input() displayMode!: boolean;
  isLoading = signal<boolean>(false);
  @Output() editOrder = new EventEmitter<void>();

  constructor(
    private readonly orderService: OrderService,
    private readonly alertHandler: AlertHandler
  ) { }

  validateOrder() {
    this.isLoading.set(true);
    this.alertHandler
      .showConfirm(
        'Voulez vous vraiment VALIDER cette commande ?',
        'Confirmation'
      )
      .then((valid) => {
        if (!valid) {
          this.isLoading.set(false);
          return;
        }
        this.orderService
          .updateOrder(this.orderId, { status: 'En préparation' })
          .subscribe({
            next: (res) => {
              this.alertHandler.showSuccess(
                res.message,
                `Commande ${this.orderId} validée`
              );
              this.editOrder.emit();
            },
            error: (error) => {
              console.error(error.message);
              this.alertHandler.showError(error.message, 'Erreur');
            },
          });
      });
    this.isLoading.set(false);
  }
}
