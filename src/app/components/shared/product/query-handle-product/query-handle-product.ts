import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductFilter } from '../../../../interfaces/product';

@Component({
  selector: 'app-query-handle-product',
  imports: [FormsModule],
  templateUrl: './query-handle-product.html',
  styleUrl: './query-handle-product.scss',
})
export class QueryHandleProduct {
  @Input() filters!: ProductFilter;

  pageSizeOptions = [5, 10, 25, 50, 100];
  categories = ["Plat principal", "Dessert", "Boisson", "Divers"]

  @Output() filterChange = new EventEmitter<ProductFilter>();
  @Output() filterReset = new EventEmitter<void>();

  emitFilter(): void {
    this.filterChange.emit(this.filters);
  }

  resetFilter(): void {
    this.filterReset.emit();
  }
}
