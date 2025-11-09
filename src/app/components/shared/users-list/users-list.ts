import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { User, ResponseUsers } from '../../../interfaces/user';
import { UserService } from '../../../services/user';
import { UserCard } from '../user-card/user-card';
import { Pagination } from '../pagination/pagination';

@Component({
  selector: 'app-users-list',
  imports: [CommonModule, UserCard, Pagination],
  standalone: true,
  templateUrl: './users-list.html',
  styleUrl: './users-list.scss',
})
export class UsersList {
  users: User[] | null = [];
  isLoading: boolean = false;
  errorMessage: string | null = null;

  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;
  totalItems: number = 0;
  searchText: string = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  resetProps() {
    this.users = null;
    this.isLoading = true;
    this.errorMessage = null;
  }

  loadUsers(
    page: number = 1,
    limit: number = this.pageSize,
    search: string = ''
  ) {
    this.resetProps();
    this.userService.getUsers(page, limit, search).subscribe({
      next: (response: ResponseUsers) => {
        this.users = response?.data?.users || [];
        this.currentPage = response.data?.page || 1;
        this.pageSize = limit;
        this.totalItems = response.data?.total || this.users.length;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.isLoading = false;
        this.errorMessage = 'Erreur lors du chargement des utilisateurs';
      },
    });
  }

  onPageChange(event: { search: string; page: number; limit: number }) {
    this.searchText = event.search;
    this.currentPage = event.page;
    this.pageSize = event.limit;
    this.loadUsers(this.currentPage, this.pageSize, this.searchText);
  }
}
