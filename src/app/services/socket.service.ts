import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    // Connexion au serveur Node.js
    this.socket = io(environment.apiUrl, {
      withCredentials: true,
    });
  }

  // Permet à un composant d'écouter un événement spécifique
  listen(eventName: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }

  // Permet au client de s'enregistrer dans sa "room" personnelle
  joinUserRoom(userId: string): void {
    this.socket.emit('join_user_room', userId);
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
