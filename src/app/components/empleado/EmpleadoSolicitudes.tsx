import { useState } from 'react';
import { Order } from '@/app/types/bakery';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/app/components/ui/dialog';
import { Check, X, Phone, Calendar, DollarSign, User, FileText, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface EmpleadoSolicitudesProps {
  orders: Order[];
  onAccept: (orderId: string) => void;
  onReject: (orderId: string, reason: string) => void;
}

export function EmpleadoSolicitudes({ orders, onAccept, onReject }: EmpleadoSolicitudesProps) {
  const [rejectingOrder, setRejectingOrder] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);

  const handleAccept = (orderId: string) => {
    onAccept(orderId);
    toast.success('Pedido aceptado', {
      description: `El pedido #${orderId} ha sido aceptado y está en preparación`
    });
  };

  const handleReject = () => {
    if (!rejectingOrder || !rejectReason.trim()) return;
    
    onReject(rejectingOrder, rejectReason);
    toast.success('Pedido rechazado', {
      description: `El pedido #${rejectingOrder} ha sido rechazado`
    });
    setRejectingOrder(null);
    setRejectReason('');
  };

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-4">
          <Check className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No hay solicitudes pendientes
        </h3>
        <p className="text-gray-500">
          Las nuevas solicitudes aparecerán aquí
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6">
        {orders.map(order => (
          <Card key={order.id} className="border-l-4 border-l-yellow-400">
            <CardHeader className="bg-[#F5F1ED]">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Pedido #{order.id}</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">
                    Recibido el {format(new Date(order.createdAt), "d 'de' MMMM 'a las' HH:mm")}
                  </p>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">
                  Pendiente de Revisión
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Información del cliente */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Cliente</p>
                      <p className="font-medium text-gray-900">{order.customerName}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Teléfono</p>
                      <p className="font-medium text-gray-900">{order.customerPhone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Fecha de entrega</p>
                      <p className="font-medium text-gray-900">
                        {format(new Date(order.deliveryDate), "d 'de' MMMM 'a las' HH:mm")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <DollarSign className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="text-2xl font-bold text-black"> {/* PRECIO NEGRO */}
                        ${order.total.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {order.notes && (
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Notas</p>
                        <p className="text-gray-900">{order.notes}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Productos */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Productos Solicitados ({order.items.length})
                  </h4>
                  <div className="space-y-2 mb-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between border-b pb-2">
                        <div>
                          <p className="font-medium text-gray-900">{item.productName}</p>
                          <p className="text-sm text-gray-500">
                            Cantidad: {item.quantity} | ${item.price.toFixed(2)} c/u
                          </p>
                        </div>
                        <span className="font-semibold text-black">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Acciones */}
                  <div className="flex flex-col gap-2 pt-4 border-t">
                    <Button
                      onClick={() => handleAccept(order.id)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Aceptar Pedido
                    </Button>
                    <Button
                      onClick={() => setRejectingOrder(order.id)}
                      variant="outline"
                      className="w-full text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Rechazar Pedido
                    </Button>
                    <Button
                      onClick={() => setViewingOrder(order)}
                      variant="outline"
                      className="w-full"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Ver Detalles Completos
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog de rechazo */}
      <Dialog open={!!rejectingOrder} onOpenChange={() => setRejectingOrder(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rechazar Pedido #{rejectingOrder}</DialogTitle>
            <DialogDescription>
              Por favor, indica el motivo del rechazo. El cliente recibirá esta información.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reason">Motivo del rechazo</Label>
              <Textarea
                id="reason"
                placeholder="Ej: No hay disponibilidad de ingredientes, fecha no disponible..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                rows={4}
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleReject}
                disabled={!rejectReason.trim()}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                Confirmar Rechazo
              </Button>
              <Button
                onClick={() => {
                  setRejectingOrder(null);
                  setRejectReason('');
                }}
                variant="outline"
                className="flex-1"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog de detalles */}
      <Dialog open={!!viewingOrder} onOpenChange={() => setViewingOrder(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalles del Pedido #{viewingOrder?.id}</DialogTitle>
          </DialogHeader>
          {viewingOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Cliente</p>
                  <p className="font-medium">{viewingOrder.customerName}</p>
                </div>
                <div>
                  <p className="text-gray-500">Teléfono</p>
                  <p className="font-medium">{viewingOrder.customerPhone}</p>
                </div>
                <div>
                  <p className="text-gray-500">Fecha de entrega</p>
                  <p className="font-medium">
                    {format(new Date(viewingOrder.deliveryDate), "d 'de' MMMM 'a las' HH:mm")}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Total</p>
                  <p className="font-bold text-black text-lg">
                    ${viewingOrder.total.toFixed(2)}
                  </p>
                </div>
              </div>
              
              <div>
                <p className="text-gray-500 mb-2">Productos</p>
                <div className="space-y-2">
                  {viewingOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between border-b pb-2">
                      <span>{item.productName} x{item.quantity}</span>
                      <span className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                  <Button onClick={() => setViewingOrder(null)}>Cerrar</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
