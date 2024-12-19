# Inventario de Stock

## Descripción General
Sistema de gestión de inventario que permite administrar productos, sus cantidades, precios y categorías. Facilita el seguimiento y control del stock mediante operaciones CRUD (Crear, Leer, Actualizar y Eliminar productos).

## Tecnologías Utilizadas
- **React + Vite**: Framework principal para el desarrollo frontend, elegido por su rendimiento y rápida configuración
- **Material-UI**: Biblioteca de componentes UI para un diseño consistente y responsive
- **Redux Toolkit**: Manejo del estado global de la aplicación, especialmente para el formulario de productos
- **React Router**: Navegación entre diferentes vistas de la aplicación
- **React Toastify**: Para notificaciones al usuario

## Funcionalidades Principales

### Gestión de Productos
- Crear nuevos productos con validación de campos
- Actualizar información de productos existentes
- Eliminar productos
- Filtrar productos por categoría

### Formulario de Productos
Campos disponibles:
- Nombre del producto
- Cantidad
- Precio
- Categoría
- Descripción
- Fecha de entrada (solo en modo edición)

### Notificaciones
El sistema incluye notificaciones toast para:
- Éxito en operaciones CRUD
- Errores de validación
- Errores de API


## Arquitectura

La aplicación sigue una arquitectura modular y organizada por características:

# Estructura del Proyecto

Este proyecto está organizado en carpetas y archivos para facilitar el desarrollo y mantenimiento. A continuación, se detalla la estructura del directorio `src/` y la funcionalidad de cada sección:

```plaintext
src/
├── app/                        # Configuración de Redux
│   └── store.js               # Configuración central de la Store con productFormReducer
│
├── components/                 # Componentes reutilizables
│   ├── CreateProduct.jsx      # Formulario para crear nuevos productos
│   ├── FormProduct.jsx        # Componente base compartido para formularios de productos
│   └── Layout.jsx             # Layout principal con AppBar y Drawer
│
├── features/                   # Características específicas
│   └── productForm/           # Manejo del estado del formulario con Redux Toolkit
│       └── productFormSlice.js
│
├── pages/                      # Páginas principales de la aplicación
│   ├── Home.jsx               # Página principal con un botón de navegación
│   ├── Inventory.jsx          # Vista del inventario con tabla y filtros avanzados
│   └── NotFound.jsx           # Página para errores 404
│
├── services/                   # Servicios y lógica de interacción con la API
│   └── productService.js      # Funciones CRUD para productos (create, read, update, delete)
│
└── themes/                     # Configuración de estilos personalizados
    └── theme.js               # Tema personalizado utilizando Material-UI
```

### Descripción de la Arquitectura

- La arquitectura está diseñada para ser escalable y mantenible, separando claramente las responsabilidades:
  - **Components**: Componentes reutilizables de UI
  - **Features**: Lógica de negocio específica por característica
  - **Services**: Capa de servicios para comunicación con API
  - **Pages**: Componentes de nivel superior para cada ruta
  - **Themes**: Configuración centralizada de estilos

## API Endpoints

### Autenticación
- Requerida para operaciones de escritura mediante API_KEY en header

### Operaciones Disponibles
- Obtener productos
- Filtrar por categoría
- Crear producto
- Actualizar producto
- Eliminar producto

### Estructura de Datos
Los productos contienen información como nombre, precio, cantidad, categoría y descripción.

### Configuración
Requiere las siguientes variables de entorno:

VITE_API_URL=<url_api>
VITE_API_KEY=api_key

## Cómo Ejecutar el Proyecto

1. Clonar el repositorio:
```bash
git clone https://github.com/martinsarasola/inventario-stock.git
```

2. Instalar dependencias:
```bash
cd inventario-stock
npm install
```

3. Configurar variables de entorno: Crear archivo .env en la raíz del proyecto:
```bash
VITE_API_URL=url_api
VITE_API_KEY=api_key
```

4. Ejecutar en modo desarrollo:
```bash
npm run dev
```

5. Acceder a la aplicación: La aplicación estará disponible en http://localhost:5173

## Capturas de pantalla
### Pantalla de inicio
![Captura de pantalla 2024-12-18 221233](https://github.com/user-attachments/assets/54c7e82f-45d8-4584-8748-e60e2cb57bdf)

### Vista de inventario con productos:
![Captura de pantalla 2024-12-18 223133](https://github.com/user-attachments/assets/656750ac-6648-403a-8169-a9e88b9a7b81)

![Captura de pantalla 2024-12-18 223642](https://github.com/user-attachments/assets/67d5d6c7-e85d-42a7-a2d1-076ad1c21782)

### Vista de inventario con productos filtrados por categoría:
![Captura de pantalla 2024-12-18 223318](https://github.com/user-attachments/assets/490ffba2-6a80-4f35-9f61-b1a1b08dfafe)

### Formulario de creación de producto:
![Captura de pantalla 2024-12-18 223224](https://github.com/user-attachments/assets/ffe86726-c6b5-40b0-ab1f-35db574714da)


### Vista de edición de producto:
![Captura de pantalla 2024-12-18 223357](https://github.com/user-attachments/assets/6fb8ee1a-9854-4cfc-ae6d-f0e3eab52d2a)

## Contacto
José Martín Sarasola - martin.sarasola01@hotmail.com
Link del Proyecto: [https://github.com/martinsarasola/inventario-stock](https://github.com/martinsarasola/inventario-stock)
