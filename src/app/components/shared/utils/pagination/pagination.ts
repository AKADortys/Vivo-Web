import { Component, input, output, computed, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  standalone: true,
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
})
export class Pagination {
  // Entrées (signals)
  totalItems = input.required<number>();
  itemsPerPage = input.required<number>();
  currentPage = input.required<number>();

  // Sorties (événements)
  pageChange = output<number>();

  // Calcul du nombre total de pages
  totalPages = computed(() =>
    Math.ceil(this.totalItems() / this.itemsPerPage())
  );

  // Tableau des numéros de page à afficher
  pages = computed(() => {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages(); i++) {
      pages.push(i);
    }
    return pages;
  });

  // Gestion du changement de page
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.pageChange.emit(page);
    }
  }

  // Pages précédentes/suivantes
  prevPage(): void {
    this.goToPage(this.currentPage() - 1);
  }

  nextPage(): void {
    this.goToPage(this.currentPage() + 1);
  }
}
