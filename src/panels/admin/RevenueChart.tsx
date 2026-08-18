import type { Order } from '../../types/restaurant';

interface RevenueChartProps {
  orders: Order[];
}

export default function RevenueChart({ orders }: RevenueChartProps) {
  const hourData: Record<number, number> = {};
  for (let h = 7; h <= 22; h++) hourData[h] = 0;

  orders
    .filter((o) => o.status !== 'cancelled')
    .forEach((o) => {
      const hour = o.createdAt.getHours();
      if (hourData[hour] !== undefined) {
        hourData[hour] += o.total;
      }
    });

  const chartData = Object.entries(hourData).map(([hour, total]) => ({
    hour: Number(hour),
    total,
  }));

  const maxVal = Math.max(...chartData.map((d) => d.total), 1);

  return (
    <div className="bg-white dark:bg-brand-brown-light/40 rounded-xl border border-brand-primary/20 p-4">
      <h3 className="font-heading text-sm text-brand-brown/50 dark:text-brand-cream/50 mb-4 uppercase tracking-wider">
        Ingresos por Hora
      </h3>
      <div className="flex items-end gap-1 h-32">
        {chartData.map((d) => {
          const heightPct = (d.total / maxVal) * 100;
          return (
            <div key={d.hour} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full bg-brand-primary/80 hover:bg-brand-primary rounded-t transition-colors min-h-[2px]"
                style={{ height: `${heightPct}%` }}
                title={`$${d.total.toFixed(0)}`}
              />
              <span className="text-[9px] text-brand-brown/30 dark:text-brand-cream/30">
                {d.hour}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
