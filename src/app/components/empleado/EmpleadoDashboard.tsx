import { useState } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import { Button } from '@/app/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Package, ClipboardList, LogOut, User } from 'lucide-react';
import { Order } from '@/app/types/bakery';
import { INITIAL_ORDERS } from '@/app/data/mockData';
import { EmpleadoSolicitudes } from './EmpleadoSolicitudes';
import { EmpleadoPedidos } from './EmpleadoPedidos';
import logo from '@/assets/PanPM.png';

export function EmpleadoDashboard() {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);

  const pendingOrders = orders.filter(o => o.status === 'pendiente');
  const activeOrders = orders.filter(o => o.status === 'en-proceso');

  const handleAcceptOrder = (orderId: string) => {
    setOrders(orders.map(order =>
      order.id === orderId
        ? { ...order, status: 'en-proceso' as const }
        : order
    ));
  };

  const handleRejectOrder = (orderId: string, reason: string) => {
    setOrders(orders.map(order =>
      order.id === orderId
        ? { ...order, status: 'cancelado' as const, notes: `Rechazado: ${reason}` }
        : order
    ));
  };

  const handleUpdateStatus = (orderId: string, status: 'en-proceso' | 'completado') => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status } : order
    ));
  };

  return (
    <div className="min-h-screen bg-white">
      <Tabs defaultValue="pending">
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
                    Empleado
                  </span>
                </div>
                <Button variant="ghost" size="sm" onClick={logout} className="bg-white text-red-600 border border-red-600 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all">
                  <LogOut className="w-4 h-4 mr-2" />
                  Salir
                </Button>
              </div>
            </div>

            {/* Navigation Tabs inline */}
            <div className="flex items-center mt-2">
              <TabsList className="w-full justify-start border-0 bg-transparent h-auto p-0 gap-6">
                <TabsTrigger 
                  value="pending" 
                  className="flex items-center gap-2 py-2 px-4 data-[state=active]:bg-transparent data-[state=active]:border-b-4 data-[state=active]:border-white data-[state=active]:text-white text-white hover:bg-white/20 transition-colors relative"
                >
                  <Package className="w-4 h-4" />
                  Solicitudes Pendientes
                  {pendingOrders.length > 0 && (
                    <span className="ml-1 bg-white text-[#402916] text-xs px-2 py-0.5 rounded-full font-medium">
                      {pendingOrders.length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger 
                  value="active" 
                  className="flex items-center gap-2 py-2 px-4 data-[state=active]:bg-transparent data-[state=active]:border-b-4 data-[state=active]:border-white data-[state=active]:text-white text-white hover:bg-white/20 transition-colors"
                >
                  <ClipboardList className="w-4 h-4" />
                  Pedidos Activos
                  {activeOrders.length > 0 && (
                    <span className="ml-1 bg-white text-[#402916] text-xs px-2 py-0.5 rounded-full font-medium">
                      {activeOrders.length}
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <TabsContent value="pending" className="mt-0">
            <EmpleadoSolicitudes
              orders={pendingOrders}
              onAccept={handleAcceptOrder}
              onReject={handleRejectOrder}
            />
          </TabsContent>

          <TabsContent value="active" className="mt-0">
            <EmpleadoPedidos
              orders={activeOrders}
              onUpdateStatus={handleUpdateStatus}
            />
          </TabsContent>
        </main>
      </Tabs>
    </div>
  );
}
