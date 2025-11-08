export interface Product {
  readonly _id: string;
  label: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly __v: number;
}

export interface NewProduct {
  label: string;
  description: string;
  price: number;
  category: string;
  available?: boolean;
}

export interface UpdateProduct {
  label?: string;
  description?: string;
  price?: number;
  category?: string;
  available?: boolean;
}

export interface PaginatedProducts {
  products: Product[];
  total: number;
  totalPages: number;
  page: number;
}

export interface ResponseProduct {
  message: string;
  data?: Product;
}

export interface ResponseProducts {
  message: string;
  data?: PaginatedProducts;
}
