import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
})
export class Pagination {
  @Input() page!: number;
  @Input() totalPages!: number;
  @Input() limit!: number;
  @Input() search: string = '';
  @Input() total!: number;

  @Output() changePage = new EventEmitter<{
    search: string;
    page: number;
    limit: number;
  }>();

  previousPage(): void {
    if (this.page > 1) {
      this.changePage.emit({
        search: this.search,
        page: this.page - 1,
        limit: this.limit,
      });
    }
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.changePage.emit({
        search: this.search,
        page: this.page + 1,
        limit: this.limit,
      });
    }
  }

  onSearchChange(): void {
    this.page = 1;
    this.changePage.emit({
      search: this.search,
      page: this.page,
      limit: this.limit,
    });
  }

  onLimitChange(): void {
    this.page = 1;
    this.changePage.emit({
      search: this.search,
      page: this.page,
      limit: this.limit,
    });
  }
}
