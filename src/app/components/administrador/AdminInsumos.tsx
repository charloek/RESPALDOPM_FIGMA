import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/app/components/ui/dialog';
import { Badge } from '@/app/components/ui/badge';
import { Progress } from '@/app/components/ui/progress';
import { Plus, Pencil, Trash2, AlertTriangle, Package } from 'lucide-react';
import { toast } from 'sonner';
import { INITIAL_INSUMOS, Insumo } from '@/app/data/mockData';

export function AdminInsumos() {
  const [insumos, setInsumos] = useState<Insumo[]>(INITIAL_INSUMOS);
  const [isCreating, setIsCreating] = useState(false);
  const [editingInsumo, setEditingInsumo] = useState<Insumo | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    unit: '',
    quantity: '',
    minQuantity: '',
    maxQuantity: '',
    supplier: ''
  });

  const handleOpenCreate = () => {
    setFormData({ name: '', unit: '', quantity: '', minQuantity: '', maxQuantity: '', supplier: '' });
    setIsCreating(true);
  };

  const handleOpenEdit = (insumo: Insumo) => {
    setFormData({
      name: insumo.name,
      unit: insumo.unit,
      quantity: insumo.quantity.toString(),
      minQuantity: insumo.minQuantity.toString(),
      maxQuantity: insumo.maxQuantity.toString(),
      supplier: insumo.supplier
    });
    setEditingInsumo(insumo);
    toast.info('Editando insumo', {
      description: `Puedes modificar ${insumo.name}`
    });
  };

  const handleClose = () => {
    setIsCreating(false);
    setEditingInsumo(null);
    setFormData({ name: '', unit: '', quantity: '', minQuantity: '', maxQuantity: '', supplier: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const insumoData = {
      name: formData.name,
      unit: formData.unit,
      quantity: parseFloat(formData.quantity),
      minQuantity: parseFloat(formData.minQuantity),
      maxQuantity: parseFloat(formData.maxQuantity),
      supplier: formData.supplier
    };

    if (editingInsumo) {
      setInsumos(insumos.map(ins =>
        ins.id === editingInsumo.id
          ? { ...ins, ...insumoData }
          : ins
      ));
      toast.success('Insumo actualizado', {
        description: `${insumoData.name} ha sido actualizado`
      });
    } else {
      const newInsumo: Insumo = {
        id: `ins-${Date.now()}`,
        ...insumoData
      };
      setInsumos([...insumos, newInsumo]);
      toast.success('Insumo creado', {
        description: `${insumoData.name} ha sido agregado al inventario`
      });
    }

    handleClose();
  };

  const handleDelete = (insumo: Insumo) => {
    if (confirm(`¿Estás seguro de eliminar ${insumo.name}?`)) {
      setInsumos(insumos.filter(ins => ins.id !== insumo.id));
      toast.error('Insumo eliminado', {
        description: `${insumo.name} fue eliminado del inventario`
      });
    }
  };

  const handleCancel = () => {
    toast.info('Acción cancelada');
    handleClose();
  };

  const getStockStatus = (insumo: Insumo) => {
    if (insumo.quantity < insumo.minQuantity) {
      return { label: 'Bajo', color: 'bg-red-100 text-red-700', alert: true };
    } else if (insumo.quantity >= insumo.maxQuantity) {
      return { label: 'Lleno', color: 'bg-green-100 text-green-700', alert: false };
    } else {
      return { label: 'Normal', color: 'bg-blue-100 text-blue-700', alert: false };
    }
  };

  const getStockPercentage = (insumo: Insumo) => {
    return (insumo.quantity / insumo.maxQuantity) * 100;
  };

  const lowStockItems = insumos.filter(ins => ins.quantity < ins.minQuantity).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Gestión de Insumos
          </h2>
          <p className="text-gray-600 mt-1">
            {insumos.length} insumos registrados
            {lowStockItems > 0 && (
              <span className="ml-2 text-red-600">
                • {lowStockItems} con stock bajo
              </span>
            )}
          </p>
        </div>
        <Button onClick={handleOpenCreate} size="lg">
          <Plus className="w-5 h-5 mr-2" />
          Nuevo Insumo
        </Button>
      </div>

      {/* Alertas de stock bajo */}
      {lowStockItems > 0 && (
        <Card className="border-red-200 bg-red-50 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-900">
              <AlertTriangle className="w-5 h-5" />
              Alertas de Stock Bajo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {insumos
                .filter(ins => ins.quantity < ins.minQuantity)
                .map(insumo => (
                  <div key={insumo.id} className="flex items-center justify-between bg-[#F5F1ED] p-3 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{insumo.name}</p>
                      <p className="text-sm text-gray-600">
                        Stock actual: {insumo.quantity} {insumo.unit} (mínimo: {insumo.minQuantity} {insumo.unit})
                      </p>
                    </div>
                    <Badge className="bg-red-100 text-red-700">
                      Reabastecer
                    </Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Grid de insumos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {insumos.map(insumo => {
          const status = getStockStatus(insumo);
          const percentage = getStockPercentage(insumo);

          return (
            <Card key={insumo.id} className={status.alert ? 'border-red-200' : ''}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      {insumo.name}
                    </CardTitle>
                    <p className="text-sm text-gray-500 mt-1">
                      Proveedor: {insumo.supplier}
                    </p>
                  </div>
                  <Badge className={status.color}>
                    {status.label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Stock Actual</span>
                    <span className="font-semibold">
                      {insumo.quantity} / {insumo.maxQuantity} {insumo.unit}
                    </span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>

                <div className="text-sm text-gray-600 space-y-1">
                  <p>Mínimo: {insumo.minQuantity} {insumo.unit}</p>
                  <p>Máximo: {insumo.maxQuantity} {insumo.unit}</p>
                </div>

                <div className="flex gap-2 pt-2 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenEdit(insumo)}
                    className="flex-1 text-blue-600 border-blue-600 hover:bg-blue-50"
                  >
                    <Pencil className="w-4 h-4 mr-1" />
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(insumo)}
                    className="text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Eliminar
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Dialog de crear/editar */}
      <Dialog open={isCreating || !!editingInsumo} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingInsumo ? 'Editar Insumo' : 'Nuevo Insumo'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del Insumo</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej: Harina de Trigo"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="unit">Unidad de Medida</Label>
                <Input
                  id="unit"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  placeholder="kg, L, unidades"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Cantidad Actual</Label>
                <Input
                  id="quantity"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="minQuantity">Cantidad Mínima</Label>
                <Input
                  id="minQuantity"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.minQuantity}
                  onChange={(e) => setFormData({ ...formData, minQuantity: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxQuantity">Cantidad Máxima</Label>
                <Input
                  id="maxQuantity"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.maxQuantity}
                  onChange={(e) => setFormData({ ...formData, maxQuantity: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="supplier">Proveedor</Label>
              <Input
                id="supplier"
                value={formData.supplier}
                onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                placeholder="Nombre del proveedor"
                required
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1">
                {editingInsumo ? 'Guardar Cambios' : 'Crear Insumo'}
              </Button>
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancelar
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
