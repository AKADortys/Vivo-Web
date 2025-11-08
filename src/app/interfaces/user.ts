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
