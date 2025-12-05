import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { OrderService } from '../../../../services/order.service';
import { AlertHandler } from '../../../../services/alert-handler';
@Component({
  selector: 'app-refuse-order-btn',
  imports: [],
  templateUrl: './refuse-order-btn.html',
  styleUrl: './refuse-order-btn.scss',
})
export class RefuseOrderBtn {
  @Input() orderId!: string;
  @Input() displayMode!: boolean;
  isLoading = signal<boolean>(false);
  @Output() editOrder = new EventEmitter<void>();

  constructor(
    private readonly orderService: OrderService,
    private readonly alertHandler: AlertHandler
  ) {}

  refuseOrder() {
    this.isLoading.set(true);
    this.alertHandler
      .showConfirm(
        'Voulez vous vraiment REFUSER cette commande ?',
        'Confirmation'
      )
      .then((valid) => {
        if (!valid) {
          this.isLoading.set(false);
          return;
        }
        this.orderService
          .updateOrder(this.orderId, { status: 'Refusée' })
          .subscribe({
            next: (res) => {
              this.alertHandler.showSuccess(
                res.message,
                `Commande ${this.orderId} refusée`
              );
              this.editOrder.emit();
            },
            error: (error) => {
              console.error(error.message);
              this.alertHandler.showError(error.error.message, 'Erreur');
            },
          });
      });
    this.isLoading.set(false);
  }
}
