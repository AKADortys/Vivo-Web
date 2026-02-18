import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService, StoreConfig } from '../../../services/config';
import * as L from 'leaflet';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, AfterViewInit {
    private configService = inject(ConfigService);
    storeConfig: StoreConfig | null = null;
    private map: L.Map | undefined;

    // J'ai corrigé 'Dimanche' en premier si tu veux commencer par Lundi,
    // mais pour l'affichage 'getDay()' de JS, 0 est Dimanche, donc ton ordre est correct pour un mapping d'index.
    daysOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

    ngOnInit() {
        this.configService.storeStatus$.subscribe((config: StoreConfig) => {
            this.storeConfig = config;
        });
    }

    ngAfterViewInit(): void {
        // Petit timeout pour s'assurer que le DOM est parfaitement rendu
        setTimeout(() => {
            this.initMap();
        }, 0);
    }

    private initMap(): void {
        const lat = 50.72721;
        const lng = 3.30341;

        // Zoom réduit à 18 pour être sûr d'avoir des tuiles
        this.map = L.map('map').setView([lat, lng], 18);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        }).addTo(this.map);

        const marker = L.marker([lat, lng]).addTo(this.map);
        marker.bindPopup("<b>Vivo</b><br>Nous sommes ici !").openPopup();
    }
}