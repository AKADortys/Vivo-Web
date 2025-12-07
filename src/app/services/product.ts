import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {
  NewProduct,
  ProductFilter,
  ResponseProduct,
  ResponseProducts,
  UpdateProduct,
} from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly baseUrl = `${environment.apiUrl}products`;

  constructor(private http: HttpClient) {}

  getProducts(
    page = 1,
    limit = 10,
    filter: ProductFilter
  ): Observable<ResponseProducts> {
    const params: string[] = [];

    params.push(`page=${page}`);
    params.push(`limit=${limit}`);

    if (filter.search)
      params.push(`search=${encodeURIComponent(filter.search)}`);
    if (filter.category)
      params.push(`category=${encodeURIComponent(filter.category)}`);
    if (filter.available !== undefined)
      params.push(`available=${filter.available}`);

    if (filter.minPrice !== undefined && filter.minPrice !== null)
      params.push(`minPrice=${filter.minPrice}`);

    if (filter.maxPrice !== undefined && filter.maxPrice !== null)
      params.push(`maxPrice=${filter.maxPrice}`);

    if (filter.label) params.push(`label=${encodeURIComponent(filter.label)}`);

    if (filter.startDate)
      params.push(
        `startDate=${encodeURIComponent(filter.startDate.toString())}`
      );

    if (filter.endDate)
      params.push(`endDate=${encodeURIComponent(filter.endDate.toString())}`);

    const query = params.join('&');

    return this.http
      .get<ResponseProducts>(`${this.baseUrl}?${query}`)
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
  } //

  updateProduct(
    id: string,
    product: Partial<UpdateProduct>
  ): Observable<ResponseProduct> {
    return this.http
      .put<ResponseProduct>(`${this.baseUrl}/${id}`, product)
      .pipe(catchError(this.handleError));
  } //

  deleteProduct(id: string): Observable<ResponseProduct> {
    return this.http
      .delete<ResponseProduct>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  } //

  private handleError(error: any) {
    console.error('HTTP Error:', error.message || error);
    return throwError(() => error);
  }
}
