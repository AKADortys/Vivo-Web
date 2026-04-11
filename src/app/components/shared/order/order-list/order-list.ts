import { Component, OnInit, signal } from '@angular/core';
import {
  Order,
  OrderFilters,
  ResponseOrders,
} from '../../../../interfaces/order';
import { OrderService } from '../../../../services/order.service';
import { Pagination } from '../../utils/pagination/pagination';
import { OrderCard } from '../order-card/order-card';
import { OrderTable } from '../order-table/order-table';
import { QueryHandleOrder } from '../query-handle-order/query-handle-order';
import { SocketService } from '../../../../services/socket.service';
import { AlertHandler } from '../../../../services/alert-handler';

@Component({
  selector: 'app-order-list',
  imports: [OrderCard, OrderTable, QueryHandleOrder, Pagination],
  templateUrl: './order-list.html',
  styleUrl: './order-list.scss',
})
export class OrderList implements OnInit {
  constructor(
    private readonly orderService: OrderService,
    private readonly socketService: SocketService,
    private readonly alertHandler: AlertHandler
  ) {}
  orders = signal<Order[]>([]);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  totalItems = signal<number>(0);
  currentPage = signal<number>(1);
  totalPages = signal<number>(0);
  displayMode = signal<'card' | 'table'>('card');
  paginatedFilter = signal<OrderFilters>({ status: 'Payée', pageSize: 5 });

  ngOnInit(): void {
    this.loadOrders();

    this.socketService.listen('admin_new_order').subscribe((data: any) => {
      this.alertHandler.showSuccess('Nouvelle vente ! Une nouvelle commande a été passée.', 'Succès');
      this.loadOrders();
    });
  }
  resetProps() {
    this.isLoading.set(true);
    this.errorMessage.set(null);
  }

  loadOrders(
    page: number = this.currentPage(),
    limit: number = this.paginatedFilter().pageSize!,
    filter: OrderFilters = this.paginatedFilter()
  ) {
    this.resetProps();
    this.orderService.getOrders(page, limit, filter).subscribe({
      next: (response: ResponseOrders) => {
        this.orders.set(response?.data?.orders || []);
        this.currentPage.set(response.data?.page || 1);
        this.paginatedFilter().pageSize = limit;
        this.totalItems.set(response.data?.total || this.orders().length);
        this.totalPages.set(
          Math.ceil(this.totalItems() / this.paginatedFilter().pageSize!)
        );
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading orders:', err);
        this.errorMessage.set(err.message);
      },
    });
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.loadOrders();
  }

  setDisplayMode(mode: 'card' | 'table') {
    this.displayMode.set(mode);
  }

  onFilterChange(filter: OrderFilters) {
    this.paginatedFilter.set(filter);
    this.currentPage.set(1);
    this.loadOrders();
  }
  onFilterReset() {
    this.paginatedFilter.set({});
    this.loadOrders();
  }
}
