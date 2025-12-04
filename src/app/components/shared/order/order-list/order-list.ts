import { Component, OnInit, signal } from '@angular/core';
import { Order, ResponseOrders } from '../../../../interfaces/order';
import { OrderService } from '../../../../services/order.service';
import { Pagination } from '../../utils/pagination/pagination';
import { OrderCard } from '../order-card/order-card';
import { OrderTable } from '../order-table/order-table';

@Component({
  selector: 'app-order-list',
  imports: [OrderCard],
  templateUrl: './order-list.html',
  styleUrl: './order-list.scss',
})
export class OrderList implements OnInit {
  constructor(private readonly orderService: OrderService) {}
  orders = signal<Order[]>([]);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  totalItems = signal<number>(0);
  currentPage = signal<number>(1);
  totalPages = signal<number>(0);

  ngOnInit(): void {
    this.loadOrders();
  }
  resetProps() {
    this.isLoading.set(true);
    this.errorMessage.set(null);
  }

  loadOrders(page: number = this.currentPage()) {
    this.resetProps();
    this.orderService.getOrders(page, 30).subscribe({
      next: (response: ResponseOrders) => {
        console.log(response);
        this.orders.set(response?.data?.orders || []);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading orders:', err);
      },
    });
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.loadOrders();
  }
}
