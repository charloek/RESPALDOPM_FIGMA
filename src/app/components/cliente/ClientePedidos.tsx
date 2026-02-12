import { Order } from '@/app/types/bakery';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Package, Calendar, DollarSign, FileText, Download } from 'lucide-react';
import { format } from 'date-fns';

interface ClientePedidosProps {
  orders: Order[];
}

export function ClientePedidos({ orders }: ClientePedidosProps) {
  const getStatusLabel = (status: string) => {
    const labels = {
      'pendiente': 'Pendiente',
      'en-proceso': 'En Proceso',
      'completado': 'Completado',
      'cancelado': 'Cancelado'
    };
    return labels[status as keyof typeof labels] || status;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'pendiente': 'bg-yellow-100 text-yellow-800',
      'en-proceso': 'bg-green-100 text-green-800',
      'completado': 'bg-blue-100 text-blue-800',
      'cancelado': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  const handleDownloadPDF = (orderId: string) => {
    // Simulación de descarga de PDF
    alert(`Descargando comprobante del pedido ${orderId}...`);
  };

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-4">
          <Package className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No tienes pedidos
        </h3>
        <p className="text-gray-500">
          Tus pedidos aparecerán aquí una vez que los realices
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Mis Pedidos ({orders.length})
        </h2>
      </div>

      <div className="grid gap-6">
        {orders.map(order => (
          <Card key={order.id} className="overflow-hidden border-gray-200">
            <CardHeader className="bg-[#F5F1ED] border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg text-gray-900">
                    Pedido #{order.id}
                  </CardTitle>
                  <p className="text-sm text-gray-500 mt-1">
                    Creado el {format(new Date(order.createdAt), "d 'de' MMMM 'de' yyyy 'a las' HH:mm")}
                  </p>
                </div>
                <Badge className={getStatusColor(order.status)}>
                  {getStatusLabel(order.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Información del pedido */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Fecha de entrega</p>
                      <p className="font-medium text-gray-900">
                        {format(new Date(order.deliveryDate), "d 'de' MMMM 'de' yyyy 'a las' HH:mm")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <DollarSign className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="text-xl font-bold text-black"> {/* PRECIO NEGRO */}
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
                    Productos ({order.items.length})
                  </h4>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm border-b pb-2">
                        <span className="text-gray-600">
                          {item.productName} <span className="text-gray-400">x{item.quantity}</span>
                        </span>
                        <span className="font-medium text-black"> {/* PRECIO NEGRO */}
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Acciones */}
              <div className="flex gap-2 mt-6 pt-4 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownloadPDF(order.id)}
                  className="text-gray-600 hover:bg-gray-50"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Descargar Comprobante
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
