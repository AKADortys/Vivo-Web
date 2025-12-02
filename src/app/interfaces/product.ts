export interface Product {
  _id: string;
  label: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
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
export interface ProductFilter {
  search?: string;
  category?: string;
  available?: boolean;
  minPrice?: number | string;
  maxPrice?: number | string;
  label?: string;
  startDate?: string | Date;
  endDate?: string | Date;
  pageSize?: number;
}
