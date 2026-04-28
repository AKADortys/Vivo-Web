import { Component, ViewChild, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  Router,
  NavigationEnd,
} from '@angular/router';
import { AlertHandler } from './services/alert-handler';
import { AuthUserService } from './services/auth-user';
import { AsyncPipe, DatePipe } from '@angular/common';
import { UserDropDownMenu } from './components/shared/user/user-drop-down-menu/user-drop-down-menu';
import { CartBadge } from './components/shared/order/cart-badge/cart-badge';
import { OrderBadge } from './components/shared/order/order-badge/order-badge';
import { Modal } from './components/shared/utils/modal/modal';
import { ShoppingCart } from './components/shared/order/shopping-cart/shopping-cart';
import { ConfigService, StoreConfig } from './services/config';
import { Observable } from 'rxjs';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    UserDropDownMenu,
    CartBadge,
    OrderBadge,
    AsyncPipe,
    DatePipe,
    Modal,
    ShoppingCart,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected title = 'Vivo-Web';
  public user$;

  private configService = inject(ConfigService);
  private socketService = inject(SocketService);
  private alertHandler = inject(AlertHandler);
  private cdr = inject(ChangeDetectorRef);
  storeStatus$: Observable<StoreConfig> = this.configService.storeStatus$;

  @ViewChild(Modal) cartModal!: Modal;

  constructor(
    private authService: AuthUserService,
    private router: Router,
  ) {
    this.user$ = this.authService.user$;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnInit() {
    this.user$.subscribe(user => {
      if (user && user._id) {
        this.socketService.joinUserRoom(user._id);
      }
    });

    this.socketService.listen('order_status_updated').subscribe((data: any) => {
      this.alertHandler.showSuccess('Le statut de votre commande a été mis à jour !', 'Information');
      this.cdr.detectChanges();
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
