# 🌿 Plant Tracker App

Aplicación web moderna para el seguimiento y gestión de plantas personales, construida con Next.js y React. Esta aplicación proporciona una interfaz intuitiva para gestionar plantas, registros de riego y monitoreo del clima.

## ⚠️ Dependencias del Proyecto

Esta aplicación es el frontend del sistema Plant Tracker y **requiere** que el backend (API) esté en ejecución para funcionar correctamente. El backend se encuentra en el repositorio [plant-tracker-api](https://github.com/RonaldRBB/plant-tracker-api).

### Requisitos Previos
- El backend (API) debe estar instalado y en ejecución
- La URL de la API debe estar configurada en el archivo `.env` (ver `.env.example`)
- Node.js 18 o superior
- npm o yarn

### Configuración de la API
1. Clona y configura el repositorio del backend:
   ```bash
   git clone git@github.com:RonaldRBB/plant-tracker-api.git
   cd plant-tracker-api
   composer install
   cp .env.example .env
   php artisan key:generate
   php artisan migrate
   php artisan serve
   ```

2. Configura la URL de la API en el frontend:
   ```bash
   cp .env.example .env.local
   # Edita .env.local y configura NEXT_PUBLIC_API_BASE_URL
   ```

## 🌟 Características Principales

### 📱 Interfaz de Usuario
- Diseño responsivo y moderno con Bulma CSS
- Soporte para múltiples idiomas (i18n)
- Animaciones suaves y transiciones
- Modo de depuración visual para desarrollo

### 🌱 Gestión de Plantas
- Catálogo completo de plantas
- Registro de plantas personales
- Información detallada de cada planta
- Sistema de apodos personalizados
- Seguimiento de ubicación y notas

### 💧 Sistema de Riego
- Registro detallado de riegos
- Diferentes métodos de riego (superficial, inmersión, pulverización)
- Programación de riegos por estación
- Recordatorios de riego
- Historial de riegos con diferentes tipos:
  - Riego normal
  - Riego con fertilizante
  - Riego con fertilizante de liberación lenta
  - Riego con trichoderma

### 🌤️ Monitoreo del Clima
- Pronóstico del tiempo en tiempo real
- Gráficos interactivos de temperatura y humedad
- Predicción de lluvia
- Integración con API meteorológica
- Caché inteligente para datos climáticos

### 📊 Visualización de Datos
- Gráficos interactivos con Chart.js
- Visualización de tendencias climáticas
- Calendario de riegos
- Indicadores visuales de estado

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Next.js 15.1.5** - Framework React para renderizado del lado del servidor
- **React 19** - Biblioteca para construir interfaces de usuario
- **Bulma CSS** - Framework CSS moderno y responsivo
- **Chart.js** - Biblioteca para visualización de datos
- **React Intl** - Internacionalización y localización

### Desarrollo
- **ESLint** - Linter para mantener la calidad del código
- **Turbopack** - Compilador de Next.js para desarrollo rápido

## 📋 Requisitos Previos

- Node.js 18 o superior
- npm o yarn
- Variables de entorno configuradas:
  - `NEXT_PUBLIC_API_BASE_URL` - URL del backend API
  - `NEXT_PUBLIC_WEATHER_API_URL`
  - `NEXT_PUBLIC_WEATHER_LAT`
  - `NEXT_PUBLIC_WEATHER_LON`
  - `NEXT_PUBLIC_WEATHER_FORECAST_DAYS`
  - `NEXT_PUBLIC_WEATHER_DISPLAY_DAYS`
  - `NEXT_PUBLIC_WEATHER_CACHE_DURATION`

## 🚀 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone git@github.com:RonaldRBB/plant-tracker-app.git
   cd plant-tracker-app
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env.local
   # Editar .env.local con tus configuraciones
   ```

4. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   ```

## 🔧 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo con Turbopack
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter

## 🏗️ Estructura del Proyecto

```
plant-tracker-app/
├── src/
│   ├── app/              # Rutas y páginas de Next.js
│   ├── components/       # Componentes reutilizables
│   ├── context/          # Contextos de React
│   ├── domain/           # Lógica de negocio
│   ├── hooks/            # Hooks personalizados
│   ├── lang/             # Traducciones
│   ├── lib/              # Utilidades y configuraciones
│   └── styles/           # Estilos CSS
├── public/               # Archivos estáticos
└── package.json          # Dependencias y scripts
```

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor, sigue estos pasos:

1. Fork el proyecto
2. Crea una rama para tu característica (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🔗 Enlaces Relacionados

- [API Backend](https://github.com/RonaldRBB/plant-tracker-api)

## 📞 Contacto

Link del Proyecto: [https://github.com/RonaldRBB/plant-tracker-app](https://github.com/RonaldRBB/plant-tracker-app)
