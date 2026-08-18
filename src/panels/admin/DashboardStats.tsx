interface StatCardProps {
  label: string;
  value: string;
  icon: string;
}

function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-brand-brown-light/40 rounded-xl p-5 border border-brand-primary/20 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-brand-brown/50 dark:text-brand-cream/50 uppercase tracking-wider mb-1">
            {label}
          </p>
          <p className="font-heading text-2xl text-brand-brown dark:text-brand-cream">{value}</p>
        </div>
        <span className="text-2xl">{icon}</span>
      </div>
    </div>
  );
}

interface DashboardStatsProps {
  activeOrders: number;
  occupiedTables: string;
  dailySales: string;
  avgTicket: string;
  cancelledOrders: number;
  pendingOrders: number;
  totalOrders: number;
  availableTables: number;
}

export default function DashboardStats({
  activeOrders,
  occupiedTables,
  dailySales,
  avgTicket,
  cancelledOrders,
  pendingOrders,
  totalOrders,
  availableTables,
}: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard label="Ordenes Activas" value={String(activeOrders)} icon="📋" />
      <StatCard label="Mesas Ocupadas" value={occupiedTables} icon="🪑" />
      <StatCard label="Ventas del Dia" value={dailySales} icon="💰" />
      <StatCard label="Ticket Promedio" value={avgTicket} icon="🧾" />
      <StatCard label="Ordenes Pendientes" value={String(pendingOrders)} icon="⏳" />
      <StatCard label="Ordenes Canceladas" value={String(cancelledOrders)} icon="❌" />
      <StatCard label="Total Ordenes" value={String(totalOrders)} icon="📦" />
      <StatCard label="Mesas Disponibles" value={String(availableTables)} icon="✅" />
    </div>
  );
}
