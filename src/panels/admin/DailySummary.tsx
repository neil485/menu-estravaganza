import type { Order } from '../../types/restaurant';

interface DailySummaryProps {
  orders: Order[];
}

export default function DailySummary({ orders }: DailySummaryProps) {
  const nonCancelled = orders.filter((o) => o.status !== 'cancelled');
  const revenue = nonCancelled.reduce((sum, o) => sum + o.total, 0);

  // Desglose por status
  const statusCounts: Record<string, number> = {};
  for (const o of orders) {
    statusCounts[o.status] = (statusCounts[o.status] || 0) + 1;
  }

  const statusLabels: Record<string, string> = {
    pending: 'Pendiente',
    preparing: 'Preparando',
    ready: 'Listo',
    delivered: 'Entregado',
    cancelled: 'Cancelado',
  };

  // Items mas pedidos
  const itemCounts: Record<string, { name: string; qty: number }> = {};
  for (const o of nonCancelled) {
    for (const item of o.items) {
      if (itemCounts[item.menuItemId]) {
        itemCounts[item.menuItemId].qty += item.quantity;
      } else {
        itemCounts[item.menuItemId] = { name: item.name, qty: item.quantity };
      }
    }
  }
  const topItems = Object.values(itemCounts)
    .sort((a, b) => b.qty - a.qty)
    .slice(0, 5);

  // Horas pico
  const hourCounts: Record<number, number> = {};
  for (const o of orders) {
    const hour = o.createdAt.getHours();
    hourCounts[hour] = (hourCounts[hour] || 0) + 1;
  }
  const peakHours = Object.entries(hourCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([hour, count]) => ({ hour: Number(hour), count }));

  return (
    <div className="bg-white dark:bg-brand-brown-light/40 rounded-xl border border-brand-primary/20 p-4">
      <h3 className="font-heading text-sm text-brand-brown/50 dark:text-brand-cream/50 mb-4 uppercase tracking-wider">
        Resumen del Dia
      </h3>

      <div className="space-y-4">
        {/* Revenue */}
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-brand-brown/70 dark:text-brand-cream/70">Ingresos Totales</span>
          <span className="font-heading text-xl text-brand-primary">${revenue.toFixed(2)}</span>
        </div>

        {/* Status breakdown */}
        <div>
          <p className="text-xs text-brand-brown/50 dark:text-brand-cream/50 mb-2 uppercase tracking-wider">
            Ordenes por Estado
          </p>
          <div className="space-y-1">
            {Object.entries(statusLabels).map(([key, label]) => (
              <div key={key} className="flex justify-between text-sm">
                <span className="text-brand-brown/60 dark:text-brand-cream/60">{label}</span>
                <span className="text-brand-brown dark:text-brand-cream font-medium">{statusCounts[key] || 0}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top items */}
        <div>
          <p className="text-xs text-brand-brown/50 dark:text-brand-cream/50 mb-2 uppercase tracking-wider">
            Mas Pedidos
          </p>
          <div className="space-y-1">
            {topItems.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-brand-brown/60 dark:text-brand-cream/60 truncate mr-2">{item.name}</span>
                <span className="text-brand-brown dark:text-brand-cream font-medium shrink-0">x{item.qty}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Peak hours */}
        {peakHours.length > 0 && (
          <div>
            <p className="text-xs text-brand-brown/50 dark:text-brand-cream/50 mb-2 uppercase tracking-wider">
              Horas Pico
            </p>
            <div className="flex gap-2">
              {peakHours.map(({ hour, count }) => (
                <span
                  key={hour}
                  className="text-xs px-2 py-1 rounded-full bg-brand-primary/10 text-brand-primary dark:text-brand-primary-light"
                >
                  {hour}:00 ({count} ord.)
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
