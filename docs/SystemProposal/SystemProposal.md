# Propuesta de Proyecto: Sistema de Gestión de Inventario para Pequeños Negocios

## 1. Idea del Proyecto

**Nombre:** StockFlow - Sistema de Gestión de Inventario Inteligente

## 2. Problema que Resuelve

Los pequeños negocios (tiendas, almacenes, mini-mercados) enfrentan dificultades para:

- Controlar el stock de productos en tiempo real
- Saber cuándo reabastecer productos antes de quedarse sin existencias
- Identificar productos de baja rotación que ocupan espacio
- Registrar entradas y salidas de mercancía de forma organizada
- Generar reportes simples de ventas y movimientos
- Gestionar múltiples usuarios (dueño, empleados) con diferentes permisos

Actualmente, muchos pequeños comerciantes usan hojas de papel, Excel desorganizado, o simplemente memoria, lo que genera:

- Pérdidas por desabastecimiento
- Dinero atrapado en productos sin rotación
- Falta de visibilidad sobre la rentabilidad
- Dificultad para delegar control del inventario

## 3. Tipo de Usuario

**Usuarios principales:**

- **Administrador/Dueño:** Control total, acceso a reportes, configuración del negocio
- **Empleado/Vendedor:** Registro de ventas, consulta de stock, operaciones diarias

**Características del usuario:**

- Usuario no técnico
- Necesita interfaz simple e intuitiva
- Requiere acceso desde diferentes dispositivos (PC, tablet, móvil)
- Valora velocidad en operaciones cotidianas

## 4. Objetivos del Sistema

### Objetivos Funcionales:

1. **CRUD completo de productos** con información detallada
2. **Gestión de stock en tiempo real** (entradas, salidas, ajustes)
3. **Sistema de alertas** cuando productos lleguen a stock mínimo
4. **Registro de movimientos** (historial de todas las operaciones)
5. **Autenticación y autorización** por roles (admin/empleado)
6. **Dashboard con métricas clave** (productos más vendidos, alertas, valor del inventario)
7. **Búsqueda y filtrado** ágil de productos

### Objetivos Técnicos:

- Arquitectura escalable que permita agregar funcionalidades
- Separación clara de responsabilidades (frontend/backend)
- API RESTful bien diseñada
- Validaciones robustas en ambos lados
- Manejo profesional de errores
- Estado consistente entre cliente y servidor

## 5. Justificación Técnica del Stack

### ¿Por qué Frontend + Backend separados?

**Frontend (React):**

- Interfaz dinámica e interactiva necesaria para operaciones en tiempo real
- Múltiples vistas y navegación fluida (productos, movimientos, dashboard, configuración)
- Actualización de UI sin recargar página (cuando se registra una venta, el stock debe actualizarse instantáneamente)
- Componentes reutilizables (formularios, tablas, tarjetas de productos)
- Gestión de estado complejo (productos, usuarios, filtros, alertas)

**Backend (Node.js + Express):**

- Lógica de negocio centralizada (cálculos de stock, validaciones, reglas de negocio)
- Punto único de acceso a datos (seguridad, consistencia)
- Autenticación y autorización
- Validaciones del lado del servidor (nunca confiar solo en el cliente)
- Procesamiento de operaciones complejas (reportes, cálculos agregados)
- Escalabilidad: múltiples clientes (web, futura app móvil) usando la misma API

**MongoDB:**

- Flexibilidad en el esquema (diferentes tipos de productos pueden tener atributos variables)
- Documentos anidados útiles para historial de movimientos
- Buen rendimiento en operaciones de lectura (consultas frecuentes de stock)
- Relaciones lógicas sin complejidad de SQL para este caso de uso

## 6. ¿Por qué es más que un CRUD trivial?

Aunque incluye operaciones CRUD básicas, el sistema añade:

1. **Lógica de negocio compleja:**
   - Actualización automática de stock según movimientos
   - Cálculo de alertas basado en stock mínimo
   - Validaciones de negocio (no permitir ventas si no hay stock)
   - Cálculo de métricas (valor total del inventario, rotación)

2. **Múltiples entidades relacionadas:**
   - Productos
   - Movimientos de inventario
   - Usuarios
   - Categorías
   - Proveedores (opcional)

3. **Características avanzadas:**
   - Autenticación y autorización por roles
   - Sistema de alertas en tiempo real
   - Dashboard con estadísticas agregadas
   - Historial y auditoría de operaciones
   - Búsqueda y filtrado multicriteria

4. **Flujos de trabajo realistas:**
   - Registro de venta → actualización de stock → verificación de alertas
   - Entrada de mercancía → validación → actualización de inventario
   - Ajustes de inventario → justificación → registro de cambios

---

## Estado Actual

**Estamos en:** Propuesta y justificación del proyecto

**Siguiente paso:** Si apruebas esta idea, procederemos al diseño arquitectónico completo del sistema, incluyendo:

- Arquitectura general (capas, flujo de datos)
- Diseño del backend (estructura, endpoints, responsabilidades)
- Diseño del frontend (vistas, componentes, flujo de navegación)
- Diseño de base de datos (colecciones, relaciones)
- Buenas prácticas a aplicar
