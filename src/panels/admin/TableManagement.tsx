import type { Table, TableStatus } from '../../types/restaurant';

interface TableManagementProps {
  tables: Table[];
  onUpdateStatus: (tableId: number, status: TableStatus) => void;
}

const statusConfig: Record<TableStatus, { label: string; color: string; bg: string }> = {
  available: { label: 'Disponible', color: 'text-green-700 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/30' },
  occupied: { label: 'Ocupada', color: 'text-red-700 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900/30' },
  reserved: { label: 'Reservada', color: 'text-yellow-700 dark:text-yellow-400', bg: 'bg-yellow-100 dark:bg-yellow-900/30' },
};

const zoneLabels: Record<string, string> = {
  salon: 'Salon',
  terraza: 'Terraza',
  barra: 'Barra',
};

const statuses: TableStatus[] = ['available', 'occupied', 'reserved'];

export default function TableManagement({ tables, onUpdateStatus }: TableManagementProps) {
  const zones = ['salon', 'terraza', 'barra'] as const;

  return (
    <div className="bg-white dark:bg-brand-brown-light/40 rounded-xl border border-brand-primary/20 p-4">
      <h3 className="font-heading text-sm text-brand-brown/50 dark:text-brand-cream/50 mb-4 uppercase tracking-wider">
        Gestion de Mesas
      </h3>
      <div className="space-y-5">
        {zones.map((zone) => {
          const zoneTables = tables.filter((t) => t.zone === zone);
          return (
            <div key={zone}>
              <h4 className="font-heading text-sm text-brand-brown dark:text-brand-cream mb-2">
                {zoneLabels[zone]}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {zoneTables.map((table) => {
                  const cfg = statusConfig[table.status];
                  return (
                    <div
                      key={table.id}
                      className={`rounded-lg p-3 border border-brand-primary/10 ${cfg.bg}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-heading text-brand-brown dark:text-brand-cream">
                          {table.label}
                        </span>
                        <span className={`text-xs font-medium ${cfg.color}`}>
                          {cfg.label}
                        </span>
                      </div>
                      <p className="text-xs text-brand-brown/50 dark:text-brand-cream/50 mb-2">
                        {table.seats} asientos
                      </p>
                      <div className="flex gap-1">
                        {statuses
                          .filter((s) => s !== table.status)
                          .map((s) => (
                            <button
                              key={s}
                              onClick={() => onUpdateStatus(table.id, s)}
                              className="text-[10px] px-2 py-0.5 rounded-full bg-brand-primary/10 text-brand-primary dark:text-brand-primary-light hover:bg-brand-primary/20 transition-colors cursor-pointer"
                            >
                              {statusConfig[s].label}
                            </button>
                          ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
