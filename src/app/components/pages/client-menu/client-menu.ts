import { Component, signal } from '@angular/core';
import { Product, ProductFilter, ResponseProducts } from '../../../interfaces/product';
import { ProductService } from '../../../services/product';
import { Pagination } from '../../shared/utils/pagination/pagination';
import { ProductCard } from '../../shared/product/product-card/product-card';
import { QueryHandleProduct } from '../../shared/product/query-handle-product/query-handle-product';
import { AuthUserService } from '../../../services/auth-user';

@Component({
    selector: 'app-client-menu',
    standalone: true,
    imports: [
        Pagination,
        ProductCard,
        QueryHandleProduct
    ],
    templateUrl: './client-menu.html',
    styleUrl: './client-menu.scss'
})
export class ClientMenu {
    products = signal<Product[]>([]);
    isLoading = signal<boolean>(false);
    errorMessage = signal<string | null>(null);
    totalItems = signal<number>(0);
    currentPage = signal<number>(1);
    paginatedFilter = signal<ProductFilter>({ available: true, pageSize: 12 }); // Default page size adjusted for grid

    constructor(
        private productService: ProductService,
        public authUserService: AuthUserService
    ) { }

    ngOnInit() {
        this.loadProducts();
    }

    loadProducts(
        page: number = this.currentPage(),
        limit: number = this.paginatedFilter().pageSize!,
        filter: ProductFilter = this.paginatedFilter()
    ) {
        this.isLoading.set(true);
        this.errorMessage.set(null);

        this.productService.getProducts(page, limit, filter).subscribe({
            next: (response: ResponseProducts) => {
                this.products.set(response?.data?.products || []);
                this.currentPage.set(response.data?.page || 1);
                this.totalItems.set(response.data?.total || 0);
                this.isLoading.set(false);
            },
            error: (error) => {
                console.error('Error loading products:', error);
                this.errorMessage.set('Impossible de charger le menu pour le moment.');
                this.isLoading.set(false);
            }
        });
    }

    onPageChange(page: number) {
        this.currentPage.set(page);
        this.loadProducts();
    }

    onFilterChange(filter: ProductFilter) {
        this.paginatedFilter.set(filter);
        this.currentPage.set(1);
        this.loadProducts(1);
    }

    onFilterReset() {
        this.paginatedFilter.set({ available: true, pageSize: 12 });
        this.loadProducts(1);
    }
}
