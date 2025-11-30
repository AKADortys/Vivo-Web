// query-handle-user.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserFilter } from '../../../../interfaces/user';

@Component({
  selector: 'app-query-handle-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './query-handle-user.html',
  styleUrls: ['./query-handle-user.scss'],
})
export class QueryHandleUser {
  @Input() filters!: UserFilter;

  pageSizeOptions = [5, 10, 25, 50, 100];

  @Output() filterChange = new EventEmitter<UserFilter>();
  @Output() filterReset = new EventEmitter<void>();

  emitFilter(): void {
    this.filterChange.emit(this.filters);
  }

  resetFilter(): void {
    this.filterReset.emit();
  }
}
