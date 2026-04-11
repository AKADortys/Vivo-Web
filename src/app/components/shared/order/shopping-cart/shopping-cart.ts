import { Component, AfterViewInit } from '@angular/core';
import { CartService } from '../../../../services/cart';
import { Observable } from 'rxjs';
import { Cart } from '../../../../class/cart';
import { AsyncPipe } from '@angular/common';
import { AlertHandler } from '../../../../services/alert-handler';
import { ConfirmOrderClientBtn } from '../confirm-order-client-btn/confirm-order-client-btn';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';
import Swal from 'sweetalert2';
import { ConfigService } from '../../../../services/config';

// Fix leaflet default icon path due to Webpack
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-shopping-cart',
  imports: [AsyncPipe, ConfirmOrderClientBtn, CurrencyPipe, FormsModule],
  templateUrl: './shopping-cart.html',
  styleUrl: './shopping-cart.scss',
})
export class ShoppingCart implements AfterViewInit {
  cart$: Observable<Cart>;
  deliveryMode: 'pickup' | 'delivery' = 'pickup';
  addressQuery: string = '';
  map: L.Map | undefined;
  marker: L.Marker | undefined;
  circle: L.Circle | undefined;
  isAddressValid: boolean = true; // par defaut vrai pour "pickup"
  storeArea: { lat: number; lng: number; radius: number } | null = null;
  foundAddress: any = null;

  constructor(
    private cartService: CartService,
    private alertService: AlertHandler,
    private configService: ConfigService
  ) {
    this.cart$ = this.cartService.cart$;
    this.cartService.setDeliveryAddress(null); // Par défaut click & collect
  }

  ngAfterViewInit(): void {
    this.configService.storeStatus$.subscribe(config => {
      if (config.deliveryArea) {
        this.storeArea = {
          lat: config.deliveryArea.center.lat,
          lng: config.deliveryArea.center.lng,
          radius: config.deliveryArea.radiusInMeters || 2000
        };
      } else {
        // default parameters
        this.storeArea = {
          lat: 50.7436,
          lng: 3.2241,
          radius: 2000
        };
      }
      setTimeout(() => {
        if (this.deliveryMode === 'delivery' && !this.map) {
          this.initMap();
        }
      }, 100);
    });
  }

  setDeliveryMode(mode: 'pickup' | 'delivery') {
    this.deliveryMode = mode;
    if (mode === 'pickup') {
      this.cartService.setDeliveryAddress(null);
      this.isAddressValid = true; 
    } else {
      this.isAddressValid = !!this.foundAddress; 
      if (this.foundAddress) {
        this.cartService.setDeliveryAddress(this.foundAddress);
      }
      setTimeout(() => {
        if (!this.map) this.initMap();
      }, 100);
    }
  }

  initMap() {
    if (this.map) return;
    
    // Check if the container exists before initializing map
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;

    const center = L.latLng(this.storeArea?.lat || 50.7436, this.storeArea?.lng || 3.2241);

    this.map = L.map('map').setView(center, 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    this.circle = L.circle(center, {
      color: '#28a745',
      fillColor: '#28a745',
      fillOpacity: 0.2,
      radius: this.storeArea?.radius || 2000
    }).addTo(this.map);
  }

  async searchAddress() {
    if (!this.addressQuery) return;

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(this.addressQuery)}&addressdetails=1`);
      const results = await response.json();

      if (results && results.length > 0) {
        const place = results[0];
        const lat = parseFloat(place.lat);
        const lon = parseFloat(place.lon);
        const clientLatLng = L.latLng(lat, lon);

        if (this.map) {
          this.map.setView(clientLatLng, 15);
          
          if (this.marker) {
            this.marker.setLatLng(clientLatLng);
          } else {
            this.marker = L.marker(clientLatLng).addTo(this.map);
          }
        }

        const storeLatLng = L.latLng(this.storeArea?.lat || 50.7436, this.storeArea?.lng || 3.2241);
        const distance = storeLatLng.distanceTo(clientLatLng);

        const formatedAddress = {
          street: place.address?.road || this.addressQuery,
          city: place.address?.city || place.address?.town || place.address?.village || '',
          zipCode: place.address?.postcode || '',
          coordinates: { lat, lng: lon }
        };

        if (distance <= (this.storeArea?.radius || 2000)) {
          this.isAddressValid = true;
          this.foundAddress = formatedAddress;
          this.cartService.setDeliveryAddress(formatedAddress);
          Swal.fire({
            icon: 'success',
            title: 'Adresse validée',
            text: 'Vous êtes dans notre zone de livraison !',
            timer: 2000,
            showConfirmButton: false
          });
        } else {
          this.isAddressValid = false;
          this.foundAddress = null;
          this.cartService.setDeliveryAddress(null);
          Swal.fire({
            icon: 'error',
            title: 'Hors zone',
            text: 'Désolé, cette adresse est en dehors de notre zone de livraison.'
          });
        }
      } else {
         Swal.fire({
            icon: 'warning',
            title: 'Introuvable',
            text: "L'adresse demandée est introuvable."
          });
      }
    } catch (error) {
      console.error(error);
    }
  }

  updateProductQuantity(productId: string, quantity: number): void {
    this.cartService.updateItemQuantity(productId, quantity);
  }

  removeProduct(productId: string): void {
    this.alertService
      .showConfirm('Confirmer la suppression du produit du panier ?', 'Confirmation')
      .then((valid) => {
        if (valid) {
          this.cartService.removeItem(productId);
          this.alertService.showSuccess('Produit supprimé du panier', 'Produit supprimé');
        }
      });
  }

  clear(): void {
    this.alertService
      .showConfirm('Confirmer la suppression de tous les produits du panier ?', 'Confirmation')
      .then((valid) => {
        if (valid) {
          this.cartService.clearCart();
          this.alertService.showSuccess('Le panier a été vidé', 'Panier vidé');
        }
      });
  }
}
