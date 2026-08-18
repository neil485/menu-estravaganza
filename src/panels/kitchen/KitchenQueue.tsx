import type { Order } from '../../types/restaurant';
import OrderTicket from './OrderTicket';

interface KitchenQueueProps {
  pendingOrders: Order[];
  preparingOrders: Order[];
  readyOrders: Order[];
  onAdvance: (orderId: string) => void;
}

function Column({
  title,
  orders,
  actionLabel,
  onAction,
  accentColor,
}: {
  title: string;
  orders: Order[];
  actionLabel?: string;
  onAction?: (orderId: string) => void;
  accentColor: string;
}) {
  return (
    <div className="flex-1 min-w-[280px]">
      <div className={`flex items-center gap-2 mb-4 pb-2 border-b-2 ${accentColor}`}>
        <h3 className="font-heading text-lg text-brand-brown dark:text-brand-cream">{title}</h3>
        <span className="text-xs bg-brand-primary/10 text-brand-primary px-2 py-0.5 rounded-full font-semibold">
          {orders.length}
        </span>
      </div>
      <div className="space-y-3">
        {orders.length === 0 && (
          <p className="text-sm text-brand-brown/30 dark:text-brand-cream/30 text-center py-8">
            Sin ordenes
          </p>
        )}
        {orders.map((order) => (
          <OrderTicket
            key={order.id}
            order={order}
            onAdvance={onAction ? () => onAction(order.id) : undefined}
            actionLabel={actionLabel}
          />
        ))}
      </div>
    </div>
  );
}

export default function KitchenQueue({ pendingOrders, preparingOrders, readyOrders, onAdvance }: KitchenQueueProps) {
  return (
    <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
      <Column
        title="Pendiente"
        orders={pendingOrders}
        actionLabel="Preparar"
        onAction={onAdvance}
        accentColor="border-yellow-500"
      />
      <Column
        title="Preparando"
        orders={preparingOrders}
        actionLabel="Listo"
        onAction={onAdvance}
        accentColor="border-orange-500"
      />
      <Column
        title="Listo"
        orders={readyOrders}
        actionLabel="Entregar"
        onAction={onAdvance}
        accentColor="border-green-500"
      />
    </div>
  );
}
