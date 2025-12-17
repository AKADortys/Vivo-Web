import { Component, EventEmitter, input, Output, signal } from '@angular/core';
import { Product } from '../../../../interfaces/product';
import { FormatDatePipe } from '../../../../pipes/format-date-pipe';
import { RemoveProduct } from '../remove-product/remove-product';
import { AuthUserService } from '../../../../services/auth-user';
import { CartService } from '../../../../services/cart';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'tr[app-product-table]',
  imports: [FormatDatePipe, RemoveProduct, FormsModule],
  templateUrl: './product-table.html',
  styleUrl: './product-table.scss',
})
export class ProductTable {
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
