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
import { Plus, Pencil, Trash2, Mail, Phone, Calendar, UserCheck, UserX } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { INITIAL_EMPLOYEES, Employee } from '@/app/data/mockData';

export function AdminEmpleados() {
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [isCreating, setIsCreating] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    hireDate: ''
  });

  const handleOpenCreate = () => {
    setFormData({ name: '', email: '', phone: '', role: '', hireDate: '' });
    setIsCreating(true);
  };

  const handleOpenEdit = (employee: Employee) => {
    setFormData({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      role: employee.role,
      hireDate: employee.hireDate
    });
    setEditingEmployee(employee);
  };

  const handleClose = () => {
    setIsCreating(false);
    setEditingEmployee(null);
    setFormData({ name: '', email: '', phone: '', role: '', hireDate: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingEmployee) {
      setEmployees(employees.map(emp =>
        emp.id === editingEmployee.id
          ? { ...emp, ...formData }
          : emp
      ));
      toast.success('Empleado actualizado', {
        description: `${formData.name} ha sido actualizado`
      });
    } else {
      const newEmployee: Employee = {
        id: `emp-${Date.now()}`,
        ...formData,
        status: 'active'
      };
      setEmployees([...employees, newEmployee]);
      toast.success('Empleado creado', {
        description: `${formData.name} ha sido agregado al equipo`
      });
    }

    handleClose();
  };

  const handleToggleStatus = (employeeId: string) => {
    setEmployees(employees.map(emp =>
      emp.id === employeeId
        ? { ...emp, status: emp.status === 'active' ? 'inactive' as const : 'active' as const }
        : emp
    ));
    toast.success('Estado actualizado');
  };

  const handleDelete = (employee: Employee) => {
    if (confirm(`¿Estás seguro de eliminar a ${employee.name}?`)) {
      setEmployees(employees.filter(emp => emp.id !== employee.id));
      toast.success('Empleado eliminado', {
        description: `${employee.name} ha sido eliminado del sistema`
      });
    }
  };

  const activeEmployees = employees.filter(e => e.status === 'active').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Gestión de Empleados
          </h2>
          <p className="text-gray-600 mt-1">
            {activeEmployees} empleados activos de {employees.length} total
          </p>
        </div>
        <Button onClick={handleOpenCreate} size="lg" className="bg-[#3E2723] hover:bg-[#5D4037]">
          <Plus className="w-5 h-5 mr-2" />
          Nuevo Empleado
        </Button>
      </div>

      {/* Grid de empleados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map(employee => (
          <Card key={employee.id} className="shadow-sm border-gray-200">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg text-gray-900">{employee.name}</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">{employee.role}</p>
                </div>
                <Badge className={
                  employee.status === 'active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }>
                  {employee.status === 'active' ? 'Activo' : 'Inactivo'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>{employee.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{employee.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>
                    Ingreso: {format(new Date(employee.hireDate), "d 'de' MMMM 'de' yyyy")}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-3 border-t">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenEdit(employee)}
                    className="flex-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200"
                  >
                    <Pencil className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(employee)}
                    className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Eliminar
                  </Button>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleStatus(employee.id)}
                    className={`w-full ${employee.status === 'active' ? 'text-orange-600 hover:text-orange-700 hover:bg-orange-50' : 'text-green-600 hover:text-green-700 hover:bg-green-50'}`}
                  >
                    {employee.status === 'active' ? (
                      <>
                        <UserX className="w-4 h-4 mr-2" />
                        Desactivar
                      </>
                    ) : (
                      <>
                        <UserCheck className="w-4 h-4 mr-2" />
                        Activar
                      </>
                    )}
                  </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog de crear/editar */}
      <Dialog open={isCreating || !!editingEmployee} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingEmployee ? 'Editar Empleado' : 'Nuevo Empleado'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre Completo</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej: Juan Pérez"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="empleado@panaderia.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="555-1234"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Puesto</Label>
              <Input
                id="role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="Ej: Panadero, Repostero, Cajero"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hireDate">Fecha de Ingreso</Label>
              <Input
                id="hireDate"
                type="date"
                value={formData.hireDate}
                onChange={(e) => setFormData({ ...formData, hireDate: e.target.value })}
                required
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1 bg-[#3E2723] hover:bg-[#5D4037]">
                {editingEmployee ? 'Guardar Cambios' : 'Crear Empleado'}
              </Button>
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancelar
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
