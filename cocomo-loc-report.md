# COCOMO LOC Snapshot (12-Feb-2026)

## Resumen
- Total de lineas en el proyecto (sin node_modules): **15,066** en 60 archivos.
- Lineas orientadas a codigo (tsx + ts + css + html + mjs, excluyendo assets/binarios y lockfiles): **4,718** (~4.7 KLOC base para COCOMO).
- Archivos binarios/recursos que inflan LOC (no recomendados para COCOMO): 2 PNG (5,850 lineas contadas), 1 SVG (14 lineas), dist compilado.
- Lockfiles y artefactos generados: package-lock.json (3,824), dist assets (382+).

## Desglose por extension
| Extension | Archivos | Lineas |
|-----------|----------|--------|
| .png | 2 | 5,850 |
| .tsx | 32 | 4,133 |
| .json | 3 | 3,886 |
| .ts | 8 | 371 |
| .js | 1 | 368 |
| .md | 4 | 229 |
| .css | 5 | 174 |
| .html | 2 | 25 |
| .mjs | 1 | 15 |
| .svg | 1 | 14 |
| .gitignore | 1 | 1 |

> Sugerencia: para COCOMO usar solo codigo fuente (.tsx, .ts, .css, .html, .mjs) y excluir binarios (.png/.svg) y artefactos (.json de lock, dist/).

## Top archivos por LOC (sin contar PNG/lock/dist)
- [src/app/components/administrador/AdminInsumos.tsx](src/app/components/administrador/AdminInsumos.tsx) — 306
- [src/app/components/administrador/AdminReportes.tsx](src/app/components/administrador/AdminReportes.tsx) — 273
- [src/app/components/empleado/EmpleadoSolicitudes.tsx](src/app/components/empleado/EmpleadoSolicitudes.tsx) — 269
- [src/app/components/administrador/AdminProductos.tsx](src/app/components/administrador/AdminProductos.tsx) — 268
- [src/app/components/administrador/AdminEmpleados.tsx](src/app/components/administrador/AdminEmpleados.tsx) — 260
- [src/app/components/EditOrderDialog.tsx](src/app/components/EditOrderDialog.tsx) — 243
- [src/app/components/cliente/ClienteCarrito.tsx](src/app/components/cliente/ClienteCarrito.tsx) — 233
- [src/app/components/administrador/AdministradorDashboard.tsx](src/app/components/administrador/AdministradorDashboard.tsx) — 207
- [src/app/components/administrador/AdminPedidos.tsx](src/app/components/administrador/AdminPedidos.tsx) — 167
- [src/app/components/cliente/ClienteDashboard.tsx](src/app/components/cliente/ClienteDashboard.tsx) — 164

## Estructura de programacion (carpetas principales)
- Aplicacion React en [src/app](src/app): vistas y logica principal.
- Componentes UI reutilizables en [src/app/components/ui](src/app/components/ui): inputs, dialogs, selects, tabs, etc.
- Modulos por rol: administrador ([src/app/components/administrador](src/app/components/administrador)), cliente ([src/app/components/cliente](src/app/components/cliente)), empleado ([src/app/components/empleado](src/app/components/empleado)).
- Contexto de autenticacion en [src/app/contexts/AuthContext.tsx](src/app/contexts/AuthContext.tsx) y tipos en [src/app/types](src/app/types).
- Datos mock/semilla en [src/app/data](src/app/data).
- Estilos en [src/styles](src/styles) y assets en [src/assets](src/assets).

## Nota rapida para COCOMO
- KLOC base recomendada: 4.7 (excluyendo binarios y artefactos).
- Formula basica: $E = a \times (KLOC)^b$ donde $E$ es el esfuerzo en persona-meses, $a$ y $b$ dependen del modo de proyecto.
- Si se prefiere excluir CSS/HTML, la base solo TS/TSX es $4.133 + 0.371 = 4.504$ KLOC.

Generado automaticamente sin incluir node_modules.
