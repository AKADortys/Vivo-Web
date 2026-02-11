import { Component, ViewChild, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { AuthUserService } from './services/auth-user';
import { AsyncPipe, DatePipe } from '@angular/common';
import { UserDropDownMenu } from './components/shared/user/user-drop-down-menu/user-drop-down-menu';
import { CartBadge } from './components/shared/order/cart-badge/cart-badge';
import { Modal } from './components/shared/utils/modal/modal';
import { ShoppingCart } from './components/shared/order/shopping-cart/shopping-cart';
import { ConfigService, StoreConfig } from './services/config';
import { Observable } from 'rxjs';

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
    DatePipe,
    Modal,
    ShoppingCart,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'Vivo-Web';
  public user$;

  private configService = inject(ConfigService);
  storeStatus$: Observable<StoreConfig> = this.configService.storeStatus$;

  @ViewChild(Modal) cartModal!: Modal;

  constructor(private authService: AuthUserService, private router: Router) {
    this.user$ = this.authService.user$;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  isStoreOpen(config: StoreConfig): boolean {
    // Use the centralized logic from service which handles hours and planned closures
    return this.configService.isStoreOpen(config);
  }

  openCart() {
    this.cartModal.open();
  }
}
