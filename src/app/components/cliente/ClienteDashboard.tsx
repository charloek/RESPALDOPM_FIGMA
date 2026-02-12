import { useState } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import { Button } from '@/app/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { ShoppingCart, Package, LogOut, Store, User } from 'lucide-react';
import { ClienteCatalogo } from './ClienteCatalogo';
import { ClienteCarrito } from './ClienteCarrito';
import { ClientePedidos } from './ClientePedidos';
import { Product, Order, OrderItem } from '@/app/types/bakery';
import { PRODUCTS } from '@/app/data/products';
import logo from '@/assets/PanPM.png';

export function ClienteDashboard() {
  const { user, logout } = useAuth();
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleAddToCart = (product: Product, quantity: number) => {
    const existingItem = cart.find(item => item.productId === product.id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.productId === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, {
        productId: product.id,
        productName: product.name,
        quantity,
        price: product.price
      }]);
    }
  };

  const handleUpdateCartItem = (productId: string, quantity: number) => {
    if (quantity === 0) {
      setCart(cart.filter(item => item.productId !== productId));
    } else {
      setCart(cart.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      ));
    }
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart(cart.filter(item => item.productId !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleCheckout = (deliveryDate: string, deliveryTime: string, address: string, notes?: string) => {
    const newOrder: Order = {
      id: String(Date.now()),
      customerName: user?.name || 'Cliente',
      customerPhone: user?.phone || '',
      items: cart,
      total: cartTotal,
      status: 'pendiente',
      deliveryDate: `${deliveryDate}T${deliveryTime}`,
      notes: notes ? `${notes}\nDirección: ${address}` : `Dirección: ${address}`,
      createdAt: new Date().toISOString()
    };
    
    setOrders([newOrder, ...orders]);
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-white">
      <Tabs defaultValue="catalog">
        {/* Header Sticky */}
        <header className="bg-[#402916] border-b shadow-sm sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-4">
                <img 
                  src={logo}
                  alt="Logo" 
                  className="w-10 h-10 object-cover rounded-full"
                />
                <div>
                  <h1 className="text-lg font-bold text-white">
                    Panadería Milagro
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-white" />
                  <span className="font-medium text-white">{user?.name}</span>
                  <span className="text-xs bg-white text-[#402916] px-2 py-0.5 rounded-full">
                    Cliente
                  </span>
                </div>
                <Button variant="ghost" size="sm" onClick={logout} className="bg-white text-red-600 border border-red-600 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all">
                  <LogOut className="w-4 h-4 mr-2" />
                  Salir
                </Button>
              </div>
            </div>

            {/* Navigation Tabs inline */}
            <div className="flex items-center mt-2">
              <TabsList className="w-full justify-start border-0 bg-transparent h-auto p-0 gap-6">
                <TabsTrigger 
                  value="catalog" 
                  className="flex items-center gap-2 py-2 px-4 data-[state=active]:bg-transparent data-[state=active]:border-b-4 data-[state=active]:border-white data-[state=active]:text-white text-white hover:bg-white/20 transition-colors"
                >
                  <Store className="w-4 h-4" />
                  Catálogo
                  <span className="ml-1 bg-white text-[#402916] text-xs px-2 py-0.5 rounded-full font-medium">
                    {PRODUCTS.length}
                  </span>
                </TabsTrigger>
                <TabsTrigger 
                  value="cart" 
                  className="flex items-center gap-2 py-2 px-4 data-[state=active]:bg-transparent data-[state=active]:border-b-4 data-[state=active]:border-white data-[state=active]:text-white text-white hover:bg-white/20 transition-colors relative"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Carrito</span>
                  {cartItemCount > 0 && (
                    <span className="ml-1 bg-white text-[#402916] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {cartItemCount}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger 
                  value="orders" 
                  className="flex items-center gap-2 py-2 px-4 data-[state=active]:bg-transparent data-[state=active]:border-b-4 data-[state=active]:border-white data-[state=active]:text-white text-white hover:bg-white/20 transition-colors"
                >
                  <Package className="w-4 h-4" />
                  Mis Pedidos
                  {orders.length > 0 && (
                    <span className="ml-1 bg-white text-[#402916] text-xs px-2 py-0.5 rounded-full font-medium">
                      {orders.length}
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <TabsContent value="catalog" className="mt-0">
            <ClienteCatalogo products={PRODUCTS} onAddToCart={handleAddToCart} />
          </TabsContent>

          <TabsContent value="cart" className="mt-0">
            <ClienteCarrito
              cart={cart}
              products={PRODUCTS}
              onUpdateItem={handleUpdateCartItem}
              onRemoveItem={handleRemoveFromCart}
              onClearCart={handleClearCart}
              onCreateOrder={handleCheckout}
              cartTotal={cartTotal}
            />
          </TabsContent>

          <TabsContent value="orders" className="mt-0">
            <ClientePedidos orders={orders} />
          </TabsContent>
        </main>
      </Tabs>
    </div>
  );
}
