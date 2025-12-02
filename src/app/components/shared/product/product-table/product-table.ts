import { Component, EventEmitter, input, Output } from '@angular/core';
import { Product } from '../../../../interfaces/product';
import { FormatDatePipe } from '../../../../pipes/format-date-pipe';
import { RemoveProduct } from '../remove-product/remove-product';

@Component({
  selector: 'tr[app-product-table]',
  imports: [FormatDatePipe, RemoveProduct],
  templateUrl: './product-table.html',
  styleUrl: './product-table.scss',
})
export class ProductTable {
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
