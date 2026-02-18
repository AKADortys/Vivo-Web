import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../../services/product';
import { AlertHandler } from '../../../../services/alert-handler';
@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.scss',
})
export class AddProduct {
  productForm!: FormGroup;
  isLoading = signal<boolean>(false);
  categoryOption = signal<string[]>([
    'Plat principal',
    'Dessert',
    'Boisson',
    'Divers',
  ]);
  @Output() submited = new EventEmitter<boolean>(false);

  constructor(
    private fb: FormBuilder,
    private httpService: ProductService,
    private alertHandler: AlertHandler,
  ) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      label: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: [null, [Validators.required, Validators.min(0)]],
      category: [''],
      available: [false],
      stock: [0, [Validators.min(0)]],
    });
  }

  get f() {
    return this.productForm.controls;
  }

  isInvalid(field: string): boolean {
    const control = this.f[field];
    return (this.isLoading() || control.touched) && control.invalid;
  }

  onSubmit(): void {
    this.isLoading.set(true);
    if (this.productForm.invalid)
      return this.alertHandler.showError('Formulaire invalide !', 'Erreur');
    this.httpService.createProduct(this.productForm.value).subscribe({
      next: (response) => {
        this.alertHandler.showSuccess('Produit ajouté !', response.message);
        this.isLoading.set(false);
        this.submited.emit(true);
      },
      error: (error) => {
        this.alertHandler.showError(
          'Erreur lors de la création',
          error.message,
        );
        this.isLoading.set(false);
      },
    });
  }
}
