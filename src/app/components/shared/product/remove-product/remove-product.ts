import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { ProductService } from '../../../../services/product';
import { AlertHandler } from '../../../../services/alert-handler';

@Component({
  selector: 'app-remove-product',
  imports: [],
  templateUrl: './remove-product.html',
  styleUrl: './remove-product.scss',
})
export class RemoveProduct {
  constructor(
    private http: ProductService,
    private alertService: AlertHandler
  ) {}

  @Input() productId?: string;
  @Output() onRemoved = new EventEmitter<boolean>();
  isLoading = signal<boolean>(false);

  onRemove() {
    if (this.productId) {
      this.isLoading.set(true);
      this.alertService
        .showConfirm('Voulez vous vraiment supprimer cet élément')
        .then((confirm) => {
          if (!confirm) {
            this.isLoading.set(false);
            return;
          }
          this.http.deleteProduct(this.productId!).subscribe({
            next: (response) => {
              this.alertService.showSuccess(response.message);
              this.isLoading.set(false);
              this.onRemoved.emit(true);
            },
            error: (error) => {
              this.alertService.showError(
                error.error.message || error.message,
                'Erreur'
              );
              this.isLoading.set(false);
            },
          });
        });
    }
  }
}
