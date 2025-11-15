import { Product, UpdateProduct } from '../../../../interfaces/product';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AlertHandler } from '../../../../services/alert-handler';
import { ProductService } from '../../../../services/product';
@Component({
  selector: 'app-product-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './product-edit.html',
  styleUrl: './product-edit.scss',
})
export class ProductEdit implements OnInit {
  @Output() save = new EventEmitter<boolean>();

  productForm!: FormGroup;
  isLoading = signal<boolean>(false);
  private _product: Product | null = null;

  @Input()
  set product(value: Product | null) {
    this._product = value;
    if (this.productForm && value) {
      this.patchFormValues(value);
    }
  }

  constructor(
    private httpService: ProductService,
    private alertHandler: AlertHandler
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    if (this._product) {
      this.patchFormValues(this._product);
    }
  }

  initializeForm(): void {
    this.productForm = new FormGroup({
      label: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(20),
      ]),
      price: new FormControl(null, [Validators.required, Validators.min(0.01)]),
      category: new FormControl('', [Validators.required]),
      available: new FormControl(false, [Validators.required]),
    });
  }

  patchFormValues(product: Product): void {
    this.productForm.patchValue({
      label: product.label,
      description: product.description,
      price: product.price,
      category: product.category,
      available: product.available,
    });
  }

  onSubmit(): void {
    if (!this.productForm.valid || !this._product?._id) return;

    this.isLoading.set(true);

    const formValue = this.productForm.value;
    const payload: Partial<Product> = {};

    for (const key of Object.keys(formValue) as (keyof Product)[]) {
      const newValue = formValue[key];
      const oldValue = this._product[key];

      // Si la valeur est différente, on l'ajoute
      if (newValue !== oldValue && newValue !== null && newValue !== '') {
        payload[key] = newValue as any;
      }
    }

    if (Object.keys(payload).length === 0) {
      this.isLoading.set(false);
      return this.alertHandler.showInfo('Fournissez au moins une modification');
    }

    this.alertHandler
      .showConfirm('Confirmer les modifications ?')
      .then((confirm) => {
        if (!confirm) {
          this.isLoading.set(false);
          return;
        }

        this.httpService.updateProduct(this._product!._id, payload).subscribe({
          next: () => {
            this.alertHandler.showSuccess('Produit modifié !', 'Succès');
            this.isLoading.set(false);
            this.save.emit(true);
          },
          error: (error) => {
            this.alertHandler.showError(
              error.message || error.error.message,
              'Erreur'
            );
            this.isLoading.set(false);
          },
        });
      });
  }
}
