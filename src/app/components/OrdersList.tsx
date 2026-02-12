import { Order, OrderStatus } from '../types/bakery';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Edit, Trash2, Eye, Calendar, Phone, User } from 'lucide-react';

interface OrdersListProps {
  orders: Order[];
  onEdit: (order: Order) => void;
  onDelete: (orderId: string) => void;
  onViewDetails: (order: Order) => void;
}

export function OrdersList({ orders, onEdit, onDelete, onViewDetails }: OrdersListProps) {
  const getStatusColor = (status: OrderStatus) => {
    const colors = {
      'pendiente': 'bg-yellow-100 text-yellow-800',
      'en-proceso': 'bg-green-100 text-green-800',
      'completado': 'bg-blue-100 text-blue-800',
      'cancelado': 'bg-red-100 text-red-800'
    };
    return colors[status];
  };

  const getStatusLabel = (status: OrderStatus) => {
    const labels = {
      'pendiente': 'Pendiente',
      'en-proceso': 'En Proceso',
      'completado': 'Completado',
      'cancelado': 'Cancelado'
    };
    return labels[status];
  };

  if (orders.length === 0) {
    return (
      <Card className="border-dashed shadow-md">
        <CardContent className="py-12 text-center">
          <p className="text-gray-500">No se encontraron pedidos</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {orders.map(order => (
        <Card key={order.id} className="hover:shadow-md transition-shadow border-gray-200">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="font-semibold text-lg text-gray-900">Pedido #{order.id}</h3>
                  <Badge className={getStatusColor(order.status)}>
                    {getStatusLabel(order.status)}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mt-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-gray-700">{order.customerName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{order.customerPhone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>Entrega: {new Date(order.deliveryDate).toLocaleDateString('es-ES')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Productos:</span>
                    <span className="font-medium">{order.items.length}</span>
                  </div>
                </div>

                {order.notes && (
                  <p className="text-sm text-gray-500 italic border-l-2 border-gray-200 pl-2 mt-2">
                    Nota: {order.notes}
                  </p>
                )}
              </div>

              <div className="flex flex-col items-end gap-3 min-w-[200px]">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="text-2xl font-bold text-black"> {/* PRECIO NEGRO */}
                    ${order.total.toFixed(2)}
                  </p>
                </div>

                <div className="flex gap-2 w-full justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewDetails(order)}
                    className="text-gray-600 hover:bg-gray-50"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Ver
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(order)}
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (confirm('¿Está seguro de eliminar este pedido?')) {
                        onDelete(order.id);
                      }
                    }}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Eliminar
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
