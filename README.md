# 📈 Chile Stock App

Aplicación web para el seguimiento en tiempo real del mercado de valores chileno (IPSA, IGPA, etc.).

## 🚀 Stack Tecnológico

- **Angular 20.3.3** - Framework principal
- **TypeScript** - Lenguaje de programación
- **PrimeNG** - Biblioteca de componentes UI
- **Signals** - Manejo de estado reactivo
- **Karma + Jasmine** - Testing

## 📋 Requisitos Previos

- Node.js 22.12.0 o superior
- npm 11.6.1 o superior
- Git

## 🛠️ Instalación

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd chile-stock-app

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm start
```

La aplicación estará disponible en `http://localhost:4200/`

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── core/              # Servicios core, guards, interceptors
│   ├── features/          # Módulos de funcionalidades
│   │   ├── instruments/   # Feature de instrumentos financieros
│   │   └── charts/        # Feature de gráficos
│   ├── shared/            # Componentes, pipes, directivas compartidas
│   └── app.component.ts   # Componente raíz
├── assets/                # Recursos estáticos
└── environments/          # Configuración de entornos
```

## 🧪 Testing

```bash
# Ejecutar tests unitarios
npm test

# Ejecutar tests con cobertura
npm run test:coverage

# Ejecutar tests en modo headless (CI)
npm run test:ci
```

## 📦 Build

```bash
# Build de producción
npm run build

# Build con análisis de bundle
npm run build:stats
```

## 🎯 Características Principales

- ✅ Visualización en tiempo real de índices bursátiles
- ✅ Gráficos interactivos con diferentes períodos
- ✅ Lista de instrumentos con información detallada
- ✅ Búsqueda de instrumentos
- ✅ Responsive design
- ✅ Estado global con Signals

## 🔄 Flujo de Desarrollo

1. Crear rama feature desde `develop`
2. Desarrollar y hacer commits siguiendo conventional commits
3. Escribir tests unitarios
4. Crear Pull Request
5. Revisión de código
6. Merge a `develop`

## 📝 Conventional Commits

```
feat: nueva funcionalidad
fix: corrección de bugs
docs: cambios en documentación
style: formateo, punto y coma faltantes, etc
refactor: refactorización de código
test: agregar o modificar tests
chore: actualizar dependencias, configuración, etc
```

## 👥 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 📧 Contacto

Para preguntas o sugerencias, por favor abre un issue en el repositorio.

---
