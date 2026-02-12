export interface Product {
  id: string;
  name: string;
  category: 'pan' | 'pastel' | 'galleta' | 'otro';
  price: number;
  image: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  total: number;
  status: 'pendiente' | 'en-proceso' | 'completado' | 'cancelado';
  deliveryDate: string;
  notes?: string;
  createdAt: string;
}

export type OrderStatus = Order['status'];
