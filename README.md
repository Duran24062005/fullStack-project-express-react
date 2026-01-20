<div align="center">
  <h1>Fullstack Project – Express + React + MongoDB</h1>
  <p>Arquitectura de software escalable y mantenible</p>
</div>

# StockFlow - Sistema de Gestión de Inventario Inteligente

## 📋 Descripción

StockFlow es un sistema completo de gestión de inventario diseñado para pequeños negocios (tiendas, almacenes, mini-mercados). Permite controlar el stock de productos en tiempo real, registrar movimientos de inventario, generar alertas de reabastecimiento y obtener métricas clave del negocio.

## 🎯 Objetivo del Proyecto

Este proyecto es desarrollado con fines de práctica y aprendizaje de desarrollo full stack profesional, aplicando:

- Arquitectura de software escalable y mantenible
- Separación clara de responsabilidades (frontend/backend/base de datos)
- Buenas prácticas de desarrollo (SOLID, DRY, validaciones múltiples capas)
- Autenticación y autorización por roles
- Diseño de APIs RESTful
- Gestión de estado en aplicaciones React
- Operaciones CRUD completas con lógica de negocio real

El objetivo es simular un proyecto profesional real que resuelve un problema concreto, yendo más allá de un CRUD básico.

## 🚀 Tecnologías Utilizadas

### Backend

- **Node.js** - Entorno de ejecución de JavaScript del lado del servidor
- **Express** - Framework web minimalista y flexible para Node.js
  - _¿Por qué?_ Simplicidad, gran ecosistema, excelente para APIs RESTful

### Frontend

- **React** - Librería de JavaScript para construir interfaces de usuario
  - _¿Por qué?_ Componentes reutilizables, virtual DOM, gran comunidad

### Base de Datos

- **MongoDB** - Base de datos NoSQL orientada a documentos
  - _¿Por qué?_ Flexibilidad en esquemas, excelente rendimiento en lecturas, documentos JSON nativos

### Herramientas Adicionales

- **Mongoose** - ODM (Object Data Modeling) para MongoDB
- **JWT (JSON Web Tokens)** - Autenticación stateless
- **bcrypt** - Encriptación de contraseñas
- **Yarn** - Gestor de paquetes

## ✨ Funcionalidades Principales

### Gestión de Productos

- CRUD completo de productos
- Control de stock en tiempo real
- Categorización de productos
- Alertas de stock mínimo
- Búsqueda y filtrado avanzado

### Gestión de Movimientos

- Registro de entradas (compras/reabastecimiento)
- Registro de salidas (ventas)
- Ajustes de inventario
- Historial completo de movimientos
- Trazabilidad por usuario

### Sistema de Usuarios

- Autenticación con JWT
- Roles: Administrador y Empleado
- Control de acceso por permisos
- Gestión de usuarios (solo admin)

### Dashboard y Reportes

- Métricas del inventario (valor total, cantidad de productos)
- Productos con bajo stock
- Productos más vendidos
- Actividad reciente

## 📁 Estructura del Proyecto

```
stockflow/
├── backend/              # Servidor Node.js + Express
│   ├── src/
│   │   ├── config/      # Configuraciones (DB, environment)
│   │   ├── controllers/ # Controladores de rutas
│   │   ├── middlewares/ # Middlewares (auth, validación, errores)
│   │   ├── models/      # Modelos de Mongoose
│   │   ├── routes/      # Definición de rutas
│   │   ├── services/    # Lógica de negocio
│   │   ├── utils/       # Utilidades
│   │   └── validators/  # Validadores de datos
│   ├── index.js         # Punto de entrada del servidor
│   ├── .env             # Variables de entorno (no incluido en git)
│   ├── .env.example     # Ejemplo de variables de entorno
│   ├── package.json     # Dependencias del backend
│   ├── README.md        # Documentación del backend
│   └── yarn.lock        # Lock file de Yarn
│
├── frontend/            # Aplicación React
│   ├── public/          # Archivos estáticos
│   └── src/
│       ├── assets/      # Imágenes, iconos, recursos
│       ├── components/  # Componentes reutilizables
│       ├── context/     # Context API para estado global
│       ├── hooks/       # Custom hooks
│       ├── pages/       # Páginas/vistas principales
│       ├── services/    # Servicios para comunicación con API
│       ├── utils/       # Utilidades del frontend
│       ├── app.css      # Estilos globales
│       ├── app.tsx      # Componente raíz
│       ├── index.css    # Estilos base
│       └── main.tsx     # Punto de entrada
│   ├── index.html       # HTML principal
│   ├── package.json     # Dependencias del frontend
│   ├── README.md        # Documentación del frontend
│   ├── tsconfig.json    # Configuración de TypeScript
│   ├── vite.config.ts   # Configuración de Vite
│   └── yarn.lock        # Lock file de Yarn
│
├── docs/                # Documentación del proyecto
│   └── helper/          # Documentos auxiliares
│       ├── IA_prompts.md        # Prompts utilizados con IA
│       ├── SystemProposal.md    # Propuesta inicial del sistema
│       ├── Architecture.md      # Documentación de arquitectura
│       └── SystemArtifacts.md   # Artefactos del sistema
│
├── node_modules/        # Dependencias (generado automáticamente)
├── .gitignore           # Archivos ignorados por Git
├── package.json         # Configuración raíz del monorepo
├── README.md            # Este archivo (documentación principal)
└── yarn.lock            # Lock file de Yarn (raíz)
```

## 🛠️ Instalación

### Prerrequisitos

- Node.js (v14 o superior)
- MongoDB (v4.4 o superior)
- Yarn

### Pasos de Instalación

1. **Clonar el repositorio**

```bash
git clone <url-del-repositorio>
cd stockflow
```

2. **Instalar dependencias**

Puedes instalar las dependencias de todo el proyecto desde la raíz:

```bash
yarn install
```

O instalar cada parte por separado:

```bash
# Backend
cd backend
yarn install

# Frontend
cd frontend
yarn install
```

3. **Configurar variables de entorno**

Crear archivo `.env` en la carpeta `backend/`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/stockflow
JWT_SECRET=tu_clave_secreta_muy_segura
NODE_ENV=development
```

4. **Iniciar MongoDB**

Asegúrate de que MongoDB esté ejecutándose en tu sistema local.

## 🚀 Ejecución del Proyecto

### Opción 1: Iniciar Todo el Proyecto (Recomendado)

Desde la raíz del proyecto:

```bash
yarn dev
```

Esto iniciará automáticamente el backend y el frontend en paralelo.

### Opción 2: Iniciar Backend y Frontend por Separado

**Backend** (en una terminal):

```bash
cd backend
yarn dev
```

El servidor estará corriendo en `http://localhost:5000`

**Frontend** (en otra terminal):

```bash
cd frontend
yarn dev
```

La aplicación estará disponible en `http://localhost:3000`

## 🔐 Usuarios de Prueba

Una vez que ejecutes el proyecto, puedes usar estos usuarios de prueba (si se implementa seed de datos):

**Administrador:**

- Email: admin@stockflow.com
- Password: admin123

**Empleado:**

- Email: empleado@stockflow.com
- Password: empleado123

## 📚 API Endpoints

### Autenticación

```
POST   /api/auth/login          - Iniciar sesión
POST   /api/auth/register       - Registrar usuario (admin)
GET    /api/auth/me             - Obtener usuario actual
```

### Productos

```
GET    /api/products            - Listar productos
GET    /api/products/:id        - Obtener producto por ID
POST   /api/products            - Crear producto
PUT    /api/products/:id        - Actualizar producto
DELETE /api/products/:id        - Eliminar producto
```

### Movimientos

```
GET    /api/movements           - Listar movimientos
POST   /api/movements           - Registrar movimiento
GET    /api/movements/:id       - Obtener movimiento por ID
```

### Dashboard

```
GET    /api/dashboard/stats     - Estadísticas generales
GET    /api/dashboard/alerts    - Alertas de stock bajo
GET    /api/dashboard/top-products - Productos más vendidos
```

### Usuarios

```
GET    /api/users               - Listar usuarios (admin)
PUT    /api/users/:id           - Actualizar usuario
DELETE /api/users/:id           - Desactivar usuario
```

## 🏗️ Arquitectura

El proyecto sigue una **arquitectura de 3 capas**:

1. **Capa de Presentación (Frontend - React)**
   - Interfaz de usuario
   - Gestión de estado local y global
   - Comunicación con API

2. **Capa de Lógica de Negocio (Backend - Node.js/Express)**
   - API RESTful
   - Autenticación y autorización
   - Validaciones
   - Lógica de negocio (cálculos de stock, alertas)

3. **Capa de Datos (MongoDB)**
   - Persistencia de datos
   - Colecciones: products, movements, users, categories

## 🎨 Principios de Desarrollo Aplicados

- **Separación de Responsabilidades**: Cada capa tiene un propósito específico
- **SOLID**: Aplicado en servicios y controladores
- **DRY**: Componentes y funciones reutilizables
- **Validación Múltiple**: Frontend (UX) + Backend (seguridad) + Base de datos (integridad)
- **Seguridad**: JWT, bcrypt, sanitización de datos, control de acceso por roles

## 🔮 Posibles Mejoras Futuras

- [ ] Implementación de tests (unitarios, integración, E2E)
- [ ] Reportes en PDF
- [ ] Notificaciones por email
- [ ] Múltiples almacenes/sucursales
- [ ] Gráficas avanzadas con Chart.js
- [ ] Aplicación móvil usando la misma API
- [ ] Sistema de órdenes de compra automatizadas
- [ ] Integración con proveedores

## 📝 Notas de Desarrollo

Este proyecto está en desarrollo como ejercicio de aprendizaje. El código puede no estar optimizado para producción y se irá mejorando iterativamente.

## 👨‍💻 Autor

Desarrollado como proyecto de práctica profesional en desarrollo full stack.

## 📄 Licencia

Este proyecto es de código abierto y está disponible para fines educativos.
