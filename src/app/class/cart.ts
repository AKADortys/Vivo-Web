import { Product } from '../interfaces/product';

export class Cart {
  productsDetails: any[];
  totalPrice: number;
  userId: string;
  deliveryAddress?: {
    street: string;
    city: string;
    zipCode: string;
    coordinates: { lat: number; lng: number };
  } | any;

  constructor(userId: string, productsDetails: [] = []) {
    this.userId = userId;
    this.productsDetails = productsDetails;
    this.totalPrice = 0;
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.totalPrice = this.productsDetails.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  addItem(product: Product, quantity = 1): void {
    if (quantity < 1) {
      throw new Error('La quantité doit être supérieure à 0.');
    }

    const item = this.productsDetails.find((p) => p._id === product._id);

    if (item) {
      this.updateItemQuantity(product._id, item.quantity + quantity);
    } else {
      this.productsDetails.push({ ...product, quantity });
    }

    this.calculateTotal();
  }

  updateItemQuantity(productId: string, quantity: number): void {
    if (quantity < 1) {
      this.removeItem(productId);
      return;
    }

    const item = this.productsDetails.find((p) => p._id === productId);
    if (!item) {
      return;
    }

    item.quantity = quantity;
    this.calculateTotal();
  }

  removeItem(productId: string): void {
    this.productsDetails = this.productsDetails.filter(
      (p) => p._id !== productId
    );
    this.calculateTotal();
  }

  clearCart(): void {
    this.productsDetails = [];
    this.totalPrice = 0;
  }

  getTotalItems(): number {
    return this.productsDetails.reduce((sum, item) => sum + item.quantity, 0);
  }

  setDeliveryAddress(address: any): void {
    this.deliveryAddress = address;
  }

  merge(cart: Cart): void {
    cart.productsDetails.forEach((item) => {
      const existing = this.productsDetails.find((p) => p._id === item._id);

      if (existing) {
        existing.quantity = item.quantity;
      } else {
        this.productsDetails.push({ ...item });
      }
    });

    this.calculateTotal();
  }
}
