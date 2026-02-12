import { Order } from '../types/bakery';

// Orders mock data
export const INITIAL_ORDERS: Order[] = [
  {
    id: '001',
    customerName: 'María González',
    customerPhone: '555-0101',
    items: [
      { productId: '1', productName: 'Pan Francés', quantity: 5, price: 1.5 },
      { productId: '4', productName: 'Pastel de Chocolate', quantity: 1, price: 25.0 }
    ],
    total: 32.5,
    status: 'pendiente',
    deliveryDate: '2026-01-10',
    notes: 'Decoración con mensaje personalizado',
    createdAt: '2026-01-08T09:30:00'
  },
  {
    id: '002',
    customerName: 'Carlos Rodríguez',
    customerPhone: '555-0102',
    items: [
      { productId: '2', productName: 'Croissant', quantity: 12, price: 2.5 },
      { productId: '7', productName: 'Galletas de Chocolate', quantity: 2, price: 8.0 }
    ],
    total: 46.0,
    status: 'en-proceso',
    deliveryDate: '2026-01-09',
    createdAt: '2026-01-07T14:20:00'
  },
  {
    id: '003',
    customerName: 'Ana Martínez',
    customerPhone: '555-0103',
    items: [
      { productId: '5', productName: 'Pastel de Vainilla', quantity: 1, price: 22.0 },
      { productId: '9', productName: 'Dona Glaseada', quantity: 6, price: 2.0 }
    ],
    total: 34.0,
    status: 'completado',
    deliveryDate: '2026-01-08',
    createdAt: '2026-01-06T11:00:00'
  }
];

// Employee mock data
export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: 'active' | 'inactive';
  hireDate: string;
}

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: 'emp-001',
    name: 'María López',
    email: 'maria.lopez@panaderia.com',
    phone: '555-2001',
    role: 'Panadero',
    status: 'active',
    hireDate: '2024-01-15'
  },
  {
    id: 'emp-002',
    name: 'Pedro Sánchez',
    email: 'pedro.sanchez@panaderia.com',
    phone: '555-2002',
    role: 'Repostero',
    status: 'active',
    hireDate: '2024-03-20'
  },
  {
    id: 'emp-003',
    name: 'Ana Torres',
    email: 'ana.torres@panaderia.com',
    phone: '555-2003',
    role: 'Cajero',
    status: 'active',
    hireDate: '2024-06-10'
  }
];

// Insumo mock data
export interface Insumo {
  id: string;
  name: string;
  unit: string;
  quantity: number;
  minQuantity: number;
  maxQuantity: number;
  supplier: string;
}

export const INITIAL_INSUMOS: Insumo[] = [
  {
    id: 'ins-001',
    name: 'Harina de Trigo',
    unit: 'kg',
    quantity: 250,
    minQuantity: 100,
    maxQuantity: 500,
    supplier: 'Molinos del Norte'
  },
  {
    id: 'ins-002',
    name: 'Azúcar',
    unit: 'kg',
    quantity: 45,
    minQuantity: 50,
    maxQuantity: 200,
    supplier: 'Dulces Distribuidores'
  },
  {
    id: 'ins-003',
    name: 'Levadura',
    unit: 'kg',
    quantity: 15,
    minQuantity: 10,
    maxQuantity: 30,
    supplier: 'Insumos Panaderos SA'
  },
  {
    id: 'ins-004',
    name: 'Mantequilla',
    unit: 'kg',
    quantity: 80,
    minQuantity: 40,
    maxQuantity: 150,
    supplier: 'Lácteos Premium'
  },
  {
    id: 'ins-005',
    name: 'Huevos',
    unit: 'unidades',
    quantity: 200,
    minQuantity: 150,
    maxQuantity: 500,
    supplier: 'Granja Feliz'
  },
  {
    id: 'ins-006',
    name: 'Chocolate',
    unit: 'kg',
    quantity: 25,
    minQuantity: 20,
    maxQuantity: 80,
    supplier: 'Cacao Fino'
  }
];
