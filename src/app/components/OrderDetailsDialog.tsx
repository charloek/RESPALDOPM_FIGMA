import { Order } from '../types/bakery';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Badge } from './ui/badge';
import { Calendar, Phone, User, Package } from 'lucide-react';

interface OrderDetailsDialogProps {
  order: Order | null;
  open: boolean;
  onClose: () => void;
}

export function OrderDetailsDialog({ order, open, onClose }: OrderDetailsDialogProps) {
  if (!order) return null;

  const getStatusColor = (status: Order['status']) => {
    const colors = {
      'pendiente': 'bg-yellow-100 text-yellow-800',
      'en-proceso': 'bg-green-100 text-green-800',
      'completado': 'bg-blue-100 text-blue-800',
      'cancelado': 'bg-red-100 text-red-800'
    };
    return colors[status];
  };

  const getStatusLabel = (status: Order['status']) => {
    const labels = {
      'pendiente': 'Pendiente',
      'en-proceso': 'En Proceso',
      'completado': 'Completado',
      'cancelado': 'Cancelado'
    };
    return labels[status];
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Detalles del Pedido #{order.id}</span>
            <Badge className={getStatusColor(order.status)}>
              {getStatusLabel(order.status)}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Información del Cliente */}
          <div>
            <h3 className="font-semibold mb-3">Información del Cliente</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">Nombre:</span>
                <span className="font-medium">{order.customerName}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">Teléfono:</span>
                <span className="font-medium">{order.customerPhone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">Fecha de entrega:</span>
                <span className="font-medium">
                  {new Date(order.deliveryDate).toLocaleDateString('es-ES', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200" />

          {/* Productos */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Package className="w-4 h-4" />
              Productos del Pedido
            </h3>
            <div className="space-y-2">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-[#F5F1ED] rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium">{item.productName}</p>
                    <p className="text-sm text-gray-500">
                      ${item.price.toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-black">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200" />

          {/* Notas */}
          {order.notes && (
            <>
              <div>
                <h3 className="font-semibold mb-2">Notas Adicionales</h3>
                <p className="text-sm text-gray-600 bg-[#F5F1ED] p-3 rounded-lg">
                  {order.notes}
                </p>
              </div>
              <div className="border-t border-gray-200" />
            </>
          )}

          {/* Total */}
          <div className="bg-[#F5F1ED] p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total del Pedido</span>
              <span className="text-2xl font-bold text-black">
                ${order.total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Información adicional */}
          <div className="text-xs text-gray-500 text-center">
            <p>Pedido creado el {new Date(order.createdAt).toLocaleString('es-ES')}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
