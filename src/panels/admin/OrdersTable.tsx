import { useState } from 'react';
import type { Order, OrderStatus } from '../../types/restaurant';

interface OrdersTableProps {
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

const allStatuses: (OrderStatus | 'all')[] = ['all', 'pending', 'preparing', 'ready', 'delivered', 'cancelled'];

function formatTime(date: Date): string {
  return date.toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' });
}

export default function OrdersTable({ orders }: OrdersTableProps) {
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = filter === 'all' ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="bg-white dark:bg-brand-brown-light/40 rounded-xl border border-brand-primary/20 overflow-hidden">
      <div className="p-4 border-b border-brand-primary/10 flex items-center gap-2 overflow-x-auto scrollbar-hide">
        {allStatuses.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1 text-xs rounded-full transition-colors cursor-pointer whitespace-nowrap
              ${filter === s
                ? 'bg-brand-primary text-white'
                : 'text-brand-brown/50 dark:text-brand-cream/50 hover:bg-brand-primary/10'
              }`}
          >
            {s === 'all' ? 'Todas' : statusLabels[s]}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-brand-primary/10 text-brand-brown/50 dark:text-brand-cream/50">
              <th className="text-left p-3 font-heading text-xs uppercase">Orden</th>
              <th className="text-left p-3 font-heading text-xs uppercase">Mesa</th>
              <th className="text-left p-3 font-heading text-xs uppercase">Mesero</th>
              <th className="text-left p-3 font-heading text-xs uppercase">Items</th>
              <th className="text-left p-3 font-heading text-xs uppercase">Total</th>
              <th className="text-left p-3 font-heading text-xs uppercase">Creada</th>
              <th className="text-left p-3 font-heading text-xs uppercase">Estado</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => (
              <>
                <tr
                  key={order.id}
                  onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                  className="border-b border-brand-primary/5 hover:bg-brand-cream/50 dark:hover:bg-brand-dark/30 cursor-pointer"
                >
                  <td className="p-3 font-heading text-brand-primary">#{order.orderNumber}</td>
                  <td className="p-3 text-brand-brown dark:text-brand-cream">{order.tableId}</td>
                  <td className="p-3 text-brand-brown/60 dark:text-brand-cream/60">{order.waiterName}</td>
                  <td className="p-3 text-brand-brown/60 dark:text-brand-cream/60">{order.items.length}</td>
                  <td className="p-3 text-brand-brown dark:text-brand-cream">${order.total.toFixed(2)}</td>
                  <td className="p-3 text-brand-brown/50 dark:text-brand-cream/50 text-xs">{formatTime(order.createdAt)}</td>
                  <td className="p-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${statusBadge[order.status]}`}>
                      {statusLabels[order.status]}
                    </span>
                  </td>
                </tr>
                {expandedId === order.id && (
                  <tr key={`${order.id}-detail`} className="border-b border-brand-primary/5">
                    <td colSpan={7} className="p-0">
                      <div className="bg-brand-cream/30 dark:bg-brand-dark/40 px-6 py-3">
                        <div className="flex items-center gap-4 mb-2 text-xs text-brand-brown/50 dark:text-brand-cream/50">
                          <span>Creada: {formatTime(order.createdAt)}</span>
                          <span>Actualizada: {formatTime(order.updatedAt)}</span>
                        </div>
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="text-brand-brown/40 dark:text-brand-cream/40">
                              <th className="text-left py-1">Item</th>
                              <th className="text-right py-1">Cant.</th>
                              <th className="text-right py-1">Precio</th>
                              <th className="text-right py-1">Subtotal</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.items.map((item, i) => (
                              <tr key={i} className="text-brand-brown/70 dark:text-brand-cream/70">
                                <td className="py-1">{item.name}</td>
                                <td className="text-right py-1">{item.quantity}</td>
                                <td className="text-right py-1">${item.unitPrice.toFixed(2)}</td>
                                <td className="text-right py-1">${(item.quantity * item.unitPrice).toFixed(2)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="p-8 text-center text-brand-brown/30 dark:text-brand-cream/30">
                  Sin ordenes
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
