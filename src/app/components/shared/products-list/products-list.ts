import { Component, Query, signal } from '@angular/core';
import { Product, ResponseProducts } from '../../../interfaces/product';
import { ProductService } from '../../../services/product';
import { Pagination } from '../pagination/pagination';
import { QueryHandlerBar } from '../query-handler-bar/query-handler-bar';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-products-list',
  imports: [QueryHandlerBar, Pagination, ProductCard],
  templateUrl: './products-list.html',
  styleUrl: './products-list.scss',
})
export class ProductsList {
  products = signal<Product[]>([]);
  isLoading: boolean;
  errorMessage: string | null = null;
  totalItems = signal<number>(0);
  itemsPerPage = signal<number>(10);
  currentPage = signal<number>(1);
  totalPages = signal<number>(0);
  searchQuery = signal<string>('');
  constructor(private productService: ProductService) {
    this.isLoading = false;
  }

  ngOnInit() {
    this.loadUsers();
  }

  resetProps() {
    this.isLoading = true;
    this.errorMessage = null;
  }
  loadUsers(
    page: number = this.currentPage(),
    limit: number = this.itemsPerPage(),
    search: string = ''
  ) {
    this.resetProps();
    this.productService.getProducts(page, limit, search).subscribe({
      next: (response: ResponseProducts) => {
        this.products.set(response?.data?.products || []);
        this.currentPage.set(response.data?.page || 1);
        this.itemsPerPage.set(limit);
        this.totalItems.set(response.data?.total || this.products().length);
        this.totalPages.set(Math.ceil(this.totalItems() / this.itemsPerPage()));
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.isLoading = false;
        this.errorMessage = 'Erreur lors du chargement des produits';
      },
      complete: () => {
        console.log('Product loading completed.');
      },
    });
  }

  onSearchChange(query: string): void {
    this.searchQuery.set(query);
    this.loadUsers(1, this.itemsPerPage(), query);
  }

  onPageSizeChange(size: number): void {
    this.itemsPerPage.set(size);
    this.loadUsers(1, size, this.searchQuery());
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.loadUsers(page, this.itemsPerPage(), this.searchQuery());
  }
}
