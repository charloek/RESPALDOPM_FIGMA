import { useState } from 'react';
import { Product } from '@/app/types/bakery';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Card, CardContent } from '@/app/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/app/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { Badge } from '@/app/components/ui/badge';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { toast } from 'sonner';

interface AdminProductosProps {
  products: Product[];
  onCreate: (product: Omit<Product, 'id'>) => void;
  onUpdate: (product: Product) => void;
  onDelete: (productId: string) => void;
}

export function AdminProductos({ products, onCreate, onUpdate, onDelete }: AdminProductosProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const [formData, setFormData] = useState({
    name: '',
    category: 'pan' as Product['category'],
    price: '',
    image: ''
  });

  const categories = [
    { value: 'all', label: 'Todas las categorías' },
    { value: 'pan', label: 'Pan' },
    { value: 'pastel', label: 'Pastel' },
    { value: 'galleta', label: 'Galleta' },
    { value: 'otro', label: 'Otro' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenCreate = () => {
    setFormData({ name: '', category: 'pan', price: '', image: '' });
    setIsCreating(true);
  };

  const handleOpenEdit = (product: Product) => {
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      image: product.image
    });
    setEditingProduct(product);
    toast.info('Editando producto', {
      description: `Puedes modificar ${product.name}`
    });
  };

  const handleClose = () => {
    setIsCreating(false);
    setEditingProduct(null);
    setFormData({ name: '', category: 'pan', price: '', image: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      image: formData.image || 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop'
    };

    if (editingProduct) {
      onUpdate({ ...productData, id: editingProduct.id });
      toast.success('Producto actualizado', {
        description: `${productData.name} ha sido actualizado`
      });
    } else {
      onCreate(productData);
      toast.success('Producto creado', {
        description: `${productData.name} ha sido agregado al catálogo`
      });
    }

    handleClose();
  };

  const handleDelete = (product: Product) => {
    if (confirm(`¿Estás seguro de eliminar ${product.name}?`)) {
      onDelete(product.id);
      toast.error('Producto eliminado', {
        description: `${product.name} ha sido eliminado del catálogo`
      });
    }
  };

  const handleCancel = () => {
    toast.info('Acción cancelada');
    handleClose();
  };

  const getCategoryLabel = (category: string) => {
    return categories.find(c => c.value === category)?.label || category;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      pan: 'bg-amber-100 text-amber-700',
      pastel: 'bg-pink-100 text-pink-700',
      galleta: 'bg-orange-100 text-orange-700',
      otro: 'bg-gray-100 text-gray-700'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      {/* Header y filtros */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex-1 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.value)}
                className={selectedCategory === category.value ? 'bg-[#3E2723] hover:bg-[#5D4037]' : ''}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
        <Button onClick={handleOpenCreate} size="lg" className="bg-[#3E2723] hover:bg-[#5D4037]">
          <Plus className="w-5 h-5 mr-2" />
          Nuevo Producto
        </Button>
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <Card key={product.id} className="overflow-hidden shadow-sm border-gray-200">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <Badge className={`absolute top-2 right-2 ${getCategoryColor(product.category)}`}>
                {getCategoryLabel(product.category)}
              </Badge>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                {product.name}
              </h3>
              <p className="text-2xl font-bold text-black mb-4"> {/* PRECIO NEGRO */}
                ${product.price.toFixed(2)}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenEdit(product)}
                  className="flex-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200"
                >
                  <Pencil className="w-4 h-4 mr-2" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(product)}
                  className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Eliminar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No se encontraron productos</p>
        </div>
      )}

      {/* Dialog de crear/editar */}
      <Dialog open={isCreating || !!editingProduct} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del Producto</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej: Pan Francés"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoría</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value as Product['category'] })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pan">Pan</SelectItem>
                  <SelectItem value="pastel">Pastel</SelectItem>
                  <SelectItem value="galleta">Galleta</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Precio ($)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="0.00"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">URL de Imagen (Opcional)</Label>
              <Input
                id="image"
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://..."
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1 bg-[#3E2723] hover:bg-[#5D4037]">
                {editingProduct ? 'Guardar Cambios' : 'Crear Producto'}
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
