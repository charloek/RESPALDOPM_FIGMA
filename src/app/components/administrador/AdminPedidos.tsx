import { useState } from 'react';
import { Order } from '@/app/types/bakery';
import { OrdersList } from '@/app/components/OrdersList';
import { EditOrderDialog } from '@/app/components/EditOrderDialog';
import { OrderDetailsDialog } from '@/app/components/OrderDetailsDialog';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Search, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/app/components/ui/collapsible';

interface AdminPedidosProps {
  orders: Order[];
  onUpdate: (order: Order) => void;
  onDelete: (orderId: string) => void;
}

export function AdminPedidos({ orders, onUpdate, onDelete }: AdminPedidosProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
  const [isStatsOpen, setIsStatsOpen] = useState(false);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusFilters = [
    { value: 'all', label: 'Todos' },
    { value: 'pendiente', label: 'Pendientes' },
    { value: 'en-proceso', label: 'En Proceso' },
    { value: 'completado', label: 'Completados' },
    { value: 'cancelado', label: 'Cancelados' }
  ];

  const getFilterClass = (value: string, isActive: boolean) => {
    const styles: Record<string, { active: string; inactive: string }> = {
      all: {
        active: 'bg-[#3E2723] hover:bg-[#5D4037] text-white',
        inactive: 'text-[#3E2723] border-[#3E2723] hover:bg-[#F3EAE7]'
      },
      pendiente: {
        active: 'bg-yellow-600 hover:bg-yellow-700 text-white',
        inactive: 'text-yellow-700 border-yellow-300 hover:bg-yellow-100'
      },
      'en-proceso': {
        active: 'bg-green-600 hover:bg-green-700 text-white',
        inactive: 'text-green-700 border-green-200 hover:bg-green-50'
      },
      completado: {
        active: 'bg-blue-600 hover:bg-blue-700 text-white',
        inactive: 'text-blue-700 border-blue-200 hover:bg-blue-50'
      },
      cancelado: {
        active: 'bg-red-600 hover:bg-red-700 text-white',
        inactive: 'text-red-700 border-red-200 hover:bg-red-50'
      }
    };

    const style = styles[value] ?? styles.all;
    return isActive ? style.active : style.inactive;
  };

  // Stats
  const stats = {
    pendiente: orders.filter(o => o.status === 'pendiente').length,
    enProceso: orders.filter(o => o.status === 'en-proceso').length,
    completado: orders.filter(o => o.status === 'completado').length,
    cancelado: orders.filter(o => o.status === 'cancelado').length,
  };

  return (
    <div className="space-y-6">
      {/* Estadísticas Desplegables */}
      <Collapsible
        open={isStatsOpen}
        onOpenChange={setIsStatsOpen}
        className="w-full space-y-2 border rounded-lg bg-[#E8DDD0] shadow-sm p-4"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900">
            Resumen de Pedidos
          </h3>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              {isStatsOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="space-y-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
            <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-100">
              <p className="text-xs text-yellow-600 uppercase font-medium">Pendientes</p>
              <p className="text-2xl font-bold text-yellow-700">{stats.pendiente}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg border border-green-100">
              <p className="text-xs text-green-600 uppercase font-medium">En Proceso</p>
              <p className="text-2xl font-bold text-green-700">{stats.enProceso}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
              <p className="text-xs text-blue-600 uppercase font-medium">Completados</p>
              <p className="text-2xl font-bold text-blue-700">{stats.completado}</p>
            </div>
            <div className="bg-red-50 p-3 rounded-lg border border-red-100">
              <p className="text-xs text-red-600 uppercase font-medium">Cancelados</p>
              <p className="text-2xl font-bold text-red-700">{stats.cancelado}</p>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Filtros */}
      <div className="bg-[#F5F1ED] p-4 rounded-lg border shadow-sm space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Buscar por cliente o número de pedido..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Filter className="w-4 h-4" />
            <span className="font-medium">Estado:</span>
          </div>
          {statusFilters.map(filter => (
            <Button
              key={filter.value}
              variant={statusFilter === filter.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter(filter.value)}
              className={getFilterClass(filter.value, statusFilter === filter.value)}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Lista de pedidos */}
      <OrdersList
        orders={filteredOrders}
        onEdit={setEditingOrder}
        onDelete={onDelete}
        onViewDetails={setViewingOrder}
      />

      {/* Dialogs */}
      <EditOrderDialog
        order={editingOrder}
        open={!!editingOrder}
        onClose={() => setEditingOrder(null)}
        onSave={onUpdate}
      />

      <OrderDetailsDialog
        order={viewingOrder}
        open={!!viewingOrder}
        onClose={() => setViewingOrder(null)}
      />
    </div>
  );
}
