import { Component, EventEmitter, input, Output } from '@angular/core';
import { Product } from '../../../../interfaces/product';
import { FormatDatePipe } from '../../../../pipes/format-date-pipe';
import { RemoveProduct } from '../remove-product/remove-product';

@Component({
  selector: 'app-product-card',
  imports: [FormatDatePipe, RemoveProduct],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  product = input.required<Product>();
  @Output() editProduct = new EventEmitter<Product>();
  @Output() removeProduct = new EventEmitter<boolean>();

  public onEdit() {
    this.editProduct.emit(this.product());
  }

  public onRemove() {
    this.removeProduct.emit(true);
  }
}
