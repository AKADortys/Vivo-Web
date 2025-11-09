import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root',
})
export class AlertHandler {
  constructor(private authService: AuthService) {}

  showSuccess(message: string, title: string = 'Succès') {
    Swal.fire({
      icon: 'success',
      title,
      text: message,
    });
  }

  showError(message: string, title: string = 'Erreur') {
    Swal.fire({
      icon: 'error',
      title,
      text: message,
    });
  }

  showInfo(message: string, title: string = 'Information') {
    Swal.fire({
      icon: 'info',
      title,
      text: message,
    });
  }

  showWarning(message: string, title: string = 'Attention') {
    Swal.fire({
      icon: 'warning',
      title,
      text: message,
    });
  }
}
