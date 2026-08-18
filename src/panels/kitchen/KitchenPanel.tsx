import { useRestaurant } from '../../context/RestaurantContext';
import type { OrderStatus } from '../../types/restaurant';
import KitchenQueue from './KitchenQueue';

const nextStatus: Record<string, OrderStatus> = {
  pending: 'preparing',
  preparing: 'ready',
  ready: 'delivered',
};

export default function KitchenPanel() {
  const { state, dispatch } = useRestaurant();

  const pendingOrders = state.orders.filter((o) => o.status === 'pending');
  const preparingOrders = state.orders.filter((o) => o.status === 'preparing');
  const readyOrders = state.orders.filter((o) => o.status === 'ready');

  function handleAdvance(orderId: string) {
    const order = state.orders.find((o) => o.id === orderId);
    if (!order) return;
    const next = nextStatus[order.status];
    if (!next) return;
    dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { orderId, status: next } });
  }

  return (
    <div className="min-h-screen bg-brand-cream dark:bg-brand-dark p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-heading text-2xl md:text-3xl text-brand-primary mb-6">
          Cocina
        </h1>
        <KitchenQueue
          pendingOrders={pendingOrders}
          preparingOrders={preparingOrders}
          readyOrders={readyOrders}
          onAdvance={handleAdvance}
        />
      </div>
    </div>
  );
}
