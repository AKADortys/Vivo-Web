// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  NewUser,
  UpdateUser,
  ResponseUser,
  ResponseUsers,
  UserFilter,
} from '../interfaces/user';
import { environment } from '../../environements/environement';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly baseUrl = `${environment.apiUrl}users`;

  constructor(private http: HttpClient) {}

  getUsers(
    page = 1,
    limit = 10,
    filter: UserFilter
  ): Observable<ResponseUsers> {
    let params = new HttpParams();

    params = params.set('page', page.toString());
    params = params.set('limit', limit.toString());

    // Ajouter les filtres optionnels si les valeurs existent
    if (filter.search) {
      params = params.set('search', filter.search);
    }

    // Le statut isActive est un boolean, donc nous le convertissons en chaîne.
    // Il doit être vérifié explicitement contre null/undefined car false est une valeur valide.
    if (filter.isActive !== null && filter.isActive !== undefined) {
      params = params.set('isActive', filter.isActive.toString());
    }

    if (filter.startDate) {
      params = params.set('startDate', filter.startDate);
    }

    if (filter.endDate) {
      params = params.set('endDate', filter.endDate);
    }

    return this.http
      .get<ResponseUsers>(this.baseUrl, { params: params })
      .pipe(catchError(this.handleError));
  } //

  getUserById(id: string): Observable<ResponseUser> {
    return this.http
      .get<ResponseUser>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  } //

  createUser(user: Partial<NewUser>): Observable<ResponseUser> {
    return this.http
      .post<ResponseUser>(this.baseUrl, user)
      .pipe(catchError(this.handleError));
  } //

  updateUser(id: string, user: Partial<UpdateUser>): Observable<ResponseUser> {
    return this.http
      .put<ResponseUser>(`${this.baseUrl}/${id}`, user)
      .pipe(catchError(this.handleError));
  } //

  deleteUser(id: string): Observable<ResponseUser> {
    return this.http
      .delete<ResponseUser>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  } //

  private handleError(error: any) {
    console.error('HTTP Error:', error.message || error);
    return throwError(() => error);
  }
}
