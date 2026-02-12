# Sistema de Gestión de Panadería - Credenciales de Acceso

## Usuarios de Demostración

El sistema cuenta con tres roles diferentes, cada uno con su propia interfaz y permisos:

### 👨‍💼 Administrador
**Email:** `admin@panaderia.com`  
**Contraseña:** `admin123`

**Permisos:**
- CRUD completo de productos (crear, editar, eliminar)
- Gestión completa de pedidos
- Gestión de empleados (crear, editar, activar/desactivar)
- Gestión de insumos y alertas de stock
- Reportes y análisis de ventas
- Productos más vendidos
- Estadísticas generales

---

### 👨‍🍳 Empleado
**Email:** `empleado@panaderia.com`  
**Contraseña:** `empleado123`

**Permisos:**
- Ver solicitudes de pedidos pendientes
- Aceptar o rechazar pedidos
- Cambiar estado de pedidos (En Preparación → Completado)
- Generar tickets de pedidos en PDF
- Consultar detalles completos de pedidos

---

### 🛍️ Cliente
**Email:** `cliente@mail.com`  
**Contraseña:** `cliente123`

**Permisos:**
- Ver catálogo de productos con filtros
- Agregar productos al carrito
- Gestionar cantidades en el carrito
- Crear pedidos con fecha y hora de entrega
- Consultar estado de pedidos
- Descargar comprobantes de pedidos

---

## Características del Sistema

### Estados de Pedidos
- **Pendiente**: Pedido recibido, esperando aprobación del empleado
- **En Proceso**: Pedido aceptado y en preparación
- **Completado**: Pedido listo y entregado
- **Cancelado**: Pedido rechazado por el empleado

### Funcionalidades Principales

#### Para el Cliente
- Catálogo de productos con imágenes
- Búsqueda y filtrado por categorías
- Carrito de compras con gestión de cantidades
- Formulario de pedido con fecha/hora de entrega
- Seguimiento de pedidos en tiempo real

#### Para el Empleado
- Dashboard con solicitudes pendientes
- Sistema de aceptación/rechazo de pedidos
- Gestión de estados de pedidos activos
- Generación de tickets PDF

#### Para el Administrador
- Dashboard completo con estadísticas
- CRUD de productos con categorías
- Gestión de empleados
- Control de insumos con alertas de stock bajo
- Reportes de ventas y productos más vendidos
- Gráficas de estado de pedidos

---

## Inicio Rápido

1. En la pantalla de login, puedes hacer clic en cualquiera de los tres botones de usuario demo para autocompletar las credenciales
2. Haz clic en "Iniciar Sesión"
3. Explora las funcionalidades según tu rol

---

## Notas Técnicas

- Los datos se almacenan en `localStorage` para persistencia local
- Las imágenes de productos provienen de Unsplash
- El sistema es completamente responsive
- Notificaciones tipo toast para feedback del usuario
- Interfaz moderna con Tailwind CSS
