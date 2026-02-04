import { Component, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthUserService } from './services/auth-user';
import { AsyncPipe } from '@angular/common';
import { UserDropDownMenu } from './components/shared/user/user-drop-down-menu/user-drop-down-menu';
import { CartBadge } from './components/shared/order/cart-badge/cart-badge';
import { Modal } from './components/shared/utils/modal/modal';
import { ShoppingCart } from './components/shared/order/shopping-cart/shopping-cart';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    UserDropDownMenu,
    CartBadge,
    AsyncPipe,
    Modal,
    ShoppingCart,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'Vivo-Web';
  public user$;
  constructor(private authService: AuthUserService) {
    authService = new AuthUserService();
    this.user$ = this.authService.user$;
  }

  @ViewChild(Modal) cartModal!: Modal;

  openCart() {
    this.cartModal.open();
  }
}
