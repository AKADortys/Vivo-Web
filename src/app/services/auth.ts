import { Injectable } from '@angular/core';
import {
  AuthentificationRequest,
  AuthentificationResponse,
} from '../interfaces/auth';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { environment } from '../../environements/environement';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = `${environment.apiUrl}auth`;

  constructor(private http: HttpClient) {}

  Login(
    credentials: AuthentificationRequest
  ): Observable<AuthentificationResponse> {
    return this.http
      .post<AuthentificationResponse>(`${this.baseUrl}/login`, credentials)
      .pipe(catchError(this.handleError));
  } //

  Logout(): Observable<void> {
    return this.http
      .post<void>(`${this.baseUrl}/logout`, {})
      .pipe(catchError(this.handleError));
  } //

  ResetPassword(mail: string): Observable<void> {
    return this.http
      .post<void>(`${this.baseUrl}/password-reset`, { mail })
      .pipe(catchError(this.handleError));
  } //

  PasswordChange(token: string | null, newPassword: string): Observable<void> {
    return this.http
      .patch<void>(`${this.baseUrl}/password-recovery`, {
        token,
        newPassword,
      })
      .pipe(catchError(this.handleError));
  }

  confirmEmail(token: string): Observable<void> {
    return this.http
      .patch<void>(`${this.baseUrl}/confirm-account`, { token })
      .pipe(catchError(this.handleError));
  } //

  private handleError(error: any) {
    console.error('HTTP Error:', error.message || error);
    return throwError(() => error);
  }
}
