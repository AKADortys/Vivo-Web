import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { User, ResponseUsers, UserFilter } from '../../../../interfaces/user';
import { UserService } from '../../../../services/user';
import { UserCard } from '../user-card/user-card';
import { Pagination } from '../../utils/pagination/pagination';
import { Modal } from '../../utils/modal/modal';
import { UserEdit } from '../user-edit/user-edit';
import { RegisterForm } from '../../authentification/register-form/register-form';
import { QueryHandleUser } from '../query-handle-user/query-handle-user';
import { filter } from 'rxjs';

@Component({
  selector: 'app-users-list',
  imports: [
    UserCard,
    Pagination,
    UserEdit,
    Modal,
    RegisterForm,
    QueryHandleUser,
  ],
  standalone: true,
  templateUrl: './users-list.html',
  styleUrl: './users-list.scss',
})
export class UsersList implements OnInit {
  @ViewChild('editModal') editModal!: Modal;
  @ViewChild('addModal') addModal!: Modal;
  users = signal<User[]>([]);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  totalItems = signal<number>(0);
  currentPage = signal<number>(1);
  totalPages = signal<number>(0);
  selectedUser = signal<User | null>(null);
  paginatedFilter = signal<UserFilter>({
    search: '',
    isActive: true,
    startDate: null,
    endDate: null,
    pageSize: 10,
  });
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  resetProps() {
    this.isLoading.set(true);
    this.errorMessage.set(null);
  }
  loadUsers(
    page: number = this.currentPage(),
    limit: number = this.paginatedFilter().pageSize!,
    filter: UserFilter = this.paginatedFilter()
  ) {
    this.resetProps();
    this.userService.getUsers(page, limit, filter).subscribe({
      next: (response: ResponseUsers) => {
        this.users.set(response?.data?.users || []);
        this.currentPage.set(response.data?.page || 1);
        this.paginatedFilter().pageSize = limit;
        this.totalItems.set(response.data?.total || this.users().length);
        this.totalPages.set(
          Math.ceil(this.totalItems() / this.paginatedFilter().pageSize!)
        );
        this.isLoading.set(false);
      },
      error: (error) => {
        this.isLoading.set(false);
        this.errorMessage.set('Error loading users:' + error.error.message);
      },
    });
  }
  onFilterChange(filter: UserFilter) {
    this.paginatedFilter.set(filter);
    this.currentPage.set(1);
    this.loadUsers();
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.loadUsers();
  }

  onEditUser(user: User) {
    this.selectedUser.set(user);
    this.editModal.open();
  }

  onEditedUser() {
    this.editModal.close();
    this.loadUsers();
  }

  onAddUser() {
    this.addModal.open();
  }

  onAddedUser() {
    this.addModal.close();
    this.loadUsers();
  }

  public onRemoveUser(): void {
    this.loadUsers();
  }
}
