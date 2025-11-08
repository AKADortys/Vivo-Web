import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  NewProduct,
  ResponseProduct,
  ResponseProducts,
  UpdateProduct,
} from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly baseUrl = `http://localhost:3000/products`;

  constructor(private http: HttpClient) {}

  getProducts(page = 1, limit = 10): Observable<ResponseProducts> {
    return this.http
      .get<ResponseProducts>(`${this.baseUrl}?page=${page}&limit=${limit}`)
      .pipe(catchError(this.handleError));
  }

  getProductById(id: string): Observable<ResponseProduct> {
    return this.http
      .get<ResponseProduct>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  createProduct(product: Partial<NewProduct>): Observable<ResponseProduct> {
    return this.http
      .post<ResponseProduct>(this.baseUrl, product)
      .pipe(catchError(this.handleError));
  }

  updateProduct(
    id: string,
    product: Partial<UpdateProduct>
  ): Observable<ResponseProduct> {
    return this.http
      .put<ResponseProduct>(`${this.baseUrl}/${id}`, product)
      .pipe(catchError(this.handleError));
  }

  deleteProduct(id: string): Observable<ResponseProduct> {
    return this.http
      .delete<ResponseProduct>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('HTTP Error:', error.message || error);
    return throwError(() => error);
  }
}
