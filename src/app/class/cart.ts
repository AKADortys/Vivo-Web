import { Product } from '../interfaces/product';

export class Cart {
  products: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  productsDetails: any[];
  totalPrice: number;
  userId: string;
  deliveryAddress?: string;

  constructor(
    userId: string,
    products: Cart['products'] = [],
    productsDetails: [] = []
  ) {
    this.userId = userId;
    this.products = products;
    this.productsDetails = productsDetails;
    this.totalPrice = 0;
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.totalPrice = this.products.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  addItem(product: Product, quantity = 1): void {
    if (quantity < 1) {
      throw new Error('La quantité doit être supérieure à 0.');
    }

    const item = this.products.find((p) => p.productId === product._id);

    if (item) {
      item.quantity += quantity;
    } else {
      this.products.push({
        productId: product._id,
        quantity,
        price: product.price,
      });
      this.productsDetails.push({ ...product, quantity });
    }

    this.calculateTotal();
  }

  updateItemQuantity(productId: string, quantity: number): void {
    if (quantity < 1) {
      this.removeItem(productId);
      return;
    }

    const item = this.products.find((p) => p.productId === productId);
    if (!item) {
      return;
    }

    item.quantity = quantity;
    this.calculateTotal();
  }

  removeItem(productId: string): void {
    this.products = this.products.filter((p) => p.productId !== productId);
    this.productsDetails = this.productsDetails.filter(
      (p) => p._id !== productId
    );
    this.calculateTotal();
  }

  clearCart(): void {
    this.products = [];
    this.productsDetails = [];
    this.totalPrice = 0;
  }

  getTotalItems(): number {
    return this.products.reduce((sum, item) => sum + item.quantity, 0);
  }

  setDeliveryAddress(address: string): void {
    this.deliveryAddress = address;
  }

  merge(cart: Cart): void {
    cart.products.forEach((item) => {
      const existing = this.products.find(
        (p) => p.productId === item.productId
      );

      if (existing) {
        existing.quantity += item.quantity;
      } else {
        this.products.push({ ...item });
        const detail = cart.productsDetails.find(
          (p) => p._id === item.productId
        );
        if (detail) {
          this.productsDetails.push(detail);
        }
      }
    });

    this.calculateTotal();
  }
}
