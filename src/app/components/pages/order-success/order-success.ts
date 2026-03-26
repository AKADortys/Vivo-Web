import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CartService } from '../../../services/cart';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-order-success',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './order-success.html',
  styleUrl: './order-success.scss'
})
export class OrderSuccess implements OnInit {
  private route = inject(ActivatedRoute);
  private orderService = inject(OrderService);
  private cartService = inject(CartService);
  private cdr = inject(ChangeDetectorRef);

  loading = true;
  error = false;
  errorMessage = '';
  orderStatus = '';

  ngOnInit(): void {
    // Dès que la page s'affiche, on vide le panier de l'utilisateur
    this.cartService.clearCart();

    const sessionId = this.route.snapshot.queryParamMap.get('session_id');

    if (sessionId) {
      this.verifySession(sessionId);
    } else {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  verifySession(sessionId: string): void {
    this.orderService.verifyCheckoutSession(sessionId).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success && response.data) {
          this.orderStatus = response.data.status;
          if (this.orderStatus === 'Annulée') {
            this.error = true;
            this.errorMessage = "Une rupture de stock est survenue juste après votre paiement. Votre commande a dû être annulée, mais ne vous inquiétez pas : vous avez été automatiquement remboursé(e).";
          }
        }
        this.cdr.detectChanges(); // Vital pour Zoneless !
      },
      error: (err) => {
        this.loading = false;
        this.error = true;
        this.errorMessage = "Impossible de vérifier le statut de votre paiement. Veuillez contacter notre support.";
        console.error('Erreur verification session:', err);
        this.cdr.detectChanges(); // Vital pour Zoneless !
      }
    });
  }
}
