import type { Table } from '../../types/restaurant';

interface TableCardProps {
  table: Table;
  isSelected: boolean;
  onClick: () => void;
}

const statusColors: Record<string, string> = {
  available: 'border-green-500 bg-green-500/10',
  occupied: 'border-brand-primary bg-brand-primary/10',
  reserved: 'border-blue-400 bg-blue-400/10',
};

const statusLabels: Record<string, string> = {
  available: 'Libre',
  occupied: 'Ocupada',
  reserved: 'Reservada',
};

export default function TableCard({ table, isSelected, onClick }: TableCardProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl p-3 border-2 transition-all duration-200 cursor-pointer text-center min-w-[80px]
        ${statusColors[table.status]}
        ${isSelected ? 'ring-2 ring-brand-primary shadow-lg scale-105' : 'hover:scale-102 hover:shadow-md'}
      `}
    >
      <span className="font-heading text-lg text-brand-brown dark:text-brand-cream block">
        {table.label}
      </span>
      <span className="text-xs text-brand-brown/50 dark:text-brand-cream/50 block">
        {table.seats} asientos
      </span>
      <span className="text-[10px] mt-1 block font-semibold uppercase tracking-wide text-brand-brown/40 dark:text-brand-cream/40">
        {statusLabels[table.status]}
      </span>
    </button>
  );
}
