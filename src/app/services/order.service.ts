import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {
  NewOrder,
  OrderFilters,
  ResponseOrder,
  ResponseOrders,
  UpdateOrder,
} from '../interfaces/order';
import { CartService } from './cart';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly baseUrl = `${environment.apiUrl}orders`;
  constructor(
    private readonly http: HttpClient,
    private readonly cartService: CartService,
  ) {}

  private handleError(error: any) {
    console.error('HTTP Error:', error.message || error);
    return throwError(() => error);
  }
  getOrders(
    page = 1,
    limit = 10,
    filter: OrderFilters,
  ): Observable<ResponseOrders> {
    let params = this.queryBuilder(page, limit, filter);

    return this.http
      .get<ResponseOrders>(this.baseUrl, { params: params })
      .pipe(catchError(this.handleError));
  }

  getOrderById(id: string): Observable<ResponseOrder> {
    return this.http
      .get<ResponseOrder>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getUserOrders(id: string): Observable<ResponseOrders> {
    return this.http
      .get<ResponseOrders>(`${this.baseUrl}/user/${id}`)
      .pipe(catchError(this.handleError));
  }

  createOrder(order: Partial<NewOrder>): Observable<ResponseOrder> {
    return this.http
      .post<ResponseOrder>(`${this.baseUrl}`, order)
      .pipe(catchError(this.handleError));
  }

  updateOrder(
    id: string,
    order: Partial<UpdateOrder>,
  ): Observable<ResponseOrder> {
    return this.http
      .put<ResponseOrder>(`${this.baseUrl}/${id}`, order)
      .pipe(catchError(this.handleError));
  }

  deleteOrder(id: string): Observable<ResponseOrder> {
    return this.http
      .delete<ResponseOrder>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  createOrderFromCart(): Observable<ResponseOrder> {
    const cart = this.cartService.currentCart;
    if (cart.getTotalItems() === 0) {
      return throwError(() => new Error('le panier est vide'));
    }
    if (cart.userId === 'anonymous') {
      return throwError(
        () => new Error('Vous devez être connecté pour passer une commande'),
      );
    }
    const order: Partial<NewOrder> = {
      products: cart.productsDetails.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
        price: item.price,
      })),
      deliveryAddress: cart.deliveryAddress
        ? cart.deliveryAddress
        : 'En Magasin',
    };
    this.cartService.clearCart();
    return this.http
      .post<ResponseOrder>(this.baseUrl, order)
      .pipe(catchError(this.handleError));
  }

  getUserHistory(
    page: number,
    limit: number,
    filter: OrderFilters,
  ): Observable<ResponseOrders> {
    let params = this.queryBuilder(page, limit, filter);
    return this.http
      .get<ResponseOrders>(`${this.baseUrl}/history`, { params })
      .pipe(catchError(this.handleError));
  }

  getOrderStats(): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}/stats/general`)
      .pipe(catchError(this.handleError));
  }

  getOrderStatsByDate(startDate: string, endDate: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('startDate', startDate);
    params = params.set('endDate', endDate);
    return this.http
      .get<any>(`${this.baseUrl}/stats/date`, { params })
      .pipe(catchError(this.handleError));
  }

  queryBuilder(page: number, limit: number, filter: OrderFilters): HttpParams {
    let params = new HttpParams();

    params = params.set('page', page);
    params = params.set('limit', limit);

    if (filter.status) params = params.set('status', filter.status);

    if (filter.address) params = params.set('address', filter.address);

    if (filter.productId) params = params.set('productId', filter.productId);

    if (filter.minQty) params = params.set('minQty', filter.minQty);

    if (filter.minPrice !== undefined && filter.minPrice !== null)
      params = params.set('minPrice', filter.minPrice);

    if (filter.maxPrice !== undefined && filter.maxPrice !== null)
      params = params.set('maxPrice', filter.maxPrice);

    if (filter.startDate) params = params.set('startDate', filter.startDate);

    if (filter.endDate) params = params.set('endDate', filter.endDate);
    return params;
  }
}
