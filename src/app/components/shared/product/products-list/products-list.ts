import { Component, Query, signal, ViewChild } from '@angular/core';
import { Product, ResponseProducts } from '../../../../interfaces/product';
import { ProductService } from '../../../../services/product';
import { Pagination } from '../../utils/pagination/pagination';
import { QueryHandlerBar } from '../../utils/query-handler-bar/query-handler-bar';
import { ProductCard } from '../product-card/product-card';
import { Modal } from '../../utils/modal/modal';
import { ProductEdit } from '../product-edit/product-edit';

@Component({
  selector: 'app-products-list',
  imports: [QueryHandlerBar, Pagination, ProductCard, Modal, ProductEdit],
  templateUrl: './products-list.html',
  styleUrl: './products-list.scss',
})
export class ProductsList {
  @ViewChild('editModal') modal!: Modal;
  products = signal<Product[]>([]);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  totalItems = signal<number>(0);
  itemsPerPage = signal<number>(10);
  currentPage = signal<number>(1);
  totalPages = signal<number>(0);
  searchQuery = signal<string>('');
  selectedProduct = signal<Product | null>(null);
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProduct();
  }

  resetProps() {
    this.isLoading.set(true);
    this.errorMessage.set(null);
  }
  loadProduct(
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
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.isLoading.set(false);
        this.errorMessage.set('Erreur lors du chargement des produits');
      },
      complete: () => {
        console.log('Product loading completed.');
      },
    });
  }

  onSearchChange(query: string): void {
    this.searchQuery.set(query);
    this.loadProduct(1, this.itemsPerPage(), query);
  }

  onPageSizeChange(size: number): void {
    this.itemsPerPage.set(size);
    this.loadProduct(1, size, this.searchQuery());
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.loadProduct(page, this.itemsPerPage(), this.searchQuery());
  }

  onEditProduct(prod: Product): void {
    this.selectedProduct.set(prod);
    this.modal.open();
  }

  onEditedProduct(): void {
    this.modal.close();
    this.loadProduct();
  }

  onRemoveProduct(): void {
    this.loadProduct();
  }
}
