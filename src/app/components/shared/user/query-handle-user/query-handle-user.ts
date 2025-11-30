import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserFilter } from '../../../../interfaces/user';

@Component({
  selector: 'app-query-handle-user',
  imports: [FormsModule],
  templateUrl: './query-handle-user.html',
  styleUrl: './query-handle-user.scss',
})
export class QueryHandleUser {
  filters = input<UserFilter>();

  pageSizeOptions = [5, 10, 25, 50, 100];

  filterChange = output<any>();

  emitFilter(): void {
    this.filterChange.emit(this.filters());
  }
}
