import { Component, inject, OnInit } from '@angular/core';
import { UsersList } from '../../shared/user/users-list/users-list';
import { ProductsList } from '../../shared/product/products-list/products-list';
import { OrderList } from '../../shared/order/order-list/order-list';
import { OrderStats } from '../../shared/order/order-stats/order-stats.component';
import { UserStatsComponent } from '../../shared/user/user-stats/user-stats.component';
import { ConfigService, StoreConfig } from '../../../services/config';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AlertHandler } from '../../../services/alert-handler';

@Component({
  selector: 'app-dashboard-client',
  imports: [UsersList, ProductsList, OrderList, OrderStats, UserStatsComponent, FormsModule, DatePipe],
  templateUrl: './dashboard-client.html',
  styleUrl: './dashboard-client.scss',
})
export class DashboardClient implements OnInit {
  currentView: string = 'users';
  private configService = inject(ConfigService);
  private alertHandler = inject(AlertHandler);

  storeConfig: StoreConfig = {
    isStoreOpen: true,
    closingSchedule: { start: null, end: null },
    reason: ''
  };

  ngOnInit() {
    this.loadConfig();
  }

  loadConfig() {
    this.configService.getConfig().subscribe(res => {
      if (res.data) {
        this.storeConfig = res.data;
      }
    });
  }

  saveConfig() {
    this.alertHandler.showConfirm('Voulez-vous vraiment mettre à jour la configuration du magasin ?', 'Confirmation')
      .then((confirm) => {
        if (!confirm) return;

        this.configService.updateConfig(this.storeConfig).subscribe({
          next: (res) => {
            this.alertHandler.showSuccess('Configuration mise à jour avec succès', 'Succès');
            if (res.data) this.storeConfig = res.data;
          },
          error: (err) => {
            console.error(err);
            this.alertHandler.showError('Erreur lors de la mise à jour', 'Erreur');
          }
        });
      });
  }

  setView(view: string) {
    this.currentView = view;
  }
}
