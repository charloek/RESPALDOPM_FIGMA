import { useState, useEffect } from 'react';
import { Order, OrderItem, OrderStatus, Product } from '../types/bakery';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Trash2 } from 'lucide-react';
import { PRODUCTS } from '../data/products';

interface EditOrderDialogProps {
  order: Order | null;
  open: boolean;
  onClose: () => void;
  onSave: (order: Order) => void;
}

export function EditOrderDialog({ order, open, onClose, onSave }: EditOrderDialogProps) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<OrderStatus>('pendiente');
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  useEffect(() => {
    if (order) {
      setCustomerName(order.customerName);
      setCustomerPhone(order.customerPhone);
      setDeliveryDate(order.deliveryDate);
      setNotes(order.notes || '');
      setStatus(order.status);
      setOrderItems([...order.items]);
    }
  }, [order]);

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setOrderItems(orderItems.filter(item => item.productId !== productId));
      return;
    }
    setOrderItems(orderItems.map(item =>
      item.productId === productId
        ? { ...item, quantity }
        : item
    ));
  };

  const removeItem = (productId: string) => {
    setOrderItems(orderItems.filter(item => item.productId !== productId));
  };

  const addProduct = (productId: string) => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existingItem = orderItems.find(item => item.productId === productId);
    if (existingItem) {
      updateQuantity(productId, existingItem.quantity + 1);
    } else {
      setOrderItems([...orderItems, {
        productId: product.id,
        productName: product.name,
        quantity: 1,
        price: product.price
      }]);
    }
  };

  const calculateTotal = () => {
    return orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!order || !customerName || !customerPhone || !deliveryDate || orderItems.length === 0) {
      alert('Por favor complete todos los campos requeridos y agregue al menos un producto');
      return;
    }

    const updatedOrder: Order = {
      ...order,
      customerName,
      customerPhone,
      deliveryDate,
      notes: notes || undefined,
      status,
      items: orderItems,
      total: calculateTotal()
    };

    onSave(updatedOrder);
    onClose();
  };

  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Pedido #{order.id}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Información del Cliente */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-customerName">Nombre del Cliente *</Label>
                <Input
                  id="edit-customerName"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="edit-customerPhone">Teléfono *</Label>
                <Input
                  id="edit-customerPhone"
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="edit-deliveryDate">Fecha de Entrega *</Label>
                <Input
                  id="edit-deliveryDate"
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="edit-status">Estado del Pedido *</Label>
                <Select value={status} onValueChange={(value) => setStatus(value as OrderStatus)}>
                  <SelectTrigger id="edit-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pendiente">Pendiente</SelectItem>
                    <SelectItem value="en-proceso">En Proceso</SelectItem>
                    <SelectItem value="completado">Completado</SelectItem>
                    <SelectItem value="cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="edit-notes">Notas Adicionales</Label>
              <Textarea
                id="edit-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
              />
            </div>

            {/* Productos */}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-3">
                <Label>Productos del Pedido</Label>
                <Select onValueChange={addProduct}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Agregar producto" />
                  </SelectTrigger>
                  <SelectContent>
                    {PRODUCTS.map(product => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name} - ${product.price.toFixed(2)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {orderItems.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">
                  No hay productos en el pedido
                </p>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {orderItems.map(item => (
                    <div key={item.productId} className="flex items-center justify-between gap-2 p-3 bg-[#F5F1ED] rounded">
                      <div className="flex-1">
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-sm text-gray-500">${item.price.toFixed(2)} c/u</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Label htmlFor={`qty-${item.productId}`} className="text-sm">Cant:</Label>
                          <Input
                            id={`qty-${item.productId}`}
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value))}
                            className="w-20 h-9"
                          />
                        </div>
                        <span className="font-semibold w-20 text-right">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.productId)}
                          className="h-9 w-9 p-0"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Total */}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">Total:</span>
                <span className="text-2xl font-bold text-gray-900">
                  ${calculateTotal().toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              Guardar Cambios
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
