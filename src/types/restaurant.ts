export type TableStatus = 'available' | 'occupied' | 'reserved';
export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';

export interface Table {
  id: number;
  label: string;
  seats: number;
  zone: 'salon' | 'terraza' | 'barra';
  status: TableStatus;
  x: number;
  y: number;
}

export interface OrderItem {
  menuItemId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: number;
  tableId: number;
  items: OrderItem[];
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  waiterName: string;
  total: number;
}
