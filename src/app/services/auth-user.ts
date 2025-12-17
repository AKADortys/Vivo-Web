import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  private userSubject: BehaviorSubject<User | null>;
  public user$: Observable<User | null>;

  constructor() {
    const storedUser = localStorage.getItem('Vivo-web-user');
    const initialUser = storedUser ? JSON.parse(storedUser) : null;

    this.userSubject = new BehaviorSubject<User | null>(initialUser);
    this.user$ = this.userSubject.asObservable();
  }

  // Setter : met à jour le user + localStorage + stream
  setUser(user: User | null): void {
    this.userSubject.next(user);
    if (user) {
      localStorage.setItem('Vivo-web-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('Vivo-web-user');
    }
  }

  // Getter classique
  getUser(): User | null {
    return this.userSubject.value;
  }

  // Vérifie si un utilisateur est connecté
  isAuthenticated(): boolean {
    return !!this.userSubject.value;
  }

  isAdmin(): boolean {
    const user = this.userSubject.value;
    return user?.role === 'admin';
  }

  // Déconnexion
  logout(): void {
    this.setUser(null);
  }
}
