import { useState } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import { Button } from '@/app/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { 
  Package, 
  Users, 
  ShoppingBag, 
  BarChart3, 
  LogOut, 
  User,
  Archive
} from 'lucide-react';
import { Order, Product } from '@/app/types/bakery';
import { PRODUCTS } from '@/app/data/products';
import { AdminProductos } from './AdminProductos';
import { AdminPedidos } from './AdminPedidos';
import { AdminEmpleados } from './AdminEmpleados';
import { AdminReportes } from './AdminReportes';
import { AdminInsumos } from './AdminInsumos';
import logo from '@/assets/PanPM.png';

// Datos de ejemplo
const INITIAL_ORDERS: Order[] = [
  {
    id: '001',
    customerName: 'María González',
    customerPhone: '555-0101',
    items: [
      { productId: '1', productName: 'Pan Francés', quantity: 5, price: 1.5 },
      { productId: '4', productName: 'Pastel de Chocolate', quantity: 1, price: 25.0 }
    ],
    total: 32.5,
    status: 'pendiente',
    deliveryDate: '2026-02-10T14:00',
    notes: 'Decoración con mensaje personalizado',
    createdAt: '2026-01-26T09:30:00'
  },
  {
    id: '002',
    customerName: 'Carlos Rodríguez',
    customerPhone: '555-0102',
    items: [
      { productId: '2', productName: 'Croissant', quantity: 12, price: 2.5 }
    ],
    total: 30.0,
    status: 'en-proceso',
    deliveryDate: '2026-02-09T10:00',
    createdAt: '2026-01-25T14:20:00'
  },
  {
    id: '003',
    customerName: 'Ana Martínez',
    customerPhone: '555-0103',
    items: [
      { productId: '5', productName: 'Pastel de Vainilla', quantity: 1, price: 22.0 }
    ],
    total: 22.0,
    status: 'completado',
    deliveryDate: '2026-02-08T16:00',
    createdAt: '2026-01-24T11:00:00'
  }
];

export function AdministradorDashboard() {
  const { user, logout } = useAuth();
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [employeeCount] = useState(3); // Total de empleados
  const [insumoCount] = useState(6); // Total de insumos

  // Stats for badges
  const pendingOrdersCount = orders.filter(o => o.status === 'pendiente').length;

  const handleCreateProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: String(products.length + 1)
    };
    setProducts([...products, newProduct]);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const handleUpdateOrder = (updatedOrder: Order) => {
    setOrders(orders.map(o => o.id === updatedOrder.id ? updatedOrder : o));
  };

  const handleDeleteOrder = (orderId: string) => {
    setOrders(orders.filter(o => o.id !== orderId));
  };

  return (
    <div className="min-h-screen bg-white">
      <Tabs defaultValue="products">
        {/* Header Sticky */}
        <header className="bg-[#402916] border-b shadow-sm sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-4">
                <img 
                  src={logo}
                  alt="Logo" 
                  className="w-10 h-10 object-cover rounded-full"
                />
                <div>
                  <h1 className="text-lg font-bold text-white">
                    Panadería Milagro
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-white" />
                  <span className="font-medium text-white">{user?.name}</span>
                  <span className="text-xs bg-white text-[#402916] px-2 py-0.5 rounded-full">
                    Admin
                  </span>
                </div>
                <Button variant="ghost" size="sm" onClick={logout} className="bg-white text-red-600 border border-red-600 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all">
                  <LogOut className="w-4 h-4 mr-2" />
                  Salir
                </Button>
              </div>
            </div>

            {/* Navigation Tabs inline in Header */}
            <div className="flex items-center mt-2">
              <TabsList className="w-full justify-start border-0 bg-transparent h-auto p-0 gap-6 overflow-x-auto">
                <TabsTrigger 
                  value="products" 
                  className="flex items-center gap-2 py-2 px-4 data-[state=active]:bg-transparent data-[state=active]:border-b-4 data-[state=active]:border-white data-[state=active]:shadow-none data-[state=active]:text-white text-white hover:bg-white/20 transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Productos
                  <span className="ml-1 bg-white text-[#402916] text-xs px-2 py-0.5 rounded-full font-medium">
                    {products.length}
                  </span>
                </TabsTrigger>
                <TabsTrigger 
                  value="orders" 
                  className="flex items-center gap-2 py-2 px-4 data-[state=active]:bg-transparent data-[state=active]:border-b-4 data-[state=active]:border-white data-[state=active]:shadow-none data-[state=active]:text-white text-white hover:bg-white/20 transition-colors"
                >
                  <Package className="w-4 h-4" />
                  Pedidos
                  <span className="ml-1 bg-white text-[#402916] text-xs px-2 py-0.5 rounded-full font-medium">
                    {orders.length}
                  </span>
                </TabsTrigger>
                <TabsTrigger 
                  value="employees" 
                  className="flex items-center gap-2 py-2 px-4 data-[state=active]:bg-transparent data-[state=active]:border-b-4 data-[state=active]:border-white data-[state=active]:shadow-none data-[state=active]:text-white text-white hover:bg-white/20 transition-colors"
                >
                  <Users className="w-4 h-4" />
                  Empleados
                  <span className="ml-1 bg-white text-[#402916] text-xs px-2 py-0.5 rounded-full font-medium">
                    {employeeCount}
                  </span>
                </TabsTrigger>
                <TabsTrigger 
                  value="inventory" 
                  className="flex items-center gap-2 py-2 px-4 data-[state=active]:bg-transparent data-[state=active]:border-b-4 data-[state=active]:border-white data-[state=active]:shadow-none data-[state=active]:text-white text-white hover:bg-white/20 transition-colors"
                >
                  <Archive className="w-4 h-4" />
                  Insumos
                  <span className="ml-1 bg-white text-[#402916] text-xs px-2 py-0.5 rounded-full font-medium">
                    {insumoCount}
                  </span>
                </TabsTrigger>
                <TabsTrigger 
                  value="reports" 
                  className="flex items-center gap-2 py-2 px-4 data-[state=active]:bg-transparent data-[state=active]:border-b-4 data-[state=active]:border-white data-[state=active]:shadow-none data-[state=active]:text-white text-white hover:bg-white/20 transition-colors"
                >
                  <BarChart3 className="w-4 h-4" />
                  Reportes
                </TabsTrigger>
              </TabsList>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <TabsContent value="products" className="mt-0">
            <AdminProductos
              products={products}
              onCreate={handleCreateProduct}
              onUpdate={handleUpdateProduct}
              onDelete={handleDeleteProduct}
            />
          </TabsContent>

          <TabsContent value="orders" className="mt-0">
            <AdminPedidos
              orders={orders}
              onUpdate={handleUpdateOrder}
              onDelete={handleDeleteOrder}
            />
          </TabsContent>

          <TabsContent value="employees" className="mt-0">
            <AdminEmpleados />
          </TabsContent>

          <TabsContent value="inventory" className="mt-0">
            <AdminInsumos />
          </TabsContent>

          <TabsContent value="reports" className="mt-0">
            <AdminReportes orders={orders} products={products} />
          </TabsContent>
        </main>
      </Tabs>
    </div>
  );
}
