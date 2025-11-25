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

  showConfirm(
    message: string,
    title: string = 'En êtes-vous certain ?'
  ): Promise<boolean> {
    return Swal.fire({
      title,
      text: message,
      showDenyButton: true,
      confirmButtonText: 'Oui',
      denyButtonText: 'Non',
    }).then((result) => result.isConfirmed);
  }

  resetPassword(): void {
    Swal.fire({
      title: 'Indiquez votre adresse mail',
      icon: 'question',
      input: 'email',
      inputAttributes: { autocapitalize: 'off' },
      showCancelButton: true,
      confirmButtonText: 'Envoyer ma demande',
      showLoaderOnConfirm: true,
      cancelButtonText: 'Retour',
      allowOutsideClick: () => !Swal.isLoading(),
      preConfirm: (mail: string) => {
        return this.authService
          .ResetPassword(mail)
          .toPromise()
          .then(
            () => {
              this.showSuccess(
                'Votre demande a été traitée, surveillez votre boîte mail',
                'Succès'
              );
              return true;
            },
            (err) => {
              this.showError(
                err.error.message || err.message,
                "Une erreur s'est produite"
              );
              return false;
            }
          );
      },
    });
  }
}
