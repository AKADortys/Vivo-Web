import { Component, inject } from '@angular/core';
import { OrderService } from '../../../../services/order.service';
import { AlertHandler } from '../../../../services/alert-handler';
import { ConfigService, StoreConfig } from '../../../../services/config';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-confirm-order-client-btn',
  imports: [AsyncPipe],
  templateUrl: './confirm-order-client-btn.html',
  styleUrl: './confirm-order-client-btn.scss',
})
export class ConfirmOrderClientBtn {
  private configService = inject(ConfigService);
  storeStatus$: Observable<StoreConfig> = this.configService.storeStatus$;

  constructor(
    private readonly orderService: OrderService,
    private alertService: AlertHandler
  ) { }

  isStoreOpen(config: StoreConfig): boolean {
    if (!config.isStoreOpen) return false;
    if (config.closingSchedule && config.closingSchedule.start && config.closingSchedule.end) {
      const now = new Date();
      const start = new Date(config.closingSchedule.start);
      const end = new Date(config.closingSchedule.end);
      if (now >= start && now <= end) return false;
    }
    return true;
  }

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
