import { Component, Input, ViewChild } from '@angular/core';
import { User } from '../../../../interfaces/user';
import { ToggleTheme } from '../../utils/toggle-theme/toggle-theme';
import { Modal } from '../../utils/modal/modal';
import { UserEdit } from '../user-edit/user-edit';
import { AuthUserService } from '../../../../services/auth-user';
import { AuthService } from '../../../../services/auth';
import { AlertHandler } from '../../../../services/alert-handler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-drop-down-menu',
  imports: [ToggleTheme, Modal, UserEdit],
  templateUrl: './user-drop-down-menu.html',
  styleUrl: './user-drop-down-menu.scss',
})
export class UserDropDownMenu {
  @Input() user!: User;
  @ViewChild(Modal) modal!: Modal;

  constructor(
    private authUser: AuthUserService,
    private authService: AuthService,
    private alertHandler: AlertHandler,
    private router: Router
  ) { }

  openModal() {
    this.modal.open();
  }

  onUserSaved() {
    this.authUser.refreshUser();
    this.modal.close();
  }

  logout(): void {
    this.authService.Logout().subscribe({
      next: () => {
        this.alertHandler.showSuccess('Déconnection réusie !', 'Succès !');
        this.authUser.logout();
        this.router.navigate(['/']);
      },
      error: (error) =>
        this.alertHandler.showError(
          error.message,
          'Erreur'
        ),
    });
  }
}
