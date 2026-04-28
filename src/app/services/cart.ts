import { Injectable, OnDestroy, inject } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthUserService } from './auth-user';
import { Cart } from '../class/cart';
import { Product } from '../interfaces/product';
import { ProductService } from './product';

@Injectable({ providedIn: 'root' })
export class CartService implements OnDestroy {
  private cartSubject: BehaviorSubject<Cart>;
  cart$: Observable<Cart>;
  private destroy$ = new Subject<void>();
  private productService = inject(ProductService);

  constructor(private authService: AuthUserService) {
    const user = this.authService.getUser();
    const cart = this.loadCart(user?._id ?? 'anonymous');

    this.cartSubject = new BehaviorSubject<Cart>(cart);
    this.cart$ = this.cartSubject.asObservable();

    this.initCart();

    // Sync cart with real-time product updates
    this.productService.productUpdated$.pipe(takeUntil(this.destroy$)).subscribe((updatedProduct: Product) => {
      const currentCart = this.cartSubject.value;
      const item = currentCart.productsDetails.find((i: any) => i._id === updatedProduct._id);
      if (item) {
        if (!updatedProduct.available || updatedProduct.stock <= 0) {
          currentCart.removeItem(updatedProduct._id);
        } else {
          // Update properties from the new product
          item.price = updatedProduct.price;
          item.label = updatedProduct.label;
          if (item.quantity > updatedProduct.stock) {
            item.quantity = updatedProduct.stock;
          }
          currentCart.calculateTotal();
        }
        this.updateCart(currentCart);
      }
    });
  }

  private initCart(): void {
    this.authService.user$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      if (!user) {
        this.updateCart(new Cart('anonymous'));
        return;
      }

      const currentCart = this.cartSubject.value;

      if (currentCart.userId !== user._id) {
        const anonymousCart = this.loadCart('anonymous');
        const userCart = this.loadCart(user._id);

        if (anonymousCart.getTotalItems() > 0) {
          userCart.merge(anonymousCart);
          localStorage.removeItem('cart-anonymous');
        }

        this.updateCart(userCart);
      }
    });
  }

  private loadCart(userId: string): Cart {
    const saved = localStorage.getItem(`cart-${userId}`);
    if (!saved) {
      return new Cart(userId);
    }

    const parsed = JSON.parse(saved);
    const cart = Object.assign(new Cart(userId), parsed) as Cart;

    cart.calculateTotal();
    return cart;
  }

  private updateCart(cart: Cart): void {
    this.cartSubject.next(cart);
    this.saveCart(cart);
  }

  private saveCart(cart: Cart): void {
    localStorage.setItem(`cart-${cart.userId}`, JSON.stringify(cart));
  }

  addToCart(product: Product, quantity: number): void {
    const cart = this.cartSubject.value;
    cart.addItem(product, quantity);
    this.updateCart(cart);
  }
  updateItemQuantity(productId: string, quantity: number): void {
    const cart = this.cartSubject.value;
    cart.updateItemQuantity(productId, quantity);
    this.updateCart(cart);
  }
  removeItem(productId: string): void {
    const cart = this.cartSubject.value;
    cart.removeItem(productId);
    this.updateCart(cart);
  }

  clearCart(): void {
    const cart = this.cartSubject.value;
    cart.clearCart();
    this.updateCart(cart);
  }

  setDeliveryAddress(address: any): void {
    const cart = this.cartSubject.value;
    cart.setDeliveryAddress(address);
    this.updateCart(cart);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  get currentCart(): Cart {
    return this.cartSubject.value;
  }
}
