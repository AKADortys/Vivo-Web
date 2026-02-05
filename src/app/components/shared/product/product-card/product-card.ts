import { Component, EventEmitter, input, Output, signal } from '@angular/core';
import { Product } from '../../../../interfaces/product';
import { FormatDatePipe } from '../../../../pipes/format-date-pipe';
import { CurrencyPipe } from '@angular/common';
import { RemoveProduct } from '../remove-product/remove-product';
import { AuthUserService } from '../../../../services/auth-user';
import { CartService } from '../../../../services/cart';
import { FormsModule } from '@angular/forms';
import { AlertHandler } from '../../../../services/alert-handler';

@Component({
  selector: 'app-product-card',
  imports: [FormatDatePipe, RemoveProduct, FormsModule, CurrencyPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  product = input.required<Product>();
  forceClientView = input<boolean>(false);
  productQuantity = signal<number>(1);
  @Output() editProduct = new EventEmitter<Product>();
  @Output() removeProduct = new EventEmitter<boolean>();
  constructor(
    readonly authUserService: AuthUserService,
    readonly cartService: CartService,
    readonly alertService: AlertHandler
  ) { }

  public onEdit() {
    this.editProduct.emit(this.product());
  }

  public addToCart(quantity: number = 1) {
    this.cartService.addToCart(this.product(), quantity);
    this.alertService.showSuccess(
      `${this.product().label} x ${quantity} ajouté au panier`,
      'Produit ajouté'
    );
  }

  public onRemove() {
    this.removeProduct.emit(true);
  }
}
