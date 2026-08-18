# Extravaganza Restaurant & Bar - Alcance del Proyecto

## MVP Entregado

### Menu Digital
- Catalogo completo de platillos organizado por categorias
- Buscador de platillos por nombre
- Imagenes y descripciones detalladas
- Modal de detalle por platillo
- Dark mode / Light mode
- Boton de WhatsApp para contacto directo
- Sistema de reservaciones

### Panel de Mesero
- Mapa visual de mesas por zona (salon, terraza, barra)
- Estado de mesas en tiempo real (disponible, ocupada, reservada)
- Creador de ordenes con seleccion de items del menu
- Vista de ordenes activas por mesa

### Panel de Cocina
- Tablero kanban con flujo de ordenes: Pendiente -> Preparando -> Listo -> Entregado
- Tickets de orden con detalle de items y cantidades
- Actualizacion de estado con un click

### Panel de Administracion
- Dashboard con 8 KPIs: ordenes activas, mesas ocupadas, ventas del dia, ticket promedio, ordenes pendientes, ordenes canceladas, total ordenes, mesas disponibles
- Tabla de ordenes con filtros por estado y filas expandibles (detalle de items)
- Resumen diario: ingresos, desglose por estado, items mas pedidos, horas pico
- Gestion de mesas: vista por zona con cambio de estado
- Vista de inventario con niveles de stock
- Grafica de ingresos por hora

---

## Fase 2 (Propuesta Futura)

### Autenticacion y Roles
- Login para meseros, cocina y administrador
- Permisos diferenciados por rol
- Sesiones seguras

### Backend Persistente
- Base de datos para ordenes, menu, mesas e inventario
- API REST o GraphQL
- Hosting del servidor

### Tiempo Real
- WebSocket para sincronizacion entre paneles
- Notificaciones push a cocina cuando llega una orden
- Actualizacion automatica del estado de mesas

### Editor de Menu
- Agregar, editar y eliminar platillos desde el panel de admin
- Subir imagenes de platillos
- Gestionar categorias y precios

### Impresion de Tickets
- Integracion con impresora termica
- Tickets de cocina y de cuenta para el cliente

### Reportes Exportables
- Reportes de ventas en PDF y Excel
- Filtros por rango de fecha
- Graficas detalladas de rendimiento

### Multi-idioma
- Soporte para menu en espanol e ingles
- Cambio de idioma desde la interfaz
