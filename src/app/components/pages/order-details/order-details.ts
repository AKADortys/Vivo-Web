import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { FormatDatePipe } from '../../../pipes/format-date-pipe';

@Component({
  selector: 'app-order-details',
  imports: [CommonModule, FormatDatePipe, RouterLink],
  templateUrl: './order-details.html',
  styleUrl: './order-details.scss'
})
export class OrderDetailsComponent implements OnInit {
  order = signal<any>(null);
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchOrderDetails(id);
    } else {
      this.error.set('ID de commande manquant');
      this.isLoading.set(false);
    }
  }

  fetchOrderDetails(id: string) {
    this.isLoading.set(true);
    this.orderService.getOrderDetailById(id).subscribe({
      next: (response: any) => {
        this.order.set(response.data);
        this.isLoading.set(false);
      },
      error: (err: any) => {
        this.error.set(err.message || 'Erreur lors du chargement des détails de la commande');
        this.isLoading.set(false);
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Payée': return 'text-bg-primary';
      case 'En préparation': return 'text-bg-success';
      case 'Refusée': return 'text-bg-danger';
      case 'Annulée': return 'text-bg-secondary';
      case 'Terminée': return 'text-bg-info';
      default: return 'text-bg-light';
    }
  }
}
