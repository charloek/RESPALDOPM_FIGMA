export type UserRole = 'administrador' | 'cliente' | 'empleado';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  address?: string;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Usuario de demostración para cada rol
export const DEMO_USERS: Record<UserRole, User & { password: string }> = {
  administrador: {
    id: 'admin-001',
    email: 'admin@panaderia.com',
    password: 'admin123',
    name: 'Juan Pérez',
    role: 'administrador',
    phone: '555-1000',
    createdAt: '2024-01-01T00:00:00'
  },
  empleado: {
    id: 'emp-001',
    email: 'empleado@panaderia.com',
    password: 'empleado123',
    name: 'María López',
    role: 'empleado',
    phone: '555-2000',
    createdAt: '2024-01-01T00:00:00'
  },
  cliente: {
    id: 'cli-001',
    email: 'cliente@mail.com',
    password: 'cliente123',
    name: 'Carlos García',
    role: 'cliente',
    phone: '555-3000',
    address: 'Calle Principal 123',
    createdAt: '2024-01-01T00:00:00'
  }
};
