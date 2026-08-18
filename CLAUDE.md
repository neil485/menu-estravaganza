# Extravaganza Restaurant & Bar - Sistema de Gestion

## Descripcion

Sistema digital para Extravaganza Restaurant & Bar (Corinto, El Salvador). Incluye menu digital, panel de mesero, panel de cocina y panel de administracion. Frontend-only con estado en memoria (React Context + useReducer).

## Tech Stack

- **React 19** + **TypeScript 6**
- **Vite 8** (build tool)
- **Tailwind CSS 4** (via @tailwindcss/vite plugin)
- **React Router 7** (HashRouter para deploy estatico)
- **react-icons** (iconos)

## Comandos

```bash
npm run dev      # Servidor de desarrollo
npm run build    # tsc -b && vite build
npm run lint     # ESLint
npm run preview  # Preview del build
```

## Arquitectura

### Paneles (rutas)

| Ruta | Componente | Descripcion |
|------|-----------|-------------|
| `/` | `LandingPage` | Selector de paneles |
| `/menu` | `MenuPanel` | Menu digital publico (categorias, busqueda, dark mode, reservaciones) |
| `/mesero` | `WaiterPanel` | Mapa de mesas, creador de ordenes, ordenes activas |
| `/cocina` | `KitchenPanel` | Tablero kanban (pendiente -> preparando -> listo -> entregado) |
| `/admin` | `AdminPanel` | KPIs, tabla de ordenes, gestion de mesas, resumen diario, inventario, grafica |

### Estado global

- `RestaurantContext` (`src/context/RestaurantContext.tsx`): useReducer con estado de mesas y ordenes
- Acciones: `ADD_ORDER`, `UPDATE_ORDER_STATUS`, `UPDATE_TABLE_STATUS`
- Datos iniciales en `src/data/seedData.ts`

### Estructura de archivos

```
src/
  components/    # Componentes del menu digital (Header, MenuCard, MenuGrid, etc.)
  context/       # RestaurantContext (estado global)
  data/          # menuData.ts (platillos), seedData.ts (mesas/ordenes iniciales)
  hooks/         # useTheme
  layout/        # LandingPage, PanelSwitcher
  panels/
    menu/        # MenuPanel
    waiter/      # WaiterPanel, FloorMap, OrderBuilder, ActiveOrders, TableCard
    kitchen/     # KitchenPanel, KitchenQueue, OrderTicket
    admin/       # AdminPanel, DashboardStats, OrdersTable, InventoryView, RevenueChart, TableManagement, DailySummary
  types/         # menu.ts, restaurant.ts
```

## Convenciones

- Componentes funcionales con export default
- Tailwind para todos los estilos (sin CSS modules)
- Dark mode con clases `dark:` de Tailwind
- Tipografia: font-heading para titulos, colores brand-* definidos en CSS
- Datos del menu en espanol
- Sin backend: todo el estado vive en React Context
