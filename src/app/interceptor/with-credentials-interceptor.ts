// src/app/interceptors/credentials.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpXsrfTokenExtractor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CredentialsInterceptor implements HttpInterceptor {
  constructor(private tokenExtractor: HttpXsrfTokenExtractor) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let reqWithCredentials = request.clone({
      withCredentials: true, // Permet d'envoyer les cookies
    });

    // Angular n'ajoute pas automatiquement le token XSRF pour les requêtes cross-origin (URLs absolues)
    // Nous l'ajoutons donc manuellement ici
    const token = this.tokenExtractor.getToken();
    if (token && !request.headers.has('X-XSRF-TOKEN')) {
      reqWithCredentials = reqWithCredentials.clone({
        headers: reqWithCredentials.headers.set('X-XSRF-TOKEN', token)
      });
    }

    return next.handle(reqWithCredentials);
  }
}
