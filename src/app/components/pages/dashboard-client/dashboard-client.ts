import { Component, OnInit } from '@angular/core';
import { UsersList } from '../../shared/user/users-list/users-list';
import { ProductsList } from '../../shared/product/products-list/products-list';
import { OrderList } from '../../shared/order/order-list/order-list';
import { OrderStats } from '../../shared/order/order-stats/order-stats.component';
import { UserStatsComponent } from '../../shared/user/user-stats/user-stats.component';
import { ConfigService, StoreConfig, PlannedClosure } from '../../../services/config';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AlertHandler } from '../../../services/alert-handler';
import { OptionsComponent } from '../../shared/config/options/options.component';

@Component({
  selector: 'app-dashboard-client',
  imports: [UsersList, ProductsList, OrderList, OrderStats, UserStatsComponent, OptionsComponent, FormsModule, DatePipe],
  templateUrl: './dashboard-client.html',
  styleUrl: './dashboard-client.scss',
})
export class DashboardClient implements OnInit {
  currentView: string = 'users';

  constructor(
    private configService: ConfigService,
    private alertHandler: AlertHandler
  ) { }

  storeConfig: StoreConfig = {
    isStoreOpen: true,
    openingHours: [],
    plannedClosures: [],
    // Legacy support init
    closingSchedule: { start: null, end: null },
    reason: ''
  };

  daysOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

  newClosure: Partial<PlannedClosure> = {
    start: '',
    end: '',
    reason: ''
  };

  ngOnInit() {
    this.loadConfig();
  }

  loadConfig() {
    this.configService.getConfig().subscribe((res: any) => {
      if (res.data) {
        this.storeConfig = res.data;

        // Ensure openingHours has all days if empty (migration/init)
        if (!this.storeConfig.openingHours || this.storeConfig.openingHours.length === 0) {
          this.storeConfig.openingHours = this.daysOfWeek.map((_, index) => ({
            dayOfWeek: index,
            isOpen: true,
            morning: { start: '09:00', end: '12:00' },
            afternoon: { start: '14:00', end: '18:00' }
          }));
        }

        if (!this.storeConfig.plannedClosures) this.storeConfig.plannedClosures = [];
        if (!this.storeConfig.deliveryArea) {
          this.storeConfig.deliveryArea = { center: { lat: 50.7436, lng: 3.2241 }, radiusInMeters: 2000 };
        }
      }
    });
  }

  saveConfig() {
    this.alertHandler.showConfirm('Voulez-vous vraiment mettre à jour la configuration du magasin ?', 'Confirmation')
      .then((confirm: boolean) => {
        if (!confirm) return;

        this.configService.updateConfig(this.storeConfig).subscribe({
          next: (res: any) => {
            this.alertHandler.showSuccess('Configuration mise à jour avec succès', 'Succès');
            if (res.data) {
              this.storeConfig = res.data;
              // Ensure arrays exist after save
              if (!this.storeConfig.openingHours) this.storeConfig.openingHours = [];
              if (!this.storeConfig.plannedClosures) this.storeConfig.plannedClosures = [];
              if (!this.storeConfig.deliveryArea) {
                this.storeConfig.deliveryArea = { center: { lat: 50.7436, lng: 3.2241 }, radiusInMeters: 2000 };
              }
            }
          },
          error: (err: any) => {
            console.error(err);
            this.alertHandler.showError('Erreur lors de la mise à jour', 'Erreur');
          }
        });
      });
  }

  addClosure() {
    if (!this.newClosure.start || !this.newClosure.end) {
      this.alertHandler.showError('Veuillez sélectionner une date de début et de fin.', 'Erreur');
      return;
    }

    // Add to list
    this.storeConfig.plannedClosures.push({
      start: this.newClosure.start,
      end: this.newClosure.end,
      reason: this.newClosure.reason || 'Fermeture exceptionnelle'
    });

    // Reset form
    this.newClosure = { start: '', end: '', reason: '' };
  }

  removeClosure(index: number) {
    this.storeConfig.plannedClosures.splice(index, 1);
  }

  setView(view: string) {
    this.currentView = view;
  }
}
