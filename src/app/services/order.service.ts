import { Injectable, inject } from '@angular/core';
import { extractApiErrorMessage } from '../utils/api-error-handler';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {
  NewOrder,
  OrderFilters,
  ResponseOrder,
  ResponseOrders,
  OrderStatsResponse,
  UpdateOrder,
} from '../interfaces/order';
import { CartService } from './cart';
import { SocketService } from './socket.service';
import { AuthUserService } from './auth-user';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly baseUrl = `${environment.apiUrl}orders`;
  private readonly socketService = inject(SocketService);
  private readonly authService = inject(AuthUserService);

  private newOrdersCountSubject = new BehaviorSubject<number>(0);
  public newOrdersCount$ = this.newOrdersCountSubject.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly cartService: CartService,
  ) { 
    this.initAdminBadge();
  }

  private initAdminBadge() {
    this.authService.user$.subscribe(user => {
      if (user?.role === 'admin') {
        this.fetchNewOrdersCount();
        this.socketService.listen('admin_new_order').subscribe(() => {
          this.fetchNewOrdersCount();
        });
      }
    });
  }

  public fetchNewOrdersCount() {
    this.getOrders(1, 1, { status: 'Payée' }).subscribe({
      next: (res) => this.newOrdersCountSubject.next(res.data?.total || 0),
      error: () => this.newOrdersCountSubject.next(0)
    });
  }

  private handleError(error: any) {
    const message = extractApiErrorMessage(error);
    console.error('HTTP Error:', message);
    return throwError(() => new Error(message));
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

  getOrderDetailById(id: string): Observable<ResponseOrder> {
    return this.http
      .get<ResponseOrder>(`${this.baseUrl}/detail/${id}`)
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
      .pipe(
        tap(() => this.fetchNewOrdersCount()),
        catchError(this.handleError)
      );
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
        productName: item.label || 'Produit inconnu',
        quantity: item.quantity,
        price: item.price,
      })),
      ...(cart.deliveryAddress ? { deliveryAddress: cart.deliveryAddress } : {})
    };
    this.cartService.clearCart();
    return this.http
      .post<ResponseOrder>(this.baseUrl, order)
      .pipe(catchError(this.handleError));
  }

  createCheckoutSession(): Observable<{ url?: string; data?: { url: string } }> {
    const cart = this.cartService.currentCart;
    if (cart.getTotalItems() === 0) {
      return throwError(() => new Error('le panier est vide'));
    }

    if (cart.userId === 'anonymous') {
      return throwError(() => new Error('Vous devez être connecté pour passer une commande'));
    }

    const payload = {
      products: cart.productsDetails.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
        price: item.price,
        productName: item.label || 'Produit inconnu',
      })),
      ...(cart.deliveryAddress ? { deliveryAddress: cart.deliveryAddress } : {})
    };

    return this.http
      .post<{ url?: string; data?: { url: string } }>(`${this.baseUrl}/checkout-session`, payload)
      .pipe(catchError(this.handleError));
  }

  resumeCheckoutSession(orderId: string): Observable<{ url?: string; data?: { url: string } }> {
    return this.http
      .post<{ url?: string; data?: { url: string } }>(`${this.baseUrl}/checkout-session/${orderId}/resume`, {})
      .pipe(catchError((error) => {
        // Log ou extraire le message pour l'utilisateur
        const message = extractApiErrorMessage(error);
        return throwError(() => new Error(message));
      }));
  }

  verifyCheckoutSession(sessionId: string): Observable<{ success: boolean; message: string; data: { status: string; payment_status: string; orderId: string } }> {
    return this.http
      .get<{ success: boolean; message: string; data: { status: string; payment_status: string; orderId: string } }>(`${this.baseUrl}/checkout-session/${sessionId}/verify`)
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

  getOrderStats(): Observable<OrderStatsResponse> {
    return this.http
      .get<OrderStatsResponse>(`${this.baseUrl}/stats/general`)
      .pipe(catchError(this.handleError));
  }

  getOrderStatsByDate(
    startDate: string,
    endDate: string,
  ): Observable<OrderStatsResponse> {
    let params = new HttpParams();
    params = params.set('startDate', startDate);
    params = params.set('endDate', endDate);
    return this.http
      .get<OrderStatsResponse>(`${this.baseUrl}/stats/by-date`, { params })
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
