import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { Table, Order, OrderStatus, TableStatus } from '../types/restaurant';
import { initialTables, initialOrders } from '../data/seedData';

interface RestaurantState {
  tables: Table[];
  orders: Order[];
  nextOrderNumber: number;
}

type RestaurantAction =
  | { type: 'ADD_ORDER'; payload: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'> }
  | { type: 'UPDATE_ORDER_STATUS'; payload: { orderId: string; status: OrderStatus } }
  | { type: 'UPDATE_TABLE_STATUS'; payload: { tableId: number; status: TableStatus } };

function restaurantReducer(state: RestaurantState, action: RestaurantAction): RestaurantState {
  switch (action.type) {
    case 'ADD_ORDER': {
      const now = new Date();
      const newOrder: Order = {
        ...action.payload,
        id: `ord-${Date.now()}`,
        orderNumber: state.nextOrderNumber,
        createdAt: now,
        updatedAt: now,
      };
      const updatedTables = state.tables.map((t) =>
        t.id === action.payload.tableId ? { ...t, status: 'occupied' as TableStatus } : t
      );
      return {
        ...state,
        orders: [...state.orders, newOrder],
        tables: updatedTables,
        nextOrderNumber: state.nextOrderNumber + 1,
      };
    }
    case 'UPDATE_ORDER_STATUS': {
      const updatedOrders = state.orders.map((o) =>
        o.id === action.payload.orderId
          ? { ...o, status: action.payload.status, updatedAt: new Date() }
          : o
      );
      // If delivered or cancelled, check if table has other active orders
      if (action.payload.status === 'delivered' || action.payload.status === 'cancelled') {
        const order = state.orders.find((o) => o.id === action.payload.orderId);
        if (order) {
          const tableHasActiveOrders = updatedOrders.some(
            (o) =>
              o.tableId === order.tableId &&
              o.id !== order.id &&
              !['delivered', 'cancelled'].includes(o.status)
          );
          if (!tableHasActiveOrders) {
            const updatedTables = state.tables.map((t) =>
              t.id === order.tableId ? { ...t, status: 'available' as TableStatus } : t
            );
            return { ...state, orders: updatedOrders, tables: updatedTables };
          }
        }
      }
      return { ...state, orders: updatedOrders };
    }
    case 'UPDATE_TABLE_STATUS': {
      const updatedTables = state.tables.map((t) =>
        t.id === action.payload.tableId ? { ...t, status: action.payload.status } : t
      );
      return { ...state, tables: updatedTables };
    }
    default:
      return state;
  }
}

const initialState: RestaurantState = {
  tables: initialTables,
  orders: initialOrders,
  nextOrderNumber: initialOrders.length + 1,
};

interface RestaurantContextValue {
  state: RestaurantState;
  dispatch: React.Dispatch<RestaurantAction>;
}

const RestaurantContext = createContext<RestaurantContextValue | null>(null);

export function RestaurantProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(restaurantReducer, initialState);
  return (
    <RestaurantContext.Provider value={{ state, dispatch }}>
      {children}
    </RestaurantContext.Provider>
  );
}

export function useRestaurant() {
  const ctx = useContext(RestaurantContext);
  if (!ctx) throw new Error('useRestaurant must be used within RestaurantProvider');
  return ctx;
}
