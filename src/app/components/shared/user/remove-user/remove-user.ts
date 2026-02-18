import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { UserService } from '../../../../services/user';
import { AlertHandler } from '../../../../services/alert-handler';

@Component({
  selector: 'app-remove-user',
  imports: [],
  templateUrl: './remove-user.html',
  styleUrl: './remove-user.scss',
})
export class RemoveUser {
  @Input() userId?: string;
  @Output() removed = new EventEmitter<boolean>(false);
  isLoading = signal<boolean>(false);

  constructor(
    private httpService: UserService,
    private alertHandler: AlertHandler
  ) { }

  onRemove() {
    if (this.userId) {
      this.isLoading.set(true);
      this.alertHandler
        .showConfirm('Voulez vous vraiment supprimer cet utilisateur ?')
        .then((confirm) => {
          if (!confirm) {
            this.isLoading.set(false);
            return;
          }
          this.httpService.deleteUser(this.userId!).subscribe({
            next: (response) => {
              this.alertHandler.showSuccess(response.message);
              this.isLoading.set(false);
              this.removed.emit(true);
            },
            error: (error) => {
              this.alertHandler.showError(error.message);
              this.isLoading.set(false);
            },
          });
        });
    }
  }
}
