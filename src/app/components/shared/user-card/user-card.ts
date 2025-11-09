import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertHandler } from '../../../services/alert-handler';
import { UserService } from '../../../services/user';
import { ResponseUser, User } from '../../../interfaces/user';

@Component({
  selector: 'app-user-card',
  imports: [CommonModule],
  templateUrl: './user-card.html',
  styleUrl: './user-card.scss',
})
export class UserCard {
  isLoading: boolean = false;
  user: User | null = null;
  constructor(
    private alertHandler: AlertHandler,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.fetchUserData();
  }

  private fetchUserData() {
    this.isLoading = true;
    this.userService.getUserById('68f91ba98ae076714add591d').subscribe({
      next: (user: ResponseUser) => {
        this.user = user.data || null;
        this.isLoading = false;
      },
      error: (error: any) => {
        this.alertHandler.showError(
          'Error fetching user data',
          error.error.message
        );
        this.isLoading = false;
      },
    });
  }
}
