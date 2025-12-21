import { Component, EventEmitter, input, Output, signal } from '@angular/core';
import { Product } from '../../../../interfaces/product';
import { FormatDatePipe } from '../../../../pipes/format-date-pipe';
import { CurrencyPipe } from '@angular/common';
import { RemoveProduct } from '../remove-product/remove-product';
import { AuthUserService } from '../../../../services/auth-user';
import { CartService } from '../../../../services/cart';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-card',
  imports: [FormatDatePipe, RemoveProduct, FormsModule, CurrencyPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  product = input.required<Product>();
  productQuantity = signal<number>(1);
  @Output() editProduct = new EventEmitter<Product>();
  @Output() removeProduct = new EventEmitter<boolean>();
  constructor(
    readonly authUserService: AuthUserService,
    readonly cartService: CartService
  ) {}

  public onEdit() {
    this.editProduct.emit(this.product());
  }

  public addToCart(quantity: number = 1) {
    this.cartService.addToCart(this.product(), quantity);
  }

  public onRemove() {
    this.removeProduct.emit(true);
  }
}
