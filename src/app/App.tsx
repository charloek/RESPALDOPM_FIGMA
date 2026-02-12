import { Toaster } from "sonner";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Login } from "./components/Login";
import { ClienteDashboard } from "./components/cliente/ClienteDashboard";
import { EmpleadoDashboard } from "./components/empleado/EmpleadoDashboard";
import { AdministradorDashboard } from "./components/administrador/AdministradorDashboard";

function AppContent() {
  const { user, isAuthenticated } = useAuth();

  // Si no está autenticado, mostrar login
  if (!isAuthenticated || !user) {
    return <Login />;
  }

  // Renderizar dashboard según el rol del usuario
  switch (user.role) {
    case 'cliente':
      return <ClienteDashboard />;
    case 'empleado':
      return <EmpleadoDashboard />;
    case 'administrador':
      return <AdministradorDashboard />;
    default:
      return <Login />;
  }
}

export default function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" richColors />
      <AppContent />
    </AuthProvider>
  );
}
