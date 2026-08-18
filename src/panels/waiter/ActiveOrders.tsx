import type { Order } from '../../types/restaurant';

interface ActiveOrdersProps {
  orders: Order[];
}

const statusBadge: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  preparing: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  ready: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  delivered: 'bg-gray-100 text-gray-600 dark:bg-gray-800/30 dark:text-gray-400',
  cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
};

const statusLabels: Record<string, string> = {
  pending: 'Pendiente',
  preparing: 'Preparando',
  ready: 'Listo',
  delivered: 'Entregado',
  cancelled: 'Cancelado',
};

export default function ActiveOrders({ orders }: ActiveOrdersProps) {
  const activeOrders = orders.filter((o) => !['delivered', 'cancelled'].includes(o.status));

  if (activeOrders.length === 0) {
    return (
      <p className="text-sm text-brand-brown/30 dark:text-brand-cream/30 text-center py-4">
        Sin ordenes activas
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {activeOrders.map((order) => (
        <div
          key={order.id}
          className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-brand-brown-light/40
            border border-brand-primary/10"
        >
          <div>
            <span className="font-heading text-sm text-brand-primary">#{order.orderNumber}</span>
            <span className="ml-2 text-xs text-brand-brown/50 dark:text-brand-cream/50">
              Mesa {order.tableId}
            </span>
            <span className="ml-2 text-xs text-brand-brown/40 dark:text-brand-cream/40">
              {order.items.length} items &middot; ${order.total.toFixed(2)}
            </span>
          </div>
          <span className={`text-xs px-2 py-0.5 rounded-full ${statusBadge[order.status]}`}>
            {statusLabels[order.status]}
          </span>
        </div>
      ))}
    </div>
  );
}
