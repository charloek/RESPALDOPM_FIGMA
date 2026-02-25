import { useState } from 'react';
import { Product, OrderItem } from '@/app/types/bakery';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { ShoppingCart, Trash2, Plus, Minus, Calendar, Clock, MapPin } from 'lucide-react';
import { toast } from 'sonner';

interface ClienteCarritoProps {
  cart: OrderItem[];
  products: Product[];
  onUpdateItem: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onCreateOrder: (deliveryDate: string, deliveryTime: string, address: string, notes?: string) => void;
  cartTotal: number;
}

export function ClienteCarrito({
  cart,
  products,
  onUpdateItem,
  onRemoveItem,
  onClearCart,
  onCreateOrder,
  cartTotal
}: ClienteCarritoProps) {
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const getProduct = (productId: string) => {
    return products.find(p => p.id === productId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateOrder(deliveryDate, deliveryTime, address, notes);
    toast.success('Pedido realizado', {
      description: 'Tu pedido fue enviado correctamente'
    });
    // Reset form
    setDeliveryDate('');
    setDeliveryTime('');
    setAddress('');
    setNotes('');
  };

  const handleRemove = (productId: string) => {
    const product = getProduct(productId);
    onRemoveItem(productId);
    toast.error('Producto eliminado', {
      description: `${product?.name || 'Producto'} removido del carrito`
    });
  };

  const handleClear = () => {
    onClearCart();
    toast.error('Carrito vaciado');
  };

  const minDate = new Date().toISOString().split('T')[0];

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-4">
          <ShoppingCart className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Tu carrito está vacío
        </h3>
        <p className="text-gray-500">
          Agrega productos desde el catálogo para comenzar tu pedido
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Lista de productos */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Productos en el carrito ({cart.length})
          </h2>
          <Button variant="outline" size="sm" onClick={handleClear} className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200">
            Vaciar carrito
          </Button>
        </div>

        {cart.map(item => {
          const product = getProduct(item.productId);
          if (!product) return null;

          return (
            <Card key={item.productId}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900">
                      {item.productName}
                    </h3>
                    <p className="text-gray-600 mb-2">
                      ${item.price.toFixed(2)} c/u
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border rounded-lg">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onUpdateItem(item.productId, item.quantity - 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-12 text-center font-semibold text-black">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onUpdateItem(item.productId, item.quantity + 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemove(item.productId)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Eliminar
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-black">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Resumen y formulario */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Resumen del Pedido</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {cart.map(item => (
                <div key={item.productId} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.productName} x{item.quantity}
                  </span>
                  <span className="font-medium text-black">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-2xl font-bold text-black">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Detalles de Entrega</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="deliveryDate" className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" style={{ color: '#ea580c' }} /> {/* orange-600 */}
                  Fecha de Entrega
                </Label>
                <Input
                  id="deliveryDate"
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  min={minDate}
                  required
                  className="focus-visible:ring-orange-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deliveryTime" className="flex items-center gap-2">
                  <Clock className="w-5 h-5" style={{ color: '#ea580c' }} />
                  Hora de Entrega
                </Label>
                <Input
                  id="deliveryTime"
                  type="time"
                  value={deliveryTime}
                  onChange={(e) => setDeliveryTime(e.target.value)}
                  required
                  className="focus-visible:ring-orange-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" style={{ color: '#ea580c' }} />
                  Dirección de Entrega
                </Label>
                <Input
                  id="address"
                  type="text"
                  placeholder="Calle, número, colonia..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="focus-visible:ring-orange-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notas Adicionales (Opcional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Ej: Sin azúcar, decoración especial..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="focus-visible:ring-orange-500"
                />
              </div>

              <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" size="lg">
                Realizar Pedido
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
