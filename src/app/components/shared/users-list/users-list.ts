import { Component, OnInit, signal } from '@angular/core';
import { User, ResponseUsers } from '../../../interfaces/user';
import { UserService } from '../../../services/user';
import { UserCard } from '../user-card/user-card';
import { Pagination } from '../pagination/pagination';
import { QueryHandlerBar } from '../query-handler-bar/query-handler-bar';

@Component({
  selector: 'app-users-list',
  imports: [UserCard, Pagination, QueryHandlerBar],
  standalone: true,
  templateUrl: './users-list.html',
  styleUrl: './users-list.scss',
})
export class UsersList implements OnInit {
  users = signal<User[]>([]);
  isLoading: boolean;
  errorMessage: string | null = null;
  totalItems = signal<number>(0);
  itemsPerPage = signal<number>(10);
  currentPage = signal<number>(1);
  totalPages = signal<number>(0);
  searchQuery = signal<string>('');
  constructor(private userService: UserService) {
    this.isLoading = false;
  }

  ngOnInit() {
    this.loadUsers();
  }

  resetProps() {
    this.isLoading = true;
    this.errorMessage = null;
  }
  loadUsers(
    page: number = this.currentPage(),
    limit: number = this.itemsPerPage(),
    search: string = ''
  ) {
    this.resetProps();
    this.userService.getUsers(page, limit, search).subscribe({
      next: (response: ResponseUsers) => {
        this.users.set(response?.data?.users || []);
        this.currentPage.set(response.data?.page || 1);
        this.itemsPerPage.set(limit);
        this.totalItems.set(response.data?.total || this.users().length);
        this.totalPages.set(Math.ceil(this.totalItems() / this.itemsPerPage()));
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.isLoading = false;
        this.errorMessage = 'Erreur lors du chargement des utilisateurs';
      },
      complete: () => {
        console.log('User loading completed.');
      },
    });
  }

  onSearchChange(query: string): void {
    this.searchQuery.set(query);
    this.loadUsers(1, this.itemsPerPage(), query);
  }

  onPageSizeChange(size: number): void {
    this.itemsPerPage.set(size);
    this.loadUsers(1, size, this.searchQuery());
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.loadUsers(page, this.itemsPerPage(), this.searchQuery());
  }
}
