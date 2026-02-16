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
    const total = this.totalPages();
    const current = this.currentPage();
    const pages: number[] = [];

    if (total <= 7) {
      // Si moins de 7 pages, tout afficher
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      // Toujours afficher la première page
      pages.push(1);

      if (current > 4) {
        pages.push(-1); // Ellipsis début
      }

      // Pages autour de la page courante
      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (current < total - 3) {
        pages.push(-1); // Ellipsis fin
      }

      // Toujours afficher la dernière page
      pages.push(total);
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
