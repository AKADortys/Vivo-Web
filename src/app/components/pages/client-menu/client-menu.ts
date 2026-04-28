import { Component, signal } from '@angular/core';
import { Product, ProductFilter, ResponseProducts } from '../../../interfaces/product';
import { ProductService } from '../../../services/product';
import { Pagination } from '../../shared/utils/pagination/pagination';
import { ProductCard } from '../../shared/product/product-card/product-card';
import { QueryHandleProduct } from '../../shared/product/query-handle-product/query-handle-product';
import { AuthUserService } from '../../../services/auth-user';
import { AlertHandler } from '../../../services/alert-handler';

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
    paginatedFilter = signal<ProductFilter>({ available: true, pageSize: 12, category: 'Plat principal' }); // Default page size adjusted for grid
    categories = ['Plat principal', 'Dessert', 'Boisson', 'Divers'];

    constructor(
        private productService: ProductService,
        public authUserService: AuthUserService,
        private alertHandler: AlertHandler
    ) { }

    selectCategory(category: string | undefined) {
        this.paginatedFilter.update(filter => ({ ...filter, category }));
        this.currentPage.set(1);
        this.loadProducts(1);
    }

    ngOnInit() {
        this.loadProducts();

        // Écouter les mises à jour en temps réel
        this.productService.productUpdated$.subscribe((updatedProduct: Product) => {
            this.products.update(prods => prods.map(p => p._id === updatedProduct._id ? updatedProduct : p));
        });

        this.productService.productDeleted$.subscribe((deletedProduct: Product) => {
            this.products.update(prods => prods.filter(p => p._id !== deletedProduct._id));
        });

        // Pour la création, on peut recharger la liste si le produit correspond au filtre
        // Ou plus simplement recharger la page courante pour garder la pagination correcte
        this.productService.productCreated$.subscribe(() => {
            this.loadProducts(); 
        });
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
                if (error.status === 503) {
                    this.alertHandler.showError(error.error?.message || 'Le magasin est actuellement fermé.', 'Fermeture du magasin');
                    this.errorMessage.set(error.error?.message || 'Le magasin est actuellement fermé.');
                } else {
                    this.errorMessage.set('Impossible de charger le menu pour le moment.');
                }
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
