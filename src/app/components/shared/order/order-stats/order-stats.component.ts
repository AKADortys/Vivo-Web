import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../../../services/order.service';
import { OrderStatsData, OrderStatsResponse } from '../../../../interfaces/order';

@Component({
    selector: 'app-order-stats',
    standalone: true,
    imports: [CommonModule, CurrencyPipe, FormsModule],
    templateUrl: './order-stats.component.html',
    styleUrl: './order-stats.component.scss',
})
export class OrderStats implements OnInit {
    private orderService = inject(OrderService);
    stats = signal<OrderStatsData | null>(null);
    errorMessage = signal<string>('');
    startDate = signal<string>('');
    endDate = signal<string>('');

    ngOnInit(): void {
        this.loadGeneralStats();
    }

    loadGeneralStats(): void {
        this.orderService.getOrderStats().subscribe({
            next: (response: OrderStatsResponse) => {
                this.stats.set(response.data);
                this.errorMessage.set('');
            },
            error: (err) => {
                console.error('Error fetching order stats', err);
                this.errorMessage.set('Impossible de charger les statistiques.');
            },
        });
    }

    filterByDate(): void {
        if (this.startDate() && this.endDate()) {
            this.orderService
                .getOrderStatsByDate(this.startDate(), this.endDate())
                .subscribe({
                    next: (response: OrderStatsResponse) => {
                        this.stats.set(response.data);
                        this.errorMessage.set('');
                    },
                    error: (err) => {
                        console.error('Error fetching order stats by date', err);
                        this.errorMessage.set(
                            'Impossible de charger les statistiques pour cette période.',
                        );
                    },
                });
        }
    }

    resetFilter(): void {
        this.startDate.set('');
        this.endDate.set('');
        this.loadGeneralStats();
    }
}
