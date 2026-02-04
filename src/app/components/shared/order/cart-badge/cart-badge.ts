import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from '../../../../services/cart';
import { Cart } from '../../../../class/cart';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-badge',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './cart-badge.html',
  styleUrl: './cart-badge.scss',
})
export class CartBadge {
  cart$: Observable<Cart>;

  constructor(private cartService: CartService) {
    this.cart$ = this.cartService.cart$;
  }

  @Input() navigate = true;
  @Output() badgeClick = new EventEmitter<void>();

  onClick(event: Event) {
    if (!this.navigate) {
      event.preventDefault();
      this.badgeClick.emit();
    }
  }
}
