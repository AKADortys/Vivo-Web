import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { OrderService } from '../../../../services/order.service';
import { AlertHandler } from '../../../../services/alert-handler';

@Component({
  selector: 'app-client-cancel-order-btn',
  imports: [],
  templateUrl: './client-cancel-order-btn.html',
  styleUrl: './client-cancel-order-btn.scss',
})
export class ClientCancelOrderBtn {
  @Input() orderId!: string;
  @Input() displayMode!: boolean; // true for table (icon only?), false for card (full button?) - wait, previous buttons used displayMode but didn't seem to use it in ts logic, maybe for template?
  // Let's check previous buttons templates closer next time, but for now I'll include it.

  isLoading = signal<boolean>(false);
  @Output() editOrder = new EventEmitter<void>();

  constructor(
    private readonly orderService: OrderService,
    private readonly alertHandler: AlertHandler
  ) { }

  cancelOrder() {
    this.isLoading.set(true);
    this.alertHandler
      .showConfirm(
        'Voulez vous vraiment ANNULER cette commande ?',
        'Confirmation'
      )
      .then((valid) => {
        if (!valid) {
          this.isLoading.set(false);
          return;
        }
        this.orderService
          .updateOrder(this.orderId, { status: 'Annulée' })
          .subscribe({
            next: (res) => {
              this.alertHandler.showSuccess(
                res.message,
                `Commande ${this.orderId} annulée`
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
