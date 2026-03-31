# PRD: User Manager - Sistema de Gestión de Usuarios

**Versión:** 1.0
**Fecha:** Enero 2025
**Cliente:** CAF
**Usuario:** Actren
**Autor:** Claude AI

---

## 1. Resumen Ejecutivo

El **User Manager** es un sistema web B2B para la gestión centralizada de usuarios y permisos dentro de la plataforma CAF. Permite a los administradores de empresas cliente (como Actren) gestionar los accesos de sus empleados a los diferentes productos de la plataforma: Fleet Management, E&D, Wayside y Advanced Analytics.

**Problema:** Actualmente la gestión de usuarios es manual, propensa a errores y no proporciona visibilidad sobre el uso de licencias contratadas.

**Solución:** Plataforma web centralizada con gestión de usuarios, roles y permisos granulares por producto, control de licencias y operaciones masivas.

**Impacto:** Reducción del 80% en tiempo de gestión de usuarios, eliminación de errores humanos, y visibilidad completa del uso de licencias.

---

## 2. Declaración del Problema

### Situación Actual

CAF es una compañía líder en soluciones ferroviarias que ofrece múltiples productos digitales:

1. **Fleet Management** - Gestión de flotas de trenes
2. **E&D (Energía y Dinámica)** - Análisis de consumo energético
3. **Wayside** - Monitoreo de vía
4. **Advanced Analytics** - Análisis avanzado y reportes

Los clientes corporativos (como Actren) necesitan gestionar cientos de usuarios con diferentes niveles de acceso a estos productos.

### Puntos de Dolor

| Punto de Dolor | Descripción | Impacto |
|----------------|-------------|----------|
| Gestión manual | Los administradores deben solicitar cambios por email/ticket | 2-3 días de espera |
| Sin visibilidad | No se sabe cuántos usuarios se han creado vs. licencia contratada | Sobrecostes en licencias |
| Errores humanos | Permisos asignados incorrectamente | Riesgo de seguridad |
| Operaciones masivas | Crear 50 usuarios uno por uno | 2+ horas de trabajo |
| Sin auditoría | No hay registro de quién cambió qué | Incumplimiento normativo |

### Usuarios Afectados

- **Administradores de TI**: Pierden tiempo gestionando usuarios manualmente
- **Empleados**: Esperan días para obtener acceso
- **Departamento de Compras**: No sabe si necesita más licencias
- **Auditores**: No pueden verificar quién tiene acceso a qué

### Impacto de Negocio

- **Costo operativo:** ~20 horas/mes en gestión de usuarios
- **Costo de licencias:** ~15% de licencias no utilizadas
- **Riesgo de seguridad:** Permisos incorrectos no detectados
- **Insatisfacción cliente:** Demora en acceso a herramientas

### ¿Por Qué Ahora?

- Migración de sistema legado a plataforma moderna
- Requerimiento de cumplimiento normativo (GDPR, ISO 27001)
- Expansión a nuevos clientes internacionales
- Competidores ofrecen soluciones similares

---

## 3. Objetivos y Métricas de Éxito

### Objetivo 1: Reducir tiempo de gestión de usuarios

**Métrica SMART:**
- Reducir el tiempo promedio de gestión de un usuario de **48 horas a 5 minutos**
- **Línea base actual:** 48 horas (promedio entre solicitud y acceso otorgado)
- **Objetivo:** 5 minutos (gestión auto-servicio)
- **Plazo:** 3 meses después del lanzamiento
- **Método de medición:** Tiempo entre creación de usuario y primer login exitoso

### Objetivo 2: Visibilidad completa de licencias

**Métrica SMART:**
- Dashboard en tiempo real de uso de licencias
- **Línea base actual:** 0% visibilidad (no se sabe cuántos usuarios activos)
- **Objetivo:** 100% visibilidad (usuarios activos vs. contratados)
- **Alerta:** Notificación al 80% de uso de licencia
- **Plazo:** Día 1 del lanzamiento

### Objetivo 3: Operaciones masivas eficientes

**Métrica SMART:**
- Cargar 100 usuarios en menos de 5 minutos
- **Línea base actual:** 2+ horas (uno por uno)
- **Objetivo:** 5 minutos (importación CSV)
- **Plazo:** Mes 1 del lanzamiento
- **Método de medición:** Tiempo de carga masiva con validación exitosa

### Objetivo 4: Cero errores de permisos

**Métrica SMART:**
- Reducir errores de asignación de permisos a 0%
- **Línea base actual:** ~8% de solicitudes de corrección por mes
- **Objetivo:** <0.5% (casi cero,允许 errores humanos raros)
- **Plazo:** Mes 2 del lanzamiento
- **Método de medición:** Solicitudes de corrección de permisos / total de cambios

### Objetivo 5: Auditoría completa

**Métrica SMART:**
- 100% de cambios registrados con usuario, fecha y motivo
- **Línea base actual:** 0% (sin registro)
- **Objetivo:** 100% trazabilidad
- **Plazo:** Día 1 del lanzamiento
- **Método de medición:** Bitácora de auditoría disponible para todos los cambios

---

## 4. Historias de Usuario

### Epic 1: Gestión de Usuarios

#### US-001: Listado de Usuarios

**Como** administrador de TI
**Quiero** ver un listado completo de usuarios con filtros avanzados
**Para** encontrar y gestionar usuarios rápidamente

**Criterios de Aceptación:**
- [ ] La página muestra todos los usuarios en una tabla
- [ ] Filtros disponibles: Búsqueda por nombre/email, Estado (Activo/Bloqueado), Flota, Producto, Pool (Cliente/CAF), Grupo
- [ ] Los filtros son combinables
- [ ] Paginación: 20 usuarios por página
- [ ] Ordenamiento por columnas (Nombre, Email, Estado, Último Acceso)
- [ ] Checkbox para selección múltiple de usuarios
- [ ] Cada fila muestra: Usuario, Nombre, Email, Grupo, Pool, Estado, Flotas, Productos, Último Acceso
- [ ] Estado visual con colores: Activo (verde), Bloqueado (rojo)

---

#### US-002: Crear Usuario Individual

**Como** administrador de TI
**Quiero** crear un nuevo usuario con todos sus datos
**Para** dar acceso a un empleado a la plataforma

**Criterios de Aceptación:**
- [ ] Botón "Añadir Usuario" en la lista de usuarios
- [ ] Formulario con campos: Nombre*, Email*, Usuario*, Grupo, Perfil, Departamento, Cargo
- [ ] Campos obligatorios marcados con *
- [ ] Validación de email único (no puede repetirse)
- [ ] Validación de formato de email
- [ ] Selección de productos: FM, E&D, Wayside, Analytics
- [ ] Para cada producto: Selección de Rol (Básico/Avanzado/Personalizado) y Flotas
- [ ] Selección de Pool: Cliente o CAF
- [ ] Checkbox "Enviar email de bienvenida"
- [ ] Botón "Cancelar" y "Guardar"
- [ ] Confirmación visual: "Usuario creado exitosamente"
- [ ] Si límite de licencia excedido: Mensaje de error y prevención

---

#### US-003: Editar Usuario

**Como** administrador de TI
**Quiero** modificar los datos de un usuario existente
**Para** actualizar su información o permisos

**Criterios de Aceptación:**
- [ ] Botón de editar (ícono de lápiz) en cada fila de usuario
- [ ] Mismo formulario que creación, pero con datos precargados
- [ ] Email no editable (para mantener consistencia)
- [ ] Todos los demás campos editables
- [ ] Registro de auditoría: "Modificado por [nombre] - [fecha/hora]"
- [ ] Confirmación: "Usuario actualizado exitosamente"

---

#### US-004: Bloquear/Desbloquear Usuario

**Como** administrador de TI
**Quiero** bloquear el acceso de un usuario temporalmente
**Para** revocar acceso inmediato en caso de seguridad o salida

**Criterios de Aceptación:**
- [ ] Botón de bloquear/desbloquear en cada fila
- [ ] Para usuarios activos: Botón de bloquear (ícono de prohibido)
- [ ] Para usuarios bloqueados: Botón de activar (ícono de check)
- [ ] Confirmación: "¿Estás seguro de bloquear a [usuario]?"
- [ ] Usuario bloqueado no puede hacer login
- [ ] Estado visual actualizado inmediatamente
- [ ] Registro de auditoría con motivo (opcional)

---

#### US-005: Eliminar Usuario

**Como** administrador de TI
**Quiero** eliminar un usuario que ya no trabaja en la empresa
**Para** mantener limpio el directorio activo

**Criterios de Aceptación:**
- [ ] Botón de eliminar (ícono de basura) en cada fila
- [ ] Confirmación: "¿Estás seguro de eliminar a [usuario]? Esta acción no se puede deshacer."
- [ ] Validación: No se puede eliminar si el usuario tiene activos asociados
- [ ] Usuario eliminado desaparece de la lista
- [ ] Registro de auditoría: "Eliminado por [nombre] - [fecha/hora]"
- [ ] Slot de licencia liberado inmediatamente

---

### Epic 2: Multi-Acciones

#### US-006: Selección Múltiple

**Como** administrador de TI
**Quiero** seleccionar varios usuarios a la vez
**Para** realizar acciones masivas

**Criterios de Aceptación:**
- [ ] Checkbox en la cabecera de la tabla selecciona/deselecciona todos
- [ ] Checkbox en cada fila para selección individual
- [ ] Contador de usuarios seleccionados: "X usuarios seleccionados"
- [ ] Botón "Multi-acciones" habilitado solo cuando 2+ usuarios seleccionados
- [ ] Resaltado visual de filas seleccionadas

---

#### US-007: Multi-Acciones Disponibles

**Como** administrador de TI
**Quiero** realizar acciones en múltiples usuarios simultáneamente
**Para** gestionar eficientemente cambios masivos

**Criterios de Aceptación:**
- [ ] Botón "Multi-acciones" abre diálogo con acciones disponibles:
  - [ ] Cambiar Estado (Bloquear/Activar seleccionados)
  - [ ] Cambiar Grupo (asignar a grupo específico)
  - [ ] Asignar Producto (añadir acceso a producto)
  - [ ] Revocar Producto (quitar acceso a producto)
  - [ ] Cambiar Rol (modificar rol en producto)
  - [ ] Exportar CSV (descargar datos de seleccionados)
- [ ] Previsualización: Lista de usuarios afectados
- [ ] Confirmación: "X usuarios serán afectados. ¿Continuar?"
- [ ] Progreso visual: "Procesando 3 de 25 usuarios..."
- [ ] Resumen: "X usuarios actualizados exitosamente, Y fallaron"

---

### Epic 3: Importación Masiva

#### US-008: Importar Usuarios desde Plantilla

**Como** administrador de TI
**Quiero** importar usuarios desde un archivo CSV o Excel
**Para** crear múltiples usuarios eficientemente

**Criterios de Aceptación:**
- [ ] Botón "Cargar Plantillas" en el menú lateral
- [ ] Opción: "Añadir usuarios" o "Modificar usuarios existentes"
- [ ] Descarga de plantilla CSV vacía con estructura correcta
- [ ] Campos requeridos en CSV: Nombre, Email, Usuario, Grupo, Perfil
- [ ] Campos opcionales: Departamento, Cargo, Teléfono
- [ ] Arrastrar archivo o hacer clic para seleccionar
- [ ] Validación previa: Mostrar usuarios detectados antes de importar
- [ ] Detección de errores: Filas con problemas marcadas en rojo
- [ ] Resumen: "X usuarios válidos, Y con errores, Z duplicados"
- [ ] Solo usuarios válidos se importan
- [ ] Opción: "Enviar email de bienvenida" (checkbox)
- [ ] Confirmación final: "¿Importar X usuarios?"

---

### Epic 4: Gestión de Roles y Permisos

#### US-009: Ver Roles por Producto

**Como** administrador de TI
**Quiero** ver todos los roles disponibles para cada producto
**Para** entender qué permisos puedo asignar

**Criterios de Aceptación:**
- [ ] Botón "Gestión de Roles" en menú lateral
- [ ] Tabs por producto: Fleet Management, E&D, Wayside, Advanced Analytics
- [ ] Para cada producto: Lista de roles del sistema (Básico, Avanzado)
- [ ] Para cada producto: Lista de roles personalizados
- [ ] Descripción de rol: "Acceso a [funcionalidades]"
- [ ] Lista de permisos específicos del rol

---

#### US-010: Crear Rol Personalizado

**Como** administrador de TI
**Quiero** crear un rol personalizado para cada producto
**Para** adaptar permisos a necesidades específicas de mi empresa

**Criterios de Aceptación:**
- [ ] Botón "Crear Rol" dentro de cada producto
- [ ] Campos: Nombre*, Descripción
- [ ] Checklist de permisos granulares específicos del producto:
  - **Fleet Management:** Alarmas Nivel 1-2, Todas las alarmas, Compartir eventos, Notificaciones
  - **E&D:** Ver datos, Exportar datos, Configurar parámetros
  - **Wayside:** Ver mediciones, Crear mediciones, Exportar reportes
  - **Analytics:** Ver dashboards, Crear dashboards, Exportar reportes, Configurar alertas
- [ ] Vista previa de permisos seleccionados
- [ ] Botón "Guardar" y "Cancelar"
- [ ] Rol creado aparece en lista de roles disponibles

---

#### US-011: Asignar Rol a Usuario

**Como** administrador de TI
**Quiero** asignar un rol específico a un usuario para un producto
**Para** dar el nivel de acceso correcto

**Criterios de Aceptación:**
- [ ] En edición de usuario, para cada producto: Dropdown de roles
- [ ] Roles disponibles: Básico, Avanzado, Personalizados
- [ ] Opción: "Sin acceso" (sin rol para ese producto)
- [ ] Para Fleet Management: Selección de flotas específicas
- [ ] Vista previa: "Este usuario tendrá acceso a [X]"
- [ ] Guardado actualiza permisos inmediatamente

---

### Epic 5: Control de Licencias

#### US-012: Ver Estado de Licencia

**Como** administrador de TI
**Quiero** ver cuántos usuarios he creado vs. mi licencia contratada
**Para** planificar contrataciones adicionales o optimizar uso

**Criterios de Aceptación:**
- [ ] Tarjeta visible en sidebar: "Licencia Contratada"
- [ ] Texto: "X usuarios de Y usuarios"
- [ ] Barra de progreso visual
- [ ] Colores: Verde (<80%), Amarillo (80-95%), Rojo (95-100%)
- [ ] En 90%: Banner de alerta: "Cerca del límite de licencia (X de Y usuarios)"
- [ ] En 100%: Banner de error: "Límite alcanzado. No se pueden crear más usuarios."
- [ ] En 100%: Botón "Añadir Usuario" deshabilitado

---

#### US-013: Dashboard de Licencias

**Como** responsable de compras
**Quiero** un dashboard detallado de uso de licencias
**Para** tomar decisiones informadas sobre contratación

**Criterios de Aceptación:**
- [ ] Página de Configuración → Licencias
- [ ] Gráfico de uso en el tiempo
- [ ] Desglose por Pool: Cliente vs. CAF
- [ ] Desglose por Producto: Usuarios con acceso a cada uno
- [ ] Lista de usuarios inactivos (>90 días sin login)
- [ ] Opción: "Exportar reporte"
- [ ] Recomendación: "Basado en tu uso, considera contratar X licencias adicionales"

---

### Epic 6: Vistas Personalizadas

#### US-014: Crear Vista Guardada

**Como** administrador de TI
**Quiero** guardar filtros que uso frecuentemente
**Para** acceder rápidamente a subsets específicos de usuarios

**Criterios de Aceptación:**
- [ ] Botón "Guardar Vista" después de aplicar filtros
- [ ] Input: "Nombre de esta vista"
- [ ] Vista guardada aparece en sidebar o menú desplegable
- [ ] Click en vista guardada restaura todos los filtros
- [ ] Máximo 10 vistas guardadas
- [ ] Opción: "Eliminar vista" (tooltip o menú contextual)
- [ ] Vistas son personales (no se comparten entre usuarios)

---

### Epic 7: Configuración General

#### US-015: Configuración de Organización

**Como** super-administrador
**Quiero** configurar los datos de mi organización
**Para** personalizar la experiencia

**Criterios de Aceptación:**
- [ ] Página "Configuración" → "Organización"
- [ ] Campos editables: Nombre de organización, Logo, Idioma por defecto
- [ ] Configuración de idiomas disponibles: Español, Inglés, Francés, Alemán
- [ ] Zona horaria
- [ ] Formato de números: Coma (1.234,56) o Punto (1,234.56)
- [ ] Botón "Guardar cambios"

---

#### US-016: Configuración de Notificaciones

**Como** administrador de TI
**Quiero** configurar qué notificaciones recibo
**Para** estar informado sin saturarme

**Criterios de Aceptación:**
- [ ] Página "Configuración" → "Notificaciones"
- [ ] Checklist de eventos:
  - [ ] Usuario creado (mi organización)
  - [ ] Usuario eliminado
  - [ ] Usuario bloqueado
  - [ ] Límite de licencia alcanzado (80%, 95%, 100%)
  - [ ] Rol modificado
- [ ] Canales: Email, Browser (toast)
- [ ] Frecuencia de resumen: Diaria, Semanal, Mensual
- [ ] Botón "Guardar preferencias"

---

## 5. Requisitos Funcionales

### RF-001: Listado de Usuarios (Prioridad: MUST)

El sistema DEBE mostrar una lista paginada de todos los usuarios de la organización con:

- Columnas: Usuario, Nombre, Email, Grupo, Pool, Estado, Flotas, Productos, Último Acceso, Acciones
- Filtros: Búsqueda texto libre, Estado, Flota, Producto, Pool, Grupo
- Ordenamiento por cualquier columna
- Selección múltiple con checkbox
- 20 usuarios por página por defecto
- Paginación con números de página

### RF-002: Creación de Usuario (Prioridad: MUST)

El sistema DEBE permitir crear un nuevo usuario con:

- Campos obligatorios: Nombre, Email, Usuario (username), Grupo
- Campos opcionales: Perfil, Departamento, Cargo, Teléfono
- Asignación de productos y roles
- Selección de Pool (Cliente/CAF)
- Selección de flotas (para Fleet Management)
- Validación de email único
- Validación de límite de licencia antes de crear
- Opción de enviar email de bienvenida

### RF-003: Edición de Usuario (Prioridad: MUST)

El sistema DEBE permitir editar un usuario existente con:

- Todos los campos editables excepto Email
- Mantener historial de cambios (auditoría)
- Actualización en tiempo real de permisos

### RF-004: Bloqueo de Usuario (Prioridad: MUST)

El sistema DEBE permitir bloquear temporalmente un usuario con:

- Confirmación previa
- Registro de motivo (opcional)
- Bloqueo inmediato de acceso
- Usuario bloqueado ve mensaje: "Tu cuenta ha sido suspendida. Contacta a tu administrador."

### RF-005: Eliminación de Usuario (Prioridad: MUST)

El sistema DEBE permitir eliminar un usuario con:

- Confirmación de doble clic
- Validación de activos asociados
- Liberación inmediata de slot de licencia
- Registro en auditoría

### RF-006: Multi-Acciones (Prioridad: SHOULD)

El sistema DEBE permitir realizar acciones en múltiples usuarios simultáneamente:

- Cambio de estado (bloquear/activar)
- Cambio de grupo
- Asignación/revocación de productos
- Cambio de roles
- Exportación a CSV
- Mínimo 2 usuarios, máximo 50 usuarios por operación

### RF-007: Importación Masiva (Prioridad: MUST)

El sistema DEBE permitir importar usuarios desde CSV con:

- Plantilla descargable con estructura correcta
- Validación previa a importación
- Detección de errores fila por fila
- Importación solo de filas válidas
- Opción de enviar email de bienvenida
- Límite de 100 usuarios por importación

### RF-008: Gestión de Roles por Producto (Prioridad: MUST)

El sistema DEBE ofrecer roles predefinidos para cada producto:

- **Fleet Management**: Básico, Avanzado
  - Básico: Alarmas Nivel 1-2, Compartir eventos
  - Avanzado: Todas las alarmas, Todas las funciones

- **E&D**: Básico, Avanzado
  - Básico: Ver datos
  - Avanzado: Ver, Exportar, Configurar

- **Wayside**: Básico, Avanzado
  - Básico: Ver mediciones
  - Avanzado: Ver, Crear, Exportar

- **Advanced Analytics**: Básico, Avanzado
  - Básico: Ver dashboards
  - Avanzado: Ver, Crear, Exportar, Configurar alertas

### RF-009: Roles Personalizados (Prioridad: SHOULD)

El sistema DEBE permitir crear roles personalizados con:

- Nombre y descripción
- Selección granular de permisos del producto
- Hasta 20 roles personalizados por producto por organización

### RF-010: Control de Licencias (Prioridad: MUST)

El sistema DEBE mostrar en todo momento:

- Usuarios activos vs. límite contratado
- Alerta visual al 80% de uso
- Prevención de creación al 100% de uso
- Desglose por Pool (Cliente vs CAF)

### RF-011: Auditoría (Prioridad: MUST)

El sistema DEBE registrar todos los cambios con:

- Usuario que realizó el cambio
- Fecha y hora (UTC)
- Tipo de cambio (creación, modificación, eliminación, bloqueo)
- Motivo (cuando aplica)
- Antes y después (para cambios de permisos)

### RF-012: Búsqueda y Filtros (Prioridad: MUST)

El sistema DEBE ofrecer:

- Búsqueda texto libre por: Nombre, Email, Usuario
- Filtro por Estado: Activo, Bloqueado, Todos
- Filtro por Flota
- Filtro por Producto
- Filtro por Pool: Cliente, CAF, Todos
- Filtro por Grupo

### RF-013: Exportación a CSV (Prioridad: SHOULD)

El sistema DEBE permitir exportar:

- Todos los usuarios o solo seleccionados
- Formato CSV con encoding UTF-8
- Todas las columnas visibles
- Fecha de exportación en nombre de archivo

### RF-014: Vistas Guardadas (Prioridad: COULD)

El sistema DEBE permitir guardar filtros como vistas:

- Hasta 10 vistas por usuario
- Nombre personalizable
- Acceso rápido desde sidebar o dropdown
- Eliminación de vistas

## 6. Requisitos No Funcionales

### RNF-001: Performance

- Tiempo de carga de lista de usuarios: < 500ms (hasta 500 usuarios)
- Tiempo de búsqueda/filtro: < 200ms
- Tiempo de creación de usuario: < 1 segundo
- Tiempo de importación (100 usuarios): < 10 segundos
- Tiempo de respuesta de API: p95 < 200ms

### RNF-002: Seguridad

- Autenticación requerida para todas las páginas
- Sesiones expiran después de 30 minutos de inactividad
- Mínimo 8 caracteres para contraseñas, con complejidad requerida
- HTTPS obligatorio en producción
- Todas las operaciones auditadas
- RBAC (Role-Based Access Control) para todas las operaciones

### RNF-003: Escalabilidad

- Soportar hasta 10,000 usuarios por organización
- Soportar hasta 100 organizaciones
- Soportar hasta 1,000 usuarios concurrentes
- Tiempo de respuesta degradado gracefully bajo carga

### RNF-004: Confiabilidad

- Uptime objetivo: 99.5% (4 horas downtime/mes)
- Backups diarios de base de datos
- Plan de recuperación ante desastres

### RNF-005: Compatibilidad

- Navegadores soportados: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- Dispositivos: Desktop (1920px+), Tablet (768px+)
- NO soporte móvil en primera versión

### RNF-006: Accesibilidad

- WCAG 2.1 AA compliance
- Navegación por teclado
- Contraste mínimo 4.5:1
- Textos descriptivos en botones e iconos

## 7. Consideraciones Técnicas

### Stack Tecnológico Propuesto

- **Frontend:** React 18+ con TypeScript
- **UI Library:** shadcn/ui (Radix UI + Tailwind CSS)
- **Estado:** React Context o Zustand
- **Backend:** Node.js con Express o Next.js API Routes
- **Base de Datos:** PostgreSQL
- **ORM:** Prisma
- **Autenticación:** JWT o NextAuth
- **Auditoría:** Bitácora en PostgreSQL

### API Endpoints Propuestos

```
GET    /api/users              - Listar usuarios (con filtros)
POST   /api/users              - Crear usuario
GET    /api/users/:id          - Obtener usuario
PUT    /api/users/:id          - Actualizar usuario
DELETE /api/users/:id          - Eliminar usuario
PATCH  /api/users/:id/status   - Bloquear/desbloquear
POST   /api/users/bulk         - Multi-acciones
POST   /api/users/import       - Importar CSV
GET    /api/roles              - Listar roles
POST   /api/roles              - Crear rol
GET    /api/roles/:id          - Obtener rol
PUT    /api/roles/:id          - Actualizar rol
GET    /api/license            - Estado de licencia
GET    /api/audit              - Bitácora de auditoría
```

### Esquema de Base de Datos (Propuesto)

```sql
-- Tabla principal de usuarios
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  profile VARCHAR(100),
  grupo VARCHAR(100),
  department VARCHAR(255),
  position VARCHAR(255),
  pool_client VARCHAR(20) NOT NULL, -- 'CLIENTE' or 'CAF'
  status VARCHAR(20) NOT NULL DEFAULT 'activo', -- 'activo', 'bloqueado'
  language VARCHAR(5) DEFAULT 'es',
  number_format VARCHAR(10) DEFAULT 'comma',
  client_id UUID NOT NULL REFERENCES clients(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  created_by VARCHAR(255),
  last_access TIMESTAMP
);

-- Permisos de productos por usuario
CREATE TABLE user_product_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id VARCHAR(50) NOT NULL, -- 'FM', 'ED', 'WS', 'AA'
  role_id VARCHAR(100),
  fleet_ids JSONB, -- Array of fleet IDs
  created_at TIMESTAMP DEFAULT NOW()
);

-- Roles personalizados
CREATE TABLE custom_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id),
  product_id VARCHAR(50) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  permissions JSONB NOT NULL,
  is_system BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  created_by VARCHAR(255)
);

-- Auditoría
CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR(255) NOT NULL,
  target_user_id UUID REFERENCES users(id),
  action VARCHAR(50) NOT NULL, -- 'create', 'update', 'delete', 'block', 'unblock'
  before_data JSONB,
  after_data JSONB,
  reason TEXT,
  ip_address INET,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 8. Roadmap de Implementación

### Fase 1: Fundamentos (Semanas 1-3)

- **Sprint 1:** Setup del proyecto, autenticación, layout base
- **Sprint 2:** Modelo de datos, API básica, listado de usuarios
- **Sprint 3:** Creación y edición de usuarios

**Entregables:**
- Usuario puede autenticarse
- Usuario puede ver lista de usuarios
- Usuario puede crear/editar usuarios básicos

### Fase 2: Gestión Avanzada (Semanas 4-6)

- **Sprint 4:** Bloqueo/eliminación, filtros y búsqueda
- **Sprint 5:** Roles y permisos por producto
- **Sprint 6:** Control de licencias

**Entregables:**
- CRUD completo de usuarios
- Sistema de roles funcional
- Dashboard de licencias visible

### Fase 3: Operaciones Masivas (Semanas 7-8)

- **Sprint 7:** Multi-acciones
- **Sprint 8:** Importación desde CSV

**Entregables:**
- Multi-acciones funcionales
- Importación masiva operativa

### Fase 4: Vistas y Configuración (Semanas 9-10)

- **Sprint 9:** Vistas personalizadas
- **Sprint 10:** Configuración general, auditoría

**Entregables:**
- Sistema completo con todas las funcionalidades
- Auditoría implementada

## 9. Alcance (Out of Scope)

**NO está incluido en este PRD:**

- Aplicación móvil nativa (puede ser fase 2)
- SSO con proveedores externos (Okta, Azure AD, etc.)
- Gestión de contraseñas por parte del usuario (self-service)
- Aprobación de solicitudes de acceso (workflow)
- Integración con sistemas de provisioning externos
- Migración automática desde sistemas legados
- Reportes avanzados de analytics

**Considerado para futuras versiones:**

- API pública para integraciones
- Webhooks para eventos de usuario
- Customización de branding por cliente

## 10. Preguntas Abiertas y Riesgos

### Preguntas Abiertas

| Pregunta | Propietario | Prioridad |
|----------|--------------|------------|
| ¿El límite de licencia es por producto o global? | Producto | Alta |
| ¿Los usuarios del Pool CAF cuentan contra la licencia? | No | Alta |
| ¿Qué pasa con los activos de un usuario eliminado? | Arquitectura | Alta |
| ¿Soportaremos múltiples organizaciones en una misma instancia? | Arquitectura | Media |

### Riesgos y Mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|---------|------------|
| Importación masiva falle | Media | Alto | Validación previa + rollback |
| Performance con 10k usuarios | Baja | Alto | Paginación + índices BD |
| Usuario sobrepasa límite de licencia | Alta | Medio | Prevención en UI |
| Conflicto de roles personalizados | Baja | Medio | Reglas de precedencia claras |

## 11. Puntos de Validación

### Checkpoint 1 (Post Fase 1 - Semana 3)

**Validar:**
- [ ] Un administrador puede crear 5 usuarios en menos de 5 minutos
- [ ] El listado de usuarios carga en < 500ms
- [ ] Los filtros funcionan correctamente

### Checkpoint 2 (Post Fase 2 - Semana 6)

**Validar:**
- [ ] El dashboard de licencias muestra datos correctos
- [ ] La alerta de 80% de licencia aparece
- [ ] No se pueden crear usuarios al 100% de licencia
- [ ] Roles y permisos funcionan como especificado

### Checkpoint 3 (Post Fase 3 - Semana 8)

**Validar:**
- [ ] Se pueden importar 100 usuarios en < 10 segundos
- [ ] Las multi-acciones funcionan correctamente
- [ ] La auditoría registra todos los cambios

### Checkpoint 4 (Post Fase 4 - Semana 10)

**Validar:**
- [ ] Todas las funcionalidades del PRD están implementadas
- [ ] No hay bugs críticos
- [ ] El sistema pasa pruebas de seguridad básicas

---

## Copywriting - Textos de la Interfaz

### Navegación Principal

| Elemento | Texto |
|----------|-------|
| Título App | **LeadMind** |
| Título Sidebar | **User Manager** |
| Label Organización | **Organización** |
| Placeholder Org | **Seleccionar organización** |
| Tarjeta Licencia | **Licencia Contratada** |
| Texto Licencia | **X usuarios de Y usuarios** |

### Menú Lateral

| Elemento | Texto |
|----------|-------|
| Item 1 | **Listado de usuarios** |
| Item 2 | **Gestión de roles** |
| Item 3 | **Plantillas** |
| Item 4 | **Vistas** |
| Item 5 | **Multi acciones** |
| Item 6 | **Configuración** |

### Botones de Acción

| Elemento | Texto |
|----------|-------|
| Crear | **Añadir Usuario** |
| Multi | **Multi-acciones** |
| Exportar | **Descargar CSV** |
| Editar | **Editar** (tooltip) |
| Bloquear | **Bloquear** (tooltip) |
| Activar | **Activar** (tooltip) |
| Eliminar | **Eliminar** (tooltip) |

### Filtros

| Elemento | Texto |
|----------|-------|
| Búsqueda | **Buscar usuario...** |
| Estado | **Estado** → Todos, Activo, Bloqueado |
| Flotas | **Flotas** → Todas las flotas |
| Productos | **Productos** → Todos los productos |
| Pool | **Pool** → Todos, Cliente, CAF |
| Grupo | **Grupo** → Todos los grupos |

### Estados

| Estado | Texto | Color |
|--------|-------|-------|
| Activo | **Activo** | Verde (#28a745) |
| Bloqueado | **Bloqueado** | Rojo (#dc3545) |

### Mensajes de Confirmación

| Acción | Texto |
|--------|-------|
| Crear | **¿Crear usuario?** |
| Editar | **¿Guardar cambios?** |
| Bloquear | **¿Bloquear usuario?** Perderá acceso inmediatamente. |
| Eliminar | **¿Eliminar usuario?** Esta acción no se puede deshacer. |
| Importar | **¿Importar X usuarios?** |

### Mensajes de Éxito

| Acción | Texto |
|--------|-------|
| Crear | **Usuario creado exitosamente** |
| Editar | **Usuario actualizado** |
| Bloquear | **Usuario bloqueado** |
| Activar | **Usuario activado** |
| Eliminar | **Usuario eliminado** |
| Importar | **X usuarios importados correctamente** |

### Mensajes de Error

| Situación | Texto |
|-----------|-------|
| Email duplicado | **Este email ya existe** |
| Límite alcanzado | **Límite de licencia alcanzado. No se pueden crear más usuarios.** |
| Campos faltantes | **Por favor completa todos los campos obligatorios** |
| Importar error | **La importación falló. Por favor verifica el archivo.** |
| Red | **Error de conexión. Por favor intenta nuevamente.** |

### Alertas

| Situación | Texto |
|-----------|-------|
| 80% licencia | **Cerca del límite de licencia (X de Y usuarios)** |
| 95% licencia | **Atención: Solo quedan X licencias disponibles** |
| 100% licencia | **Límite alcanzado. Contacta a soporte.** |

### Placeholder de Búsqueda

| Elemento | Texto |
|----------|-------|
| General | **Buscar...** |
| Usuario | **Buscar usuario...** |
| Rol | **Buscar rol...** |

### Textos Vacíos

| Situación | Texto |
|-----------|-------|
| Sin usuarios | **No se encontraron usuarios** |
| Sin roles | **No hay roles personalizados** |
| Sin filtros | **No se aplicaron filtros** |
| Sin resultados | **No se encontraron resultados para tu búsqueda** |

### Tooltips

| Elemento | Texto |
|----------|-------|
| Info | **Más información** |
| Ayuda | **Obtener ayuda** |
| Configurar | **Configurar** |
| Exportar | **Exportar a CSV** |
| Seleccionar todo | **Seleccionar todos** |

---

**Aprobado por:** [Nombre]
**Fecha de aprobación:** [Fecha]
**Firma electrónica:** _________________
