import { Component, signal, ViewChild } from '@angular/core';
import {
  Product,
  ProductFilter,
  ResponseProducts,
} from '../../../../interfaces/product';
import { ProductService } from '../../../../services/product';
import { Pagination } from '../../utils/pagination/pagination';
import { ProductCard } from '../product-card/product-card';
import { Modal } from '../../utils/modal/modal';
import { ProductEdit } from '../product-edit/product-edit';
import { AddProduct } from '../add-product/add-product';
import { QueryHandleProduct } from '../query-handle-product/query-handle-product';
import { ProductTable } from '../product-table/product-table';
import { AuthUserService } from '../../../../services/auth-user';

@Component({
  selector: 'app-products-list',
  imports: [
    Pagination,
    ProductCard,
    ProductTable,
    Modal,
    ProductEdit,
    AddProduct,
    QueryHandleProduct,
  ],
  templateUrl: './products-list.html',
  styleUrl: './products-list.scss',
})
export class ProductsList {
  @ViewChild('editModal') editModal!: Modal;
  @ViewChild('addModal') addModal!: Modal;
  products = signal<Product[]>([]);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  totalItems = signal<number>(0);
  currentPage = signal<number>(1);
  totalPages = signal<number>(0);
  selectedProduct = signal<Product | null>(null);
  paginatedFilter = signal<ProductFilter>({ available: true, pageSize: 50 });
  displayMode = signal<'card' | 'table'>('card');
  constructor(
    private productService: ProductService,
    readonly authUserService: AuthUserService,
  ) {}

  ngOnInit() {
    this.loadProduct();

    // Écouter les mises à jour en temps réel
    this.productService.productUpdated$.subscribe((updatedProduct: Product) => {
      this.products.update(prods => prods.map(p => p._id === updatedProduct._id ? updatedProduct : p));
    });

    this.productService.productDeleted$.subscribe((deletedProduct: Product) => {
      this.products.update(prods => prods.filter(p => p._id !== deletedProduct._id));
    });

    this.productService.productCreated$.subscribe(() => {
      this.loadProduct(); 
    });
  }
  resetProps() {
    this.isLoading.set(true);
    this.errorMessage.set(null);
  }
  loadProduct(
    page: number = this.currentPage(),
    limit: number = this.paginatedFilter().pageSize!,
    filter: ProductFilter = this.paginatedFilter(),
  ) {
    this.resetProps();
    this.productService.getProducts(page, limit, filter).subscribe({
      next: (response: ResponseProducts) => {
        this.products.set(response?.data?.products || []);
        this.currentPage.set(response.data?.page || 1);
        this.paginatedFilter().pageSize = limit;
        this.totalItems.set(response.data?.total || this.products().length);
        this.totalPages.set(
          Math.ceil(this.totalItems() / this.paginatedFilter().pageSize!),
        );
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.isLoading.set(false);
        this.errorMessage.set('Erreur lors du chargement des produits');
      },
    });
  }
  onPageChange(page: number) {
    this.currentPage.set(page);
    this.loadProduct();
  }
  onEditProduct(prod: Product): void {
    this.selectedProduct.set(prod);
    this.editModal.open();
  }
  onEditedProduct(): void {
    this.editModal.close();
    this.loadProduct();
  }
  onAddProduct() {
    this.addModal.open();
  }
  onAddedProduct() {
    this.addModal.close();
    this.loadProduct();
  }
  onRemoveProduct(): void {
    this.loadProduct();
  }
  onFilterChange(filter: ProductFilter) {
    this.paginatedFilter.set(filter);
    this.currentPage.set(1);
    this.loadProduct(1);
  }
  onFilterReset() {
    this.paginatedFilter.set({});
    this.loadProduct(1);
  }
  setDisplayMode(mode: 'card' | 'table') {
    this.displayMode.set(mode);
  }
}
