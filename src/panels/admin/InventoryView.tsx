const inventory = [
  { name: 'Pollo', stock: 85 },
  { name: 'Res', stock: 60 },
  { name: 'Cerdo', stock: 70 },
  { name: 'Camarones', stock: 35 },
  { name: 'Corvina', stock: 45 },
  { name: 'Pasta', stock: 90 },
  { name: 'Arroz', stock: 95 },
  { name: 'Frijoles', stock: 80 },
  { name: 'Queso', stock: 55 },
  { name: 'Tortillas', stock: 20 },
];

function barColor(stock: number): string {
  if (stock >= 60) return 'bg-green-500';
  if (stock >= 30) return 'bg-yellow-500';
  return 'bg-red-500';
}

export default function InventoryView() {
  return (
    <div className="bg-white dark:bg-brand-brown-light/40 rounded-xl border border-brand-primary/20 p-4">
      <h3 className="font-heading text-sm text-brand-brown/50 dark:text-brand-cream/50 mb-4 uppercase tracking-wider">
        Inventario
      </h3>
      <div className="space-y-3">
        {inventory.map((item) => (
          <div key={item.name}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-brand-brown dark:text-brand-cream">{item.name}</span>
              <span className="text-brand-brown/40 dark:text-brand-cream/40">{item.stock}%</span>
            </div>
            <div className="h-2 bg-brand-cream-dark dark:bg-brand-dark rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${barColor(item.stock)}`}
                style={{ width: `${item.stock}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
