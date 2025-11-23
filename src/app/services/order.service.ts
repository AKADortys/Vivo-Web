import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  NewOrder,
  ResponseOrder,
  ResponseOrders,
  UpdateOrder,
} from '../interfaces/order';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly baseUrl = `http://localhost:3000/orders`;
  constructor(private readonly http: HttpClient) {}

  private handleError(error: any) {
    console.error('HTTP Error:', error.message || error);
    return throwError(() => error);
  }
  getOrders(page = 1, limit = 10, search = ''): Observable<ResponseOrders> {
    return this.http
      .get<ResponseOrders>(
        `${this.baseUrl}?page=${page}&limit=${limit}&search=${search}`
      )
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
    order: Partial<UpdateOrder>
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
}
