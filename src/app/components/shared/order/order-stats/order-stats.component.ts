import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../../../services/order.service';
import { OrderStatsData, OrderStatsResponse, RevenueByDate } from '../../../../interfaces/order';

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
    isLoading = signal<boolean>(true);

    /** Max revenue value across all days — used to normalise bar heights */
    maxRevenue = computed<number>(() => {
        const data = this.stats();
        if (!data?.revenueByDate?.length) return 1;
        return Math.max(...data.revenueByDate.map(d => d.total));
    });

    /** Height percentage (0–100) for each bar */
    barHeight(day: RevenueByDate): number {
        const max = this.maxRevenue();
        return max > 0 ? Math.round((day.total / max) * 100) : 0;
    }

    /** Short label for the x-axis (DD/MM) */
    dayLabel(isoDate: string): string {
        const [, month, day] = isoDate.split('-');
        return `${day}/${month}`;
    }

    /** CSS class for the badge of each order status */
    statusClass(status: string): string {
        const map: Record<string, string> = {
            'Payée':          'badge-paid',
            'En attente':     'badge-pending',
            'En préparation': 'badge-preparing',
            'Terminée':       'badge-done',
            'Refusée':        'badge-refused',
            'Annulée':        'badge-cancelled',
        };
        return map[status] ?? 'badge-default';
    }

    ngOnInit(): void {
        this.loadGeneralStats();
    }

    loadGeneralStats(): void {
        this.isLoading.set(true);
        this.orderService.getOrderStats().subscribe({
            next: (response: OrderStatsResponse) => {
                this.stats.set(response.data);
                this.errorMessage.set('');
                this.isLoading.set(false);
            },
            error: (err) => {
                console.error('Error fetching order stats', err);
                this.errorMessage.set('Impossible de charger les statistiques.');
                this.isLoading.set(false);
            },
        });
    }

    filterByDate(): void {
        if (this.startDate() && this.endDate()) {
            this.isLoading.set(true);
            this.orderService
                .getOrderStatsByDate(this.startDate(), this.endDate())
                .subscribe({
                    next: (response: OrderStatsResponse) => {
                        this.stats.set(response.data);
                        this.errorMessage.set('');
                        this.isLoading.set(false);
                    },
                    error: (err) => {
                        console.error('Error fetching order stats by date', err);
                        this.errorMessage.set(
                            'Impossible de charger les statistiques pour cette période.',
                        );
                        this.isLoading.set(false);
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
