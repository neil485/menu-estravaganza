import { useState } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import type { OrderItem } from '../../types/restaurant';
import FloorMap from './FloorMap';
import OrderBuilder from './OrderBuilder';
import ActiveOrders from './ActiveOrders';

export default function WaiterPanel() {
  const { state, dispatch } = useRestaurant();
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);
  const [waiterName] = useState('Carlos');

  const selectedTable = selectedTableId
    ? state.tables.find((t) => t.id === selectedTableId)
    : null;

  function handleSubmitOrder(items: OrderItem[]) {
    if (!selectedTableId) return;
    const total = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    dispatch({
      type: 'ADD_ORDER',
      payload: {
        tableId: selectedTableId,
        items,
        status: 'pending',
        waiterName,
        total,
      },
    });
    setSelectedTableId(null);
  }

  return (
    <div className="min-h-screen bg-brand-cream dark:bg-brand-dark p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-heading text-2xl md:text-3xl text-brand-primary mb-6">
          Panel de Mesero
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Floor map */}
          <div>
            <h2 className="font-heading text-sm text-brand-brown/50 dark:text-brand-cream/50 mb-3 uppercase tracking-wider">
              Mapa del Restaurante
            </h2>
            <FloorMap
              tables={state.tables}
              selectedTableId={selectedTableId}
              onSelectTable={setSelectedTableId}
            />
          </div>

          {/* Right: Order builder or order detail */}
          <div>
            {selectedTable && selectedTable.status === 'available' && (
              <OrderBuilder
                tableLabel={selectedTable.label}
                onSubmit={handleSubmitOrder}
                onCancel={() => setSelectedTableId(null)}
              />
            )}

            {selectedTable && selectedTable.status === 'occupied' && (
              <div className="bg-white dark:bg-brand-brown-light/40 rounded-xl border border-brand-primary/20 p-4">
                <h3 className="font-heading text-lg text-brand-primary mb-3">
                  Mesa {selectedTable.label} - Ordenes Activas
                </h3>
                <ActiveOrders orders={state.orders.filter((o) => o.tableId === selectedTable.id)} />
                <div className="mt-4 pt-3 border-t border-brand-primary/10">
                  <button
                    onClick={() => {
                      // Allow adding another order to occupied table
                      dispatch({
                        type: 'UPDATE_TABLE_STATUS',
                        payload: { tableId: selectedTable.id, status: 'available' },
                      });
                    }}
                    className="text-sm text-brand-primary hover:text-brand-primary-dark transition-colors cursor-pointer"
                  >
                    + Agregar otra orden
                  </button>
                </div>
              </div>
            )}

            {selectedTable && selectedTable.status === 'reserved' && (
              <div className="bg-white dark:bg-brand-brown-light/40 rounded-xl border border-brand-primary/20 p-6 text-center">
                <p className="text-brand-brown/50 dark:text-brand-cream/50 mb-3">Mesa reservada</p>
                <button
                  onClick={() =>
                    dispatch({
                      type: 'UPDATE_TABLE_STATUS',
                      payload: { tableId: selectedTable.id, status: 'available' },
                    })
                  }
                  className="px-4 py-2 bg-brand-primary text-white font-heading rounded-lg hover:bg-brand-primary-dark transition-colors cursor-pointer"
                >
                  Liberar Mesa
                </button>
              </div>
            )}

            {!selectedTable && (
              <div className="bg-white dark:bg-brand-brown-light/40 rounded-xl border border-brand-primary/20 p-8 text-center">
                <p className="text-brand-brown/40 dark:text-brand-cream/40">
                  Selecciona una mesa para crear o ver una orden
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom: Active orders list */}
        <div className="mt-8">
          <h2 className="font-heading text-sm text-brand-brown/50 dark:text-brand-cream/50 mb-3 uppercase tracking-wider">
            Mis Ordenes Activas
          </h2>
          <ActiveOrders orders={state.orders.filter((o) => o.waiterName === waiterName)} />
        </div>
      </div>
    </div>
  );
}
