export interface OrderProduct {
  _id: string;
  productId: {
    _id: string;
    label: string;
  } | null;
  quantity: number;
  price: number;
}

export interface OrderUserId {
  _id: string;
  mail: string;
}

export interface Order {
  readonly _id: string;
  userId: OrderUserId | null;
  products: OrderProduct[];
  deliveryAddress: string;
  status: string;
  totalPrice: number;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly __v: number;
}

export interface NewOrder {
  userId: string;
  products: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  deliveryAddress?: string;
}

export interface UpdateOrder {
  products?: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  deliveryAddress?: string;
  status?: string;
}

export interface PaginatedOrders {
  orders: Order[];
  total: number;
  totalPages: number;
  page: number;
}

export interface ResponseOrder {
  message: string;
  data?: Order;
}

export interface ResponseOrders {
  message: string;
  data?: PaginatedOrders;
}
export interface OrderFilters {
  status?: string;
  productId?: string;
  minQty?: number;
  minPrice?: number;
  maxPrice?: number;
  startDate?: string;
  endDate?: string;
  pageSize?: number;
  address?: string;
}
