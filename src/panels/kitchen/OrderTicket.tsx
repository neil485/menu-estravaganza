import type { Order } from '../../types/restaurant';

interface OrderTicketProps {
  order: Order;
  onAdvance?: () => void;
  actionLabel?: string;
}

function minutesAgo(date: Date): number {
  return Math.floor((Date.now() - date.getTime()) / 60000);
}

export default function OrderTicket({ order, onAdvance, actionLabel }: OrderTicketProps) {
  const mins = minutesAgo(order.createdAt);
  const isNew = order.status === 'pending' && mins < 2;

  return (
    <div
      className={`bg-white dark:bg-brand-brown-light/40 rounded-xl p-4 border
        border-brand-primary/20 shadow-sm
        ${isNew ? 'animate-pulse-gold ring-2 ring-brand-primary/50' : ''}
        transition-all duration-300`}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <span className="font-heading text-lg text-brand-primary">#{order.orderNumber}</span>
          <span className="ml-2 text-sm text-brand-brown/50 dark:text-brand-cream/50">
            Mesa {order.tableId}
          </span>
        </div>
        <span className="text-xs text-brand-brown/40 dark:text-brand-cream/40">
          {mins} min
        </span>
      </div>

      <ul className="space-y-1 mb-4">
        {order.items.map((item, i) => (
          <li key={i} className="text-sm text-brand-brown dark:text-brand-cream flex justify-between">
            <span>
              <span className="font-semibold text-brand-primary">{item.quantity}x</span>{' '}
              {item.name}
            </span>
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center">
        <span className="text-xs text-brand-brown/40 dark:text-brand-cream/40">
          {order.waiterName}
        </span>
        {onAdvance && actionLabel && (
          <button
            onClick={onAdvance}
            className="px-3 py-1.5 text-xs font-heading bg-brand-primary text-white rounded-lg
              hover:bg-brand-primary-dark transition-colors cursor-pointer"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}
