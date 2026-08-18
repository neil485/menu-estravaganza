import type { Table } from '../../types/restaurant';
import TableCard from './TableCard';

interface FloorMapProps {
  tables: Table[];
  selectedTableId: number | null;
  onSelectTable: (id: number) => void;
}

const zoneLabels: Record<string, string> = {
  salon: 'Salon',
  terraza: 'Terraza',
  barra: 'Barra',
};

export default function FloorMap({ tables, selectedTableId, onSelectTable }: FloorMapProps) {
  const zones = ['salon', 'terraza', 'barra'] as const;

  return (
    <div className="space-y-6">
      {zones.map((zone) => {
        const zoneTables = tables.filter((t) => t.zone === zone);
        return (
          <div key={zone}>
            <h3 className="font-heading text-sm text-brand-brown/50 dark:text-brand-cream/50 mb-2 uppercase tracking-wider">
              {zoneLabels[zone]}
            </h3>
            <div className="flex flex-wrap gap-3">
              {zoneTables.map((table) => (
                <TableCard
                  key={table.id}
                  table={table}
                  isSelected={selectedTableId === table.id}
                  onClick={() => onSelectTable(table.id)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
