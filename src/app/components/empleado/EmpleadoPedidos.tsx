import { Order } from '@/app/types/bakery';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { User, Phone, Calendar, DollarSign, FileText, Download, Check } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface EmpleadoPedidosProps {
  orders: Order[];
  onUpdateStatus: (orderId: string, status: 'en-proceso' | 'completado') => void;
}

export function EmpleadoPedidos({ orders, onUpdateStatus }: EmpleadoPedidosProps) {
  const handleComplete = (orderId: string) => {
    onUpdateStatus(orderId, 'completado');
    toast.success('Pedido completado', {
      description: `El pedido #${orderId} ha sido marcado como completado`
    });
  };

  const handleGeneratePDF = (orderId: string) => {
    toast.success('PDF generado', {
      description: `Generando ticket del pedido #${orderId}...`
    });
  };

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-4">
          <FileText className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No hay pedidos en proceso
        </h3>
        <p className="text-gray-500">
          Los pedidos aceptados aparecerán aquí
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {orders.map(order => (
        <Card key={order.id} className="border-l-4 border-l-green-500">
          <CardHeader className="bg-green-50">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Pedido #{order.id}</CardTitle>
                <p className="text-sm text-gray-500 mt-1">
                  En preparación desde {format(new Date(order.createdAt), "d 'de' MMMM")}
                </p>
              </div>
              <Badge className="bg-green-100 text-green-800">
                En Preparación
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

              {/* Productos y acciones */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">
                  Productos ({order.items.length})
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
                    onClick={() => handleComplete(order.id)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white" 
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Marcar como Completado
                  </Button>
                  <Button
                    onClick={() => handleGeneratePDF(order.id)}
                    variant="outline"
                    className="w-full"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Generar Ticket PDF
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
