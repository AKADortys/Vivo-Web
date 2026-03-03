import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../services/cart';

@Component({
  selector: 'app-order-success',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './order-success.html',
  styleUrl: './order-success.scss'
})
export class OrderSuccess implements OnInit {

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    // Dès que la page s'affiche, on vide le panier de l'utilisateur
    this.cartService.clearCart();
  }

}
