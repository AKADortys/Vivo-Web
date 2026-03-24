import { Component, inject } from '@angular/core';
import { OrderService } from '../../../../services/order.service';
import { AlertHandler } from '../../../../services/alert-handler';
import { ConfigService, StoreConfig } from '../../../../services/config';
import { CartService } from '../../../../services/cart';
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
    private alertService: AlertHandler,
    private cartService: CartService
  ) { }

  isStoreOpen(config: StoreConfig): boolean {
    return this.configService.isStoreOpen(config);
  }

  getClosureReason(config: StoreConfig): string {
    return this.configService.getClosureReason(config);
  }

  createOrder(): void {
    const cart = this.cartService.currentCart;

    if (cart.getTotalItems() === 0) {
      this.alertService.showError('Le panier est vide', 'Erreur !');
      return;
    }

    if (cart.userId === 'anonymous') {
      this.alertService.showError('Vous devez être connecté pour passer une commande', 'Erreur !');
      return;
    }

    const cartItems = cart.productsDetails.map((item) => ({
      productId: item._id,
      productName: item.label,
      quantity: item.quantity,
      price: item.price,
    }));

    this.orderService.createCheckoutSession().subscribe({
      next: (response) => {
        const url = response.url || response.data?.url;
        if (url) {
          window.location.href = url;
        } else {
          this.alertService.showError("Impossible de récupérer l'URL de paiement", 'Erreur !');
        }
      },
      error: (error) => {
        console.error('Erreur lors de la création de la session Checkout:', error);
        this.alertService.showError(error.message || 'Une erreur est survenue lors du paiement', 'Erreur !');
      },
    });
  }
}
