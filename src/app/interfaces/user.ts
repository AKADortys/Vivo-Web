export interface User {
  readonly _id: string;
  name: string;
  lastName: string;
  mail: string;
  phone: string;
  role: string;
  isActive: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly __v: number;
}

export interface NewUser {
  name: string;
  lastName: string;
  mail: string;
  phone: string;
  password: string;
}

export interface UpdateUser {
  name?: string;
  lastName?: string;
  mail?: string;
  phone?: string;
  password?: string;
  role?: string;
  isActive?: boolean;
}

export interface ResponseUser {
  message: string;
  data?: User;
}

export interface ResponseUsers {
  message: string;
  data?: PaginatedUsers;
}

export interface PaginatedUsers {
  users: User[];
  total: number;
  page: number;
  totalPages: number;
}

export interface UserFilter {
  search?: string;
  isActive?: boolean;
  startDate?: string | null;
  endDate?: string | null;
  pageSize?: number;
}

export interface UserStats {
  usersByOrderCount: UserOrderCount[];
  usersByMoneySpent: UserMoneySpent[];
  newUsers: number;
  activeUserRate: ActiveUserRate;
}

export interface UserOrderCount {
  _id: string;
  name: string;
  lastName: string;
  ordersCount: number;
}

export interface UserMoneySpent {
  _id: string;
  name: string;
  lastName: string;
  totalSpent: number;
}

export interface ActiveUserRate {
  totalUsers: number;
  activeUsers: number;
  activeRate: number;
}

export interface ResponseUserStats {
  message: string;
  data: UserStats;
}

