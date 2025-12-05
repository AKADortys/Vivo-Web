import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderFilters } from '../../../../interfaces/order';
@Component({
  selector: 'app-query-handle-order',
  imports: [FormsModule],
  templateUrl: './query-handle-order.html',
  styleUrl: './query-handle-order.scss',
})
export class QueryHandleOrder {
  @Input() filters!: OrderFilters;

  pageSizeOptions = [5, 10, 25, 50, 100];

  @Output() filterChange = new EventEmitter<OrderFilters>();
  @Output() filterReset = new EventEmitter<void>();

  emitFilter() {
    this.filterChange.emit(this.filters);
  }
  resetFilter() {
    this.filterReset.emit();
  }
}
