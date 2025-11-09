// src/app/interceptors/credentials.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CredentialsInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Clone la requête et active withCredentials
    const reqWithCredentials = request.clone({
      withCredentials: true, // Permet d'envoyer les cookies
    });
    return next.handle(reqWithCredentials);
  }
}
