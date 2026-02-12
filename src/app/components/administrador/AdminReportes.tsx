import { Order, Product } from '@/app/types/bakery';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  ShoppingBag,
  Package,
  XCircle,
  CheckCircle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

interface AdminReportesProps {
  orders: Order[];
  products: Product[];
}

export function AdminReportes({ orders, products }: AdminReportesProps) {
  // Estadísticas generales
  const totalOrders = orders.length;
  const acceptedOrders = orders.filter(o => o.status !== 'cancelado').length;
  const rejectedOrders = orders.filter(o => o.status === 'cancelado').length;
  const completedOrders = orders.filter(o => o.status === 'completado').length;
  const totalRevenue = orders
    .filter(o => o.status === 'completado')
    .reduce((sum, o) => sum + o.total, 0);

  // Productos más vendidos
  const productSales: Record<string, { name: string; quantity: number; revenue: number }> = {};
  
  orders
    .filter(o => o.status === 'completado')
    .forEach(order => {
      order.items.forEach(item => {
        if (!productSales[item.productId]) {
          productSales[item.productId] = {
            name: item.productName,
            quantity: 0,
            revenue: 0
          };
        }
        productSales[item.productId].quantity += item.quantity;
        productSales[item.productId].revenue += item.price * item.quantity;
      });
    });

  const topProducts = Object.values(productSales)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  // Datos para gráfica de estado de pedidos
  const statusData = [
    { name: 'Pendiente', value: orders.filter(o => o.status === 'pendiente').length, color: '#EAB308' },
    { name: 'En Proceso', value: orders.filter(o => o.status === 'en-proceso').length, color: '#22C55E' },
    { name: 'Completado', value: completedOrders, color: '#3B82F6' },
    { name: 'Cancelado', value: rejectedOrders, color: '#EF4444' }
  ].filter(item => item.value > 0);

  // Datos para gráfica de productos
  const productChartData = topProducts.map(p => ({
    name: p.name.length > 15 ? p.name.substring(0, 15) + '...' : p.name,
    ventas: p.quantity,
    ingresos: p.revenue
  }));

  return (
    <div className="space-y-6">
      {/* Título */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Reportes y Análisis
        </h2>
        <p className="text-gray-600 mt-1">
          Estadísticas generales del sistema
        </p>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total de Pedidos
            </CardTitle>
            <Package className="w-5 h-5 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{totalOrders}</div>
            <p className="text-xs text-gray-500 mt-1">
              Todos los tiempos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Pedidos Aceptados
            </CardTitle>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{acceptedOrders}</div>
            <p className="text-xs text-gray-500 mt-1">
              {totalOrders > 0 ? ((acceptedOrders / totalOrders) * 100).toFixed(1) : 0}% del total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Pedidos Rechazados
            </CardTitle>
            <XCircle className="w-5 h-5 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{rejectedOrders}</div>
            <p className="text-xs text-gray-500 mt-1">
              {totalOrders > 0 ? ((rejectedOrders / totalOrders) * 100).toFixed(1) : 0}% del total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Ingresos Totales
            </CardTitle>
            <DollarSign className="w-5 h-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              ${totalRevenue.toFixed(2)}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              De {completedOrders} pedidos completados
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Estado de pedidos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Estado de Pedidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Productos más vendidos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Productos Más Vendidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="ventas" fill="#60A5FA" name="Cantidad Vendida" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de productos más vendidos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Top 5 Productos Más Vendidos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">
                      {product.quantity} unidades vendidas
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">
                    ${product.revenue.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">Ingresos</p>
                </div>
              </div>
            ))}
            {topProducts.length === 0 && (
              <p className="text-center text-gray-500 py-8">
                No hay datos de ventas disponibles
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Motivos de rechazo */}
      {rejectedOrders > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-900">
              <XCircle className="w-5 h-5" />
              Pedidos Rechazados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {orders
                .filter(o => o.status === 'cancelado')
                .map(order => (
                  <div key={order.id} className="border-b pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">
                          Pedido #{order.id} - {order.customerName}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {order.notes || 'Sin motivo especificado'}
                        </p>
                      </div>
                      <span className="text-sm text-red-600 font-medium">
                        ${order.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
