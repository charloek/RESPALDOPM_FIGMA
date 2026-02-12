import { Product } from '../types/bakery';
import pastelVainilla from '../../assets/pastel-vainilla.svg';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Pan Francés',
    category: 'pan',
    price: 1.50,
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=300&fit=crop'
  },
  {
    id: '2',
    name: 'Croissant',
    category: 'pan',
    price: 2.50,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop'
  },
  {
    id: '3',
    name: 'Pan Integral',
    category: 'pan',
    price: 3.00,
    image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&h=300&fit=crop'
  },
  {
    id: '4',
    name: 'Pastel de Chocolate',
    category: 'pastel',
    price: 25.00,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop'
  },
  {
    id: '5',
    name: 'Pastel de Vainilla',
    category: 'pastel',
    price: 22.00,
    image: pastelVainilla
  },
  {
    id: '6',
    name: 'Pastel de Zanahoria',
    category: 'pastel',
    price: 24.00,
    image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&h=300&fit=crop'
  },
  {
    id: '7',
    name: 'Galletas de Chocolate',
    category: 'galleta',
    price: 8.00,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=300&fit=crop'
  },
  {
    id: '8',
    name: 'Galletas de Avena',
    category: 'galleta',
    price: 7.50,
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop'
  },
  {
    id: '9',
    name: 'Dona Glaseada',
    category: 'otro',
    price: 2.00,
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop'
  },
  {
    id: '10',
    name: 'Muffin de Arándanos',
    category: 'otro',
    price: 3.50,
    image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400&h=300&fit=crop'
  },
  {
    id: '11',
    name: 'Baguette',
    category: 'pan',
    price: 2.00,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop'
  },
  {
    id: '12',
    name: 'Pastel Red Velvet',
    category: 'pastel',
    price: 28.00,
    image: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=400&h=300&fit=crop'
  }
];
