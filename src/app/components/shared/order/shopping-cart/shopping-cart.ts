import { Component } from '@angular/core';
import { CartService } from '../../../../services/cart';
import { Observable } from 'rxjs';
import { Cart } from '../../../../class/cart';
import { Product } from '../../../../interfaces/product';
import { AsyncPipe } from '@angular/common';
import { AlertHandler } from '../../../../services/alert-handler';
import { ConfirmOrderClientBtn } from '../confirm-order-client-btn/confirm-order-client-btn';
@Component({
  selector: 'app-shopping-cart',
  imports: [AsyncPipe, ConfirmOrderClientBtn],
  templateUrl: './shopping-cart.html',
  styleUrl: './shopping-cart.scss',
})
export class ShoppingCart {
  cart$: Observable<Cart>;

  constructor(
    private cartService: CartService,
    private alertService: AlertHandler
  ) {
    this.cart$ = this.cartService.cart$;
  }

  updateProductQuantity(productId: string, quantity: number): void {
    this.cartService.updateItemQuantity(productId, quantity);
  }

  removeProduct(productId: string): void {
    this.cartService.removeItem(productId);
  }

  clear(): void {
    this.cartService.clearCart();
  }

  setAddress(address: string): void {
    this.cartService.setDeliveryAddress(address);
  }
}
