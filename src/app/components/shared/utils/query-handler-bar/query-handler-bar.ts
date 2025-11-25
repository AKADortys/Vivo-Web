import { Component, input, output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-query-handler-bar',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './query-handler-bar.html',
  styleUrl: './query-handler-bar.scss',
})
export class QueryHandlerBar {
  // Entrée : valeur initiale du champ de recherche
  searchQuery = input<string>('');
  PageSize = input<number>(10);
  PageSizeOptions = [5, 10, 25, 50, 100];

  // Sortie : événement émis quand la recherche change
  searchChange = output<string>();
  pageSizeChange = output<number>();

  // Méthode appelée lors de la saisie
  onSearchChange(query: string): void {
    this.searchChange.emit(query);
  }

  onPageSizeChange(size: number): void {
    this.pageSizeChange.emit(size);
  }
}
