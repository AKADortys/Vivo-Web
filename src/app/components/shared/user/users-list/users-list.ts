import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { User, ResponseUsers } from '../../../../interfaces/user';
import { UserService } from '../../../../services/user';
import { UserCard } from '../user-card/user-card';
import { Pagination } from '../../utils/pagination/pagination';
import { QueryHandlerBar } from '../../utils/query-handler-bar/query-handler-bar';
import { Modal } from '../../utils/modal/modal';
import { UserEdit } from '../user-edit/user-edit';
import { RegisterForm } from '../../authentification/register-form/register-form';

@Component({
  selector: 'app-users-list',
  imports: [
    UserCard,
    Pagination,
    QueryHandlerBar,
    UserEdit,
    Modal,
    RegisterForm,
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
  itemsPerPage = signal<number>(10);
  currentPage = signal<number>(1);
  totalPages = signal<number>(0);
  searchQuery = signal<string>('');
  selectedUser = signal<User | null>(null);
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
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.isLoading.set(false);
        this.errorMessage.set('Erreur lors du chargement des utilisateurs');
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

  onEditUser(user: User) {
    this.selectedUser.set(user);
    this.editModal.open();
  }

  onEditedUser() {
    this.editModal.close();
    this.loadUsers(this.currentPage(), this.itemsPerPage(), this.searchQuery());
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
