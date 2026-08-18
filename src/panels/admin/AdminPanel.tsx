import { useRestaurant } from '../../context/RestaurantContext';
import DashboardStats from './DashboardStats';
import OrdersTable from './OrdersTable';
import InventoryView from './InventoryView';
import RevenueChart from './RevenueChart';
import TableManagement from './TableManagement';
import DailySummary from './DailySummary';
import type { TableStatus } from '../../types/restaurant';

export default function AdminPanel() {
  const { state, dispatch } = useRestaurant();

  const activeOrders = state.orders.filter(
    (o) => !['delivered', 'cancelled'].includes(o.status)
  ).length;

  const pendingOrders = state.orders.filter((o) => o.status === 'pending').length;
  const cancelledOrders = state.orders.filter((o) => o.status === 'cancelled').length;
  const totalOrders = state.orders.length;

  const occupiedTables = state.tables.filter((t) => t.status === 'occupied').length;
  const availableTables = state.tables.filter((t) => t.status === 'available').length;
  const totalTables = state.tables.length;

  const deliveredOrders = state.orders.filter((o) => o.status === 'delivered');
  const dailySales = state.orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.total, 0);

  const avgTicket = deliveredOrders.length > 0
    ? deliveredOrders.reduce((sum, o) => sum + o.total, 0) / deliveredOrders.length
    : 0;

  const handleUpdateTableStatus = (tableId: number, status: TableStatus) => {
    dispatch({ type: 'UPDATE_TABLE_STATUS', payload: { tableId, status } });
  };

  return (
    <div className="min-h-screen bg-brand-cream dark:bg-brand-dark p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="font-heading text-2xl md:text-3xl text-brand-primary">
          Administracion
        </h1>

        <DashboardStats
          activeOrders={activeOrders}
          occupiedTables={`${occupiedTables}/${totalTables}`}
          dailySales={`$${dailySales.toFixed(2)}`}
          avgTicket={`$${avgTicket.toFixed(2)}`}
          cancelledOrders={cancelledOrders}
          pendingOrders={pendingOrders}
          totalOrders={totalOrders}
          availableTables={availableTables}
        />

        <OrdersTable orders={state.orders} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DailySummary orders={state.orders} />
          <TableManagement tables={state.tables} onUpdateStatus={handleUpdateTableStatus} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InventoryView />
          <RevenueChart orders={state.orders} />
        </div>
      </div>
    </div>
  );
}
