import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import logo from '../../assets/PanPM.png';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const { login } = useAuth();

  const demoProfiles = {
    administrador: {
      label: 'Administrador',
      email: 'admin@panaderia.com',
      password: 'admin123',
    },
    empleado: {
      label: 'Empleado',
      email: 'empleado@panaderia.com',
      password: 'empleado123',
    },
    cliente: {
      label: 'Cliente',
      email: 'cliente@mail.com',
      password: 'cliente123',
    },
  } as const;

  const handleEmailChange = (value: string) => {
    setEmail(value);
    const profileEntry = Object.entries(demoProfiles).find(
      ([, profile]) => profile.email === value,
    );
    if (profileEntry) {
      const [, profile] = profileEntry;
      setPassword(profile.password);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setShowError(false);

    const success = await login(email, password);
    
    if (success) {
      toast.success('¡Bienvenido!', {
        description: 'Has iniciado sesión correctamente'
      });
    } else {
      setShowError(true);
      toast.error('Error de autenticación', {
        description: 'Credenciales incorrectas'
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4"> {/* Color personalizado */}
      <div className="w-full max-w-md">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img 
              src={logo} 
              alt="Logo Panadería Milagro" 
              className="w-32 h-32 object-cover rounded-full"
            />
          </div>
          <h1 className="text-3xl font-bold text-[#5D4037] mb-2 font-serif"> {/* Café más claro */}
            Panadería Milagro
          </h1>
          <p className="text-[#8D6E63]">
            Sabor artesanal en cada bocado
          </p>
        </div>

        {/* Card de login */}
        <Card className="border-2 shadow-lg bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl text-[#5D4037]">
              <LogIn className="w-6 h-6" />
              Iniciar Sesión
            </CardTitle>
            <CardDescription>
              Ingresa tus credenciales para acceder al sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  list="email-suggestions"
                  placeholder="correo@ejemplo.com"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleEmailChange(e.target.value)
                  }
                  required
                  className="h-11 border-gray-300 focus:border-[#3E2723] focus:ring-[#3E2723]"
                />
                <datalist id="email-suggestions">
                  <option value="admin@panaderia.com">Administrador</option>
                  <option value="empleado@panaderia.com">Empleado</option>
                  <option value="cliente@mail.com">Cliente</option>
                </datalist>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Contraseña</Label>
                  <a href="#" className="text-sm text-[#8D6E63] hover:text-[#5D4037] hover:underline" onClick={(e) => { e.preventDefault(); toast.info("Funcionalidad de recuperación próximamente"); }}>
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  required
                  className="h-11 border-gray-300 focus:border-[#3E2723] focus:ring-[#3E2723]"
                />
              </div>

              {showError && (
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <p>Credenciales incorrectas. Por favor, intenta de nuevo.</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-11 bg-[#8D6E63] hover:bg-[#A1887F] text-white font-medium"
                disabled={isLoading}
              >
                {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">O continúa con</span>
                </div>
              </div>

              <Button variant="outline" type="button" className="w-full h-11" onClick={() => toast.info('Funcionalidad de Google Login próximamente')}>
                <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                  <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                </svg>
                Google
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
