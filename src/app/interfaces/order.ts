export interface OrderProduct {
  _id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface OrderUserId {
  _id: string;
  mail: string;
}

export interface Coordinates {
  longitude: number;
  latitude: number;
}

export interface DeliveryAddress {
  street: string;
  city: string;
  zipCode: string;
  coordinates: Coordinates | null;
}

export interface Order {
  readonly _id: string;
  userId: OrderUserId | null;
  products: OrderProduct[];
  deliveryAddress: DeliveryAddress;
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
    productName: string;
    quantity: number;
    price: number;
  }[];
  deliveryAddress?: string;
}

export interface UpdateOrder {
  products?: {
    productId: string;
    productName?: string;
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

export interface OrderStatusStat {
  _id: string;
  count: number;
}

export interface RevenueByDate {
  _id: string;   // format 'YYYY-MM-DD'
  total: number;
}

export interface OrderStatsData {
  ordersByStatus: OrderStatusStat[];
  totalOrders: number;
  totalRevenue: number;
  averageBasket: number;
  revenueByDate: RevenueByDate[];
}

export interface OrderStatsResponse {
  message: string;
  data: OrderStatsData;
}
