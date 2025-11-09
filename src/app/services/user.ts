// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  NewUser,
  UpdateUser,
  ResponseUser,
  ResponseUsers,
} from '../interfaces/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly baseUrl = `http://localhost:3000/users`;

  constructor(private http: HttpClient) {}

  getUsers(page = 1, limit = 10): Observable<ResponseUsers> {
    return this.http
      .get<ResponseUsers>(`${this.baseUrl}?page=${page}&limit=${limit}`)
      .pipe(catchError(this.handleError));
  }

  getUserById(id: string): Observable<ResponseUser> {
    return this.http
      .get<ResponseUser>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  createUser(user: Partial<NewUser>): Observable<ResponseUser> {
    return this.http
      .post<ResponseUser>(this.baseUrl, user)
      .pipe(catchError(this.handleError));
  } //

  updateUser(id: string, user: Partial<UpdateUser>): Observable<ResponseUser> {
    return this.http
      .put<ResponseUser>(`${this.baseUrl}/${id}`, user)
      .pipe(catchError(this.handleError));
  }

  deleteUser(id: string): Observable<ResponseUser> {
    return this.http
      .delete<ResponseUser>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('HTTP Error:', error.message || error);
    return throwError(() => error);
  }
}
