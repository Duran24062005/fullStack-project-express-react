# StockFlow Backend - Documentación de Arquitectura

## 📋 Tabla de Contenidos

1. [Visión General](#visión-general)
2. [Estructura de Archivos](#estructura-de-archivos)
3. [Tecnologías y Dependencias](#tecnologías-y-dependencias)
4. [Arquitectura del Sistema](#arquitectura-del-sistema)
5. [Modelos de Datos](#modelos-de-datos)
6. [API Endpoints](#api-endpoints)
7. [Autenticación y Autorización](#autenticación-y-autorización)
8. [Flujos de Trabajo](#flujos-de-trabajo)
9. [Validaciones](#validaciones)
10. [Manejo de Errores](#manejo-de-errores)
11. [Configuración y Variables de Entorno](#configuración-y-variables-de-entorno)
12. [Buenas Prácticas Implementadas](#buenas-prácticas-implementadas)

---

## 🎯 Visión General

**StockFlow Backend** es una API RESTful construida con Node.js y Express que proporciona servicios de gestión de inventario para pequeños negocios. El sistema maneja productos, movimientos de stock, usuarios con roles, y genera alertas automáticas cuando el inventario está bajo.

### Características Principales

- ✅ CRUD completo de productos
- ✅ Gestión de stock en tiempo real
- ✅ Sistema de alertas automáticas
- ✅ Historial completo de movimientos
- ✅ Autenticación JWT con roles (admin/empleado)
- ✅ Dashboard con métricas de negocio
- ✅ Validaciones robustas
- ✅ Manejo centralizado de errores

---

## 📁 Estructura de Archivos

```
stockflow-backend/
├── config/
│   └── database.js          # Configuración de conexión a MongoDB
│
├── models/
│   ├── User.js              # Modelo de usuarios
│   ├── Product.js           # Modelo de productos
│   └── Movement.js          # Modelo de movimientos de inventario
│
├── controllers/
│   ├── authController.js    # Lógica de autenticación
│   ├── userController.js    # Lógica de gestión de usuarios
│   ├── productController.js # Lógica de gestión de productos
│   ├── movementController.js# Lógica de movimientos
│   └── dashboardController.js# Lógica de métricas y reportes
│
├── routes/
│   ├── authRoutes.js        # Rutas de autenticación
│   ├── userRoutes.js        # Rutas de usuarios
│   ├── productRoutes.js     # Rutas de productos
│   ├── movementRoutes.js    # Rutas de movimientos
│   └── dashboardRoutes.js   # Rutas de dashboard
│
├── middleware/
│   ├── authMiddleware.js    # Verificación de JWT
│   ├── roleMiddleware.js    # Verificación de roles
│   ├── validationMiddleware.js # Validaciones
│   └── errorMiddleware.js   # Manejo de errores
│
├── utils/
│   ├── AppError.js          # Clase personalizada de errores
│   ├── validators.js        # Funciones de validación
│   └── helpers.js           # Funciones auxiliares
│
├── .env                     # Variables de entorno
├── .gitignore              # Archivos ignorados por git
├── package.json            # Dependencias del proyecto
└── server.js               # Punto de entrada de la aplicación
```

---

## 🛠 Tecnologías y Dependencias

### Dependencias Principales

```json
{
  "express": "^4.18.2", // Framework web
  "mongoose": "^7.0.0", // ODM para MongoDB
  "bcryptjs": "^2.4.3", // Encriptación de contraseñas
  "jsonwebtoken": "^9.0.0", // Autenticación JWT
  "dotenv": "^16.0.3", // Variables de entorno
  "cors": "^2.8.5", // CORS para frontend
  "express-validator": "^7.0.1", // Validaciones
  "helmet": "^7.0.0", // Seguridad HTTP headers
  "express-rate-limit": "^6.7.0" // Limitación de requests
}
```

### Dependencias de Desarrollo

```json
{
  "nodemon": "^2.0.22" // Auto-reload en desarrollo
}
```

---

## 🏗 Arquitectura del Sistema

### Patrón MVC en Capas

```
┌─────────────┐
│   Cliente   │
│  (React)    │
└──────┬──────┘
       │ HTTP Requests
       ▼
┌─────────────────────────────────────┐
│          CAPA DE RUTAS              │
│  (Routes - Definición endpoints)    │
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│       CAPA DE MIDDLEWARE            │
│  (Auth, Validación, Roles)          │
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│      CAPA DE CONTROLADORES          │
│  (Lógica de negocio, Orquestación)  │
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│        CAPA DE MODELOS              │
│  (Mongoose Models - Esquemas)       │
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│          BASE DE DATOS              │
│          (MongoDB)                  │
└─────────────────────────────────────┘
```

### Responsabilidades por Capa

**1. Routes (Rutas)**

- Definición de endpoints
- Asociación de rutas con controladores
- Aplicación de middlewares específicos

**2. Middleware**

- Autenticación (verificar JWT)
- Autorización (verificar roles)
- Validación de datos de entrada
- Manejo de errores

**3. Controllers (Controladores)**

- Lógica de negocio
- Orquestación de operaciones
- Procesamiento de datos
- Respuestas al cliente

**4. Models (Modelos)**

- Definición de esquemas
- Validaciones a nivel de base de datos
- Métodos de instancia y estáticos
- Hooks (pre/post save, etc.)

---

## 🗄 Modelos de Datos

### User (Usuario)

```javascript
{
  nombre: String,           // Nombre completo
  email: String,            // Email único
  password: String,         // Hash de contraseña
  rol: String,              // 'admin' o 'empleado'
  activo: Boolean,          // Estado del usuario
  createdAt: Date          // Fecha de creación
}
```

**Métodos:**

- `comparePassword(password)`: Compara contraseña con hash
- Pre-save hook: Encripta password antes de guardar

### Product (Producto)

```javascript
{
  codigo: String,           // Código único del producto
  nombre: String,           // Nombre del producto
  descripcion: String,      // Descripción opcional
  categoria: String,        // Categoría del producto
  precio: Number,           // Precio de venta
  costo: Number,            // Costo de adquisición
  stock: Number,            // Cantidad actual en stock
  stockMinimo: Number,      // Nivel mínimo de alerta
  unidadMedida: String,     // 'unidad', 'kg', 'litro', etc.
  proveedor: String,        // Nombre del proveedor
  activo: Boolean,          // Estado del producto
  createdAt: Date,         // Fecha de creación
  updatedAt: Date          // Última actualización
}
```

**Métodos virtuales:**

- `margenGanancia`: Calcula (precio - costo) / costo \* 100
- `valorInventario`: Calcula stock \* costo
- `necesitaReabastecimiento`: Retorna true si stock <= stockMinimo

### Movement (Movimiento)

```javascript
{
  producto: ObjectId,       // Referencia al producto
  tipo: String,             // 'entrada', 'salida', 'ajuste'
  cantidad: Number,         // Cantidad del movimiento
  stockAnterior: Number,    // Stock antes del movimiento
  stockNuevo: Number,       // Stock después del movimiento
  motivo: String,           // Razón del movimiento
  usuario: ObjectId,        // Usuario que realizó el movimiento
  fecha: Date,             // Fecha del movimiento
  notas: String            // Notas adicionales opcionales
}
```

**Población automática:**

- Se hace `populate` de `producto` y `usuario` en queries

---

## 🔌 API Endpoints

### Base URL

```
http://localhost:5000/api
```

### Autenticación

| Método | Endpoint                | Descripción             | Auth | Rol   |
| ------ | ----------------------- | ----------------------- | ---- | ----- |
| POST   | `/auth/register`        | Registrar nuevo usuario | ❌   | -     |
| POST   | `/auth/login`           | Iniciar sesión          | ❌   | -     |
| GET    | `/auth/me`              | Obtener usuario actual  | ✅   | Todos |
| PUT    | `/auth/update-password` | Actualizar contraseña   | ✅   | Todos |

**Ejemplo Request - Login:**

```json
POST /api/auth/login
{
  "email": "admin@stockflow.com",
  "password": "123456"
}
```

**Ejemplo Response:**

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "nombre": "Admin Usuario",
    "email": "admin@stockflow.com",
    "rol": "admin"
  }
}
```

---

### Usuarios

| Método | Endpoint                   | Descripción                | Auth | Rol   |
| ------ | -------------------------- | -------------------------- | ---- | ----- |
| GET    | `/users`                   | Listar todos los usuarios  | ✅   | Admin |
| GET    | `/users/:id`               | Obtener usuario por ID     | ✅   | Admin |
| POST   | `/users`                   | Crear nuevo usuario        | ✅   | Admin |
| PUT    | `/users/:id`               | Actualizar usuario         | ✅   | Admin |
| DELETE | `/users/:id`               | Eliminar usuario           | ✅   | Admin |
| PUT    | `/users/:id/toggle-status` | Activar/desactivar usuario | ✅   | Admin |

**Ejemplo Request - Crear Usuario:**

```json
POST /api/users
Headers: { "Authorization": "Bearer {token}" }
{
  "nombre": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "password": "password123",
  "rol": "empleado"
}
```

---

### Productos

| Método | Endpoint           | Descripción                  | Auth | Rol   |
| ------ | ------------------ | ---------------------------- | ---- | ----- |
| GET    | `/products`        | Listar productos con filtros | ✅   | Todos |
| GET    | `/products/:id`    | Obtener producto por ID      | ✅   | Todos |
| POST   | `/products`        | Crear nuevo producto         | ✅   | Admin |
| PUT    | `/products/:id`    | Actualizar producto          | ✅   | Admin |
| DELETE | `/products/:id`    | Eliminar producto            | ✅   | Admin |
| GET    | `/products/alerts` | Productos con stock bajo     | ✅   | Todos |
| GET    | `/products/search` | Buscar productos             | ✅   | Todos |

**Query Params para GET /products:**

- `categoria`: Filtrar por categoría
- `activo`: true/false - Filtrar por estado
- `minStock`: Filtrar productos con stock menor a valor
- `search`: Búsqueda por nombre o código
- `sort`: Campo de ordenamiento (nombre, precio, stock)
- `order`: asc/desc - Orden ascendente o descendente
- `page`: Número de página (paginación)
- `limit`: Productos por página (default: 50)

**Ejemplo Request - Crear Producto:**

```json
POST /api/products
Headers: { "Authorization": "Bearer {token}" }
{
  "codigo": "PROD001",
  "nombre": "Laptop HP",
  "descripcion": "Laptop HP 15.6 pulgadas",
  "categoria": "Electrónica",
  "precio": 800,
  "costo": 600,
  "stock": 10,
  "stockMinimo": 3,
  "unidadMedida": "unidad",
  "proveedor": "TechSupply"
}
```

**Ejemplo Response:**

```json
{
  "success": true,
  "data": {
    "id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "codigo": "PROD001",
    "nombre": "Laptop HP",
    "precio": 800,
    "stock": 10,
    "necesitaReabastecimiento": false,
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### Movimientos de Inventario

| Método | Endpoint                        | Descripción                    | Auth | Rol   |
| ------ | ------------------------------- | ------------------------------ | ---- | ----- |
| GET    | `/movements`                    | Listar movimientos             | ✅   | Todos |
| GET    | `/movements/:id`                | Obtener movimiento por ID      | ✅   | Todos |
| POST   | `/movements/entrada`            | Registrar entrada de stock     | ✅   | Todos |
| POST   | `/movements/salida`             | Registrar salida de stock      | ✅   | Todos |
| POST   | `/movements/ajuste`             | Registrar ajuste de inventario | ✅   | Admin |
| GET    | `/movements/product/:productId` | Historial de un producto       | ✅   | Todos |

**Query Params para GET /movements:**

- `tipo`: entrada/salida/ajuste
- `producto`: ID del producto
- `usuario`: ID del usuario
- `fechaDesde`: Fecha inicio (ISO format)
- `fechaHasta`: Fecha fin (ISO format)
- `page`: Número de página
- `limit`: Movimientos por página (default: 50)

**Ejemplo Request - Registrar Venta (Salida):**

```json
POST /api/movements/salida
Headers: { "Authorization": "Bearer {token}" }
{
  "producto": "64a1b2c3d4e5f6g7h8i9j0k1",
  "cantidad": 2,
  "motivo": "Venta a cliente"
}
```

**Ejemplo Response:**

```json
{
  "success": true,
  "data": {
    "id": "64b1c2d3e4f5g6h7i8j9k0l1",
    "tipo": "salida",
    "cantidad": 2,
    "stockAnterior": 10,
    "stockNuevo": 8,
    "motivo": "Venta a cliente",
    "fecha": "2024-01-15T14:30:00.000Z",
    "producto": {
      "nombre": "Laptop HP",
      "codigo": "PROD001"
    }
  },
  "alert": null // o mensaje de alerta si stock quedó bajo
}
```

**Ejemplo Request - Registrar Entrada:**

```json
POST /api/movements/entrada
Headers: { "Authorization": "Bearer {token}" }
{
  "producto": "64a1b2c3d4e5f6g7h8i9j0k1",
  "cantidad": 20,
  "motivo": "Compra a proveedor TechSupply"
}
```

**Ejemplo Request - Ajuste de Inventario:**

```json
POST /api/movements/ajuste
Headers: { "Authorization": "Bearer {token}" }
{
  "producto": "64a1b2c3d4e5f6g7h8i9j0k1",
  "cantidad": 15,
  "motivo": "Inventario físico - corrección",
  "notas": "Se encontraron 15 unidades en bodega"
}
```

---

### Dashboard y Reportes

| Método | Endpoint                  | Descripción                | Auth | Rol   |
| ------ | ------------------------- | -------------------------- | ---- | ----- |
| GET    | `/dashboard/stats`        | Estadísticas generales     | ✅   | Todos |
| GET    | `/dashboard/top-products` | Productos más vendidos     | ✅   | Todos |
| GET    | `/dashboard/low-stock`    | Productos con stock bajo   | ✅   | Todos |
| GET    | `/dashboard/categories`   | Estadísticas por categoría | ✅   | Admin |
| GET    | `/dashboard/value`        | Valor total del inventario | ✅   | Admin |

**Ejemplo Response - Stats:**

```json
GET /api/dashboard/stats
{
  "success": true,
  "data": {
    "totalProductos": 150,
    "productosActivos": 145,
    "productosAlerta": 12,
    "valorInventario": 45000,
    "categorias": 8,
    "movimientosHoy": 23,
    "ventasHoy": 15,
    "entradasHoy": 8
  }
}
```

**Ejemplo Response - Top Products:**

```json
GET /api/dashboard/top-products?limit=5
{
  "success": true,
  "data": [
    {
      "producto": {
        "id": "64a1...",
        "nombre": "Laptop HP",
        "codigo": "PROD001"
      },
      "totalVendido": 45,
      "valorTotal": 36000
    },
    // ... más productos
  ]
}
```

---

## 🔐 Autenticación y Autorización

### Flujo de Autenticación JWT

```
1. Usuario envía credenciales (email + password)
2. Backend valida credenciales
3. Backend genera token JWT firmado
4. Cliente almacena token (localStorage/sessionStorage)
5. Cliente incluye token en header de requests:
   Authorization: Bearer {token}
6. Middleware verifica y decodifica token
7. Si válido, request continúa
8. Si inválido/expirado, retorna error 401
```

### Estructura del Token JWT

```javascript
{
  payload: {
    id: "64a1b2c3d4e5f6g7h8i9j0k1",
    rol: "admin"
  },
  expiresIn: "7d"  // Configurable en .env
}
```

### Middleware de Autenticación

**authMiddleware.js** - Protege rutas que requieren autenticación:

```javascript
// Verifica que exista token
// Valida y decodifica JWT
// Añade req.user con datos del usuario
// Si falla, retorna 401 Unauthorized
```

**roleMiddleware.js** - Protege rutas por rol:

```javascript
// Verifica que req.user.rol coincida con rol requerido
// Si no coincide, retorna 403 Forbidden
```

### Ejemplo de Protección de Rutas

```javascript
// Solo autenticados
router.get("/products", protect, productController.getAll);

// Solo admins
router.post(
  "/products",
  protect,
  restrictTo("admin"),
  productController.create,
);

// Admins y empleados específicos
router.post("/movements/entrada", protect, movementController.entrada);
```

---

## 🔄 Flujos de Trabajo

### 1. Registro de Venta (Salida de Stock)

```
Cliente (Frontend)
  │
  │ POST /api/movements/salida
  │ { producto, cantidad, motivo }
  ▼
authMiddleware
  │ Verifica JWT
  ▼
Validaciones
  │ - Cantidad > 0
  │ - Producto existe
  ▼
movementController.salida
  │
  ├─> Obtiene producto actual
  │
  ├─> Verifica stock disponible
  │   ├─ stock < cantidad? → ERROR 400
  │   └─ stock >= cantidad → Continúa
  │
  ├─> Crea registro de movimiento
  │   - tipo: 'salida'
  │   - stockAnterior: stock actual
  │   - stockNuevo: stock - cantidad
  │
  ├─> Actualiza stock del producto
  │   - producto.stock -= cantidad
  │
  ├─> Verifica alerta
  │   - stockNuevo <= stockMinimo?
  │   └─ Genera mensaje de alerta
  │
  └─> Retorna movimiento + alerta
      ▼
Cliente recibe respuesta
  - Actualiza UI
  - Muestra alerta si existe
```

### 2. Entrada de Mercancía

```
Cliente (Frontend)
  │
  │ POST /api/movements/entrada
  │ { producto, cantidad, motivo }
  ▼
authMiddleware
  │ Verifica JWT
  ▼
Validaciones
  │ - Cantidad > 0
  │ - Producto existe
  ▼
movementController.entrada
  │
  ├─> Obtiene producto actual
  │
  ├─> Crea registro de movimiento
  │   - tipo: 'entrada'
  │   - stockAnterior: stock actual
  │   - stockNuevo: stock + cantidad
  │
  ├─> Actualiza stock del producto
  │   - producto.stock += cantidad
  │
  └─> Retorna movimiento
      ▼
Cliente recibe confirmación
  - Actualiza UI
  - Refresca lista de productos
```

### 3. Ajuste de Inventario (Solo Admin)

```
Cliente (Frontend - Admin)
  │
  │ POST /api/movements/ajuste
  │ { producto, cantidad, motivo, notas }
  ▼
authMiddleware + roleMiddleware
  │ Verifica JWT + Rol Admin
  ▼
Validaciones
  │ - Cantidad >= 0
  │ - Producto existe
  │ - Motivo obligatorio
  ▼
movementController.ajuste
  │
  ├─> Obtiene producto actual
  │
  ├─> Crea registro de movimiento
  │   - tipo: 'ajuste'
  │   - stockAnterior: stock actual
  │   - stockNuevo: cantidad (stock absoluto)
  │   - notas: justificación
  │
  ├─> Establece nuevo stock
  │   - producto.stock = cantidad
  │
  └─> Retorna movimiento
      ▼
Cliente recibe confirmación
  - Actualiza UI
  - Registra auditoría
```

---

## ✅ Validaciones

### Niveles de Validación

**1. Validación en Modelo (Mongoose Schema)**

```javascript
// Validaciones básicas de tipo y formato
nombre: {
  type: String,
  required: [true, 'Mensaje de error'],
  minlength: [3, 'Mínimo 3 caracteres'],
  trim: true
}
```

**2. Validación en Middleware (express-validator)**

```javascript
// Validaciones de lógica de negocio
(body("email").isEmail().withMessage("Email inválido"),
  body("stock").isInt({ min: 0 }).withMessage("Stock no puede ser negativo"));
```

**3. Validación en Controlador**

```javascript
// Validaciones de reglas de negocio complejas
if (producto.stock < cantidad) {
  throw new AppError("Stock insuficiente", 400);
}
```

### Validaciones por Entidad

**Usuario:**

- Email único y formato válido
- Password mínimo 6 caracteres
- Rol debe ser 'admin' o 'empleado'
- Nombre requerido

**Producto:**

- Código único
- Precio y costo >= 0
- Stock >= 0
- Stock mínimo >= 0
- Categoría requerida

**Movimiento:**

- Cantidad > 0 (excepto ajustes)
- Producto debe existir
- Stock suficiente para salidas
- Motivo requerido
- Usuario válido

---

## ⚠️ Manejo de Errores

### Clase AppError Personalizada

```javascript
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
  }
}
```

### Middleware Global de Errores

```javascript
// errorMiddleware.js
// Captura todos los errores y los formatea
// Diferencia entre errores operacionales y de programación
// En desarrollo: stack trace completo
// En producción: mensajes genéricos
```

### Tipos de Errores Manejados

**Errores Operacionales (esperados):**

- 400 Bad Request: Datos inválidos
- 401 Unauthorized: No autenticado
- 403 Forbidden: Sin permisos
- 404 Not Found: Recurso no existe
- 409 Conflict: Código/email duplicado

**Errores de Programación (inesperados):**

- 500 Internal Server Error
- Se registran en logs
- Mensaje genérico al cliente en producción

### Formato de Respuesta de Error

```json
{
  "success": false,
  "error": {
    "message": "Stock insuficiente para realizar la venta",
    "statusCode": 400,
    "stack": "..." // Solo en desarrollo
  }
}
```

---

## ⚙️ Configuración y Variables de Entorno

### Archivo .env

```bash
# Puerto del servidor
PORT=5000

# MongoDB
MONGODB_URI=mongodb://localhost:27017/stockflow

# JWT
JWT_SECRET=cambiar_por_clave_secreta_super_segura_en_produccion
JWT_EXPIRE=7d

# Entorno
NODE_ENV=development  # o 'production'

# CORS (opcional)
FRONTEND_URL=http://localhost:3000
```

### Variables Requeridas

| Variable    | Descripción                    | Valor por defecto |
| ----------- | ------------------------------ | ----------------- |
| PORT        | Puerto del servidor            | 5000              |
| MONGODB_URI | Conexión a MongoDB             | -                 |
| JWT_SECRET  | Clave secreta para JWT         | -                 |
| JWT_EXPIRE  | Tiempo de expiración del token | 7d                |
| NODE_ENV    | Entorno de ejecución           | development       |

### Configuración de Base de Datos

```javascript
// config/database.js
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
```

---

## ✨ Buenas Prácticas Implementadas

### 1. Arquitectura

- ✅ Separación de responsabilidades (MVC)
- ✅ Código modular y reutilizable
- ✅ Middleware para cross-cutting concerns
- ✅ Configuración centralizada

### 2. Seguridad

- ✅ Encriptación de contraseñas (bcrypt)
- ✅ Autenticación JWT
- ✅ Protección de rutas por rol
- ✅ Helmet para headers HTTP seguros
- ✅ Rate limiting para prevenir ataques
- ✅ Validación de inputs
- ✅ CORS configurado

### 3. Base de Datos

- ✅ Schemas con validaciones
- ✅ Índices en campos únicos
- ✅ Población automática de referencias
- ✅ Métodos virtuales para cálculos
- ✅ Hooks pre/post save

### 4. API Design

- ✅ REST compliant
- ✅ Versionado preparado
- ✅ Respuestas consistentes
- ✅ Códigos de estado HTTP correctos
- ✅ Paginación en listados
- ✅ Filtros y búsqueda
- ✅ Ordenamiento

### 5. Manejo de Errores

- ✅ Errores centralizados
- ✅ Clase de error personalizada
- ✅ Mensajes descriptivos
- ✅ Stack traces en desarrollo
- ✅ Logs de errores

### 6. Código Limpio

- ✅ Nombres descriptivos
- ✅ Funciones pequeñas y enfocadas
- ✅ DRY (Don't Repeat Yourself)
- ✅ Comentarios cuando necesario
- ✅ Async/await para asincronía

### 7. Escalabilidad

- ✅ Preparado para múltiples clientes
- ✅ Separación frontend/backend
- ✅ Fácil agregar nuevas features
- ✅ Configuración por ambiente

---

## 🚀 Comandos de Ejecución

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev  # Con nodemon (auto-reload)
```

### Producción

```bash
npm start
```

### Crear Usuario Admin Inicial

```bash
# Usar endpoint POST /api/auth/register
# O crear script seed para poblar BD inicial
```

---

## 📊 Próximas Mejoras (Opcional)

- [ ] Testing (Jest + Supertest)
- [ ] Documentación con Swagger
- [ ] Logger profesional (Winston)
- [ ] Caché con Redis
- [ ] Respaldo automático de BD
- [ ] Notificaciones por email
- [ ] Export de reportes PDF/Excel
- [ ] Gestión de múltiples sucursales
- [ ] Sistema de permisos granular
- [ ] Integración con pasarelas de pago

---

## 📝 Notas Finales

Este backend está diseñado para ser:

- **Completo**: Cubre todos los requisitos funcionales
- **Seguro**: Implementa mejores prácticas de seguridad
- **Escalable**: Fácil de extender con nuevas funcionalidades
- \*\*Manten
