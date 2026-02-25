import { useEffect, useRef, useState } from 'react';
import { Product } from '@/app/types/bakery';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Search, ShoppingCart, Plus, Minus } from 'lucide-react';

interface ClienteCatalogoProps {
  products: Product[];
  onAddToCart: (product: Product, quantity: number) => void;
}

interface ToastItem {
  id: number;
  message: string;
  visible: boolean;
}

export function ClienteCatalogo({ products, onAddToCart }: ClienteCatalogoProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const toastTimeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([]);

  const categories = [
    { value: 'all', label: 'Todos' },
    { value: 'pan', label: 'Panes' },
    { value: 'pastel', label: 'Pasteles' },
    { value: 'galleta', label: 'Galletas' },
    { value: 'otro', label: 'Otros' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getQuantity = (productId: string) => quantities[productId] || 1;

  const incrementQuantity = (productId: string) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: (prev[productId] || 1) + 1
    }));
  };

  const decrementQuantity = (productId: string) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) - 1)
    }));
  };

  const handleAddToCart = (product: Product) => {
    const quantity = getQuantity(product.id);
    onAddToCart(product, quantity);
    const quantityText = quantity > 1 ? `${quantity} unidades` : '1 unidad';
    const id = Date.now() + Math.floor(Math.random() * 1000);
    const message = `${quantityText} de ${product.name} agregado al carrito`;

    setToasts(prev => [{ id, message, visible: false }, ...prev].slice(0, 3));

    requestAnimationFrame(() => {
      setToasts(prev => prev.map(toast => (toast.id === id ? { ...toast, visible: true } : toast)));
    });

    const hideTimeout = setTimeout(() => {
      setToasts(prev => prev.map(toast => (toast.id === id ? { ...toast, visible: false } : toast)));
    }, 3000);

    const removeTimeout = setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3300);

    toastTimeoutRefs.current.push(hideTimeout, removeTimeout);

    // Reset quantity after adding
    setQuantities(prev => ({ ...prev, [product.id]: 1 }));
  };

  useEffect(() => {
    return () => {
      toastTimeoutRefs.current.forEach(timeoutId => clearTimeout(timeoutId));
    };
  }, []);

  const getCategoryLabel = (category: string) => {
    const cat = categories.find(c => c.value === category);
    return cat?.label || category;
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
      <div className="fixed bottom-12 right-4 z-40 w-80 pointer-events-none">
        <div className="relative">
          {toasts.map((toast, index) => (
            <div
              key={toast.id}
              className={`absolute right-0 w-full transition-all duration-300 ${toast.visible ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'}`}
              style={{ top: `${index * 70}px` }}
            >
              <div className="bg-green-600/85 text-white px-4 py-3 rounded-lg shadow-lg overflow-hidden">
                <p className="text-sm font-medium leading-snug break-words [overflow-wrap:anywhere]">{toast.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-[#F5F1ED] p-4 rounded-lg border shadow-sm space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-11 focus-visible:ring-[#3E2723]"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.value)}
              className={selectedCategory === category.value ? 'bg-[#3E2723] hover:bg-[#5D4037]' : 'hover:text-[#3E2723] hover:border-[#3E2723]'}
            >
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
            <CardHeader className="p-0">
              <div className="relative group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                <Badge className={`absolute top-3 right-3 ${getCategoryColor(product.category)} shadow-sm`}>
                  {getCategoryLabel(product.category)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-5">
              <h3 className="font-semibold text-lg text-gray-900 mb-3 line-clamp-2 min-h-[3.5rem]">
                {product.name}
              </h3>
              <p className="text-xl font-bold text-black"> {/* PRECIO NEGRO */}
                ${product.price.toFixed(2)}
              </p>
            </CardContent>
            <CardFooter className="p-5 pt-0 flex items-center gap-2">
              <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => decrementQuantity(product.id)}
                  className="h-9 w-9 p-0 hover:bg-gray-100 text-gray-600"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center font-semibold text-gray-900">
                  {getQuantity(product.id)}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => incrementQuantity(product.id)}
                  className="h-9 w-9 p-0 hover:bg-gray-100 text-gray-600"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <Button
                onClick={() => handleAddToCart(product)}
                className="flex-1 h-9 bg-[#3E2723] hover:bg-[#5D4037] text-white shadow-sm"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Agregar
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No se encontraron productos</p>
        </div>
      )}
    </div>
  );
}
