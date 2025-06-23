
# Aegis - Asistente Personal Inteligente

Aegis es un asistente personal inteligente que te ayuda a gestionar tareas, hábitos y tu calendario de manera eficiente. Incluye un sistema de IA que se adapta a tu estilo de trabajo y puede activar un "Modo Caos" cuando detecta que estás saturado.

## 🚀 Características

- **Gestión de Tareas**: Organiza y prioriza tus tareas automáticamente
- **Seguimiento de Hábitos**: Mantén tus hábitos diarios con streaks
- **Chat con IA**: Aegis te asiste y da recomendaciones personalizadas
- **Calendario Inteligente**: Planificación automática de tu tiempo
- **Modo Caos**: Simplifica tu día cuando estás saturado
- **Responsive Design**: Funciona en desktop y móvil

## 🏗️ Arquitectura

El proyecto está dividido en dos partes principales:

```
aegis-app/
├── frontend/          # React + Vite + TypeScript
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/           # Node.js + Express + TypeScript
│   ├── src/
│   ├── prisma/
│   └── package.json
└── README.md
```

## 🛠️ Tecnologías

### Frontend
- **React 18** - Framework de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de CSS
- **Shadcn/ui** - Componentes de UI
- **React Router** - Navegación
- **Tanstack Query** - Gestión de estado de servidor
- **React Hook Form** - Manejo de formularios

### Backend
- **Node.js** - Runtime de JavaScript
- **Express** - Framework web
- **TypeScript** - Tipado estático
- **Prisma** - ORM y manejo de base de datos
- **SQLite** - Base de datos (desarrollo)
- **Socket.io** - WebSockets para chat en tiempo real
- **Zod** - Validación de datos
- **JWT** - Autenticación

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js 18+ y npm
- Git

### Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd aegis-app
```

2. **Configurar el Backend**
```bash
cd backend
npm install
cp .env.example .env
npx prisma migrate dev
npx prisma db seed
npm run dev
```

3. **Configurar el Frontend** (en otra terminal)
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

4. **Acceder a la aplicación**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## 📝 Scripts Disponibles

### Frontend
```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build para producción
npm run preview      # Preview del build
npm run lint         # Linter
```

### Backend
```bash
npm run dev          # Servidor de desarrollo con nodemon
npm run build        # Compilar TypeScript
npm run start        # Ejecutar en producción
npm run db:migrate   # Ejecutar migraciones de DB
npm run db:seed      # Poblar base de datos
```

## 🔧 Configuración

### Variables de Entorno

#### Frontend (.env)
```
VITE_API_URL=http://localhost:3001
VITE_WS_URL=ws://localhost:3001
```

#### Backend (.env)
```
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key"
PORT=3001
NODE_ENV=development
```

## 📚 API Documentation

### Endpoints Principales

#### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/register` - Registrarse
- `POST /api/auth/logout` - Cerrar sesión

#### Tareas
- `GET /api/tasks` - Obtener todas las tareas
- `POST /api/tasks` - Crear nueva tarea
- `PUT /api/tasks/:id` - Actualizar tarea
- `DELETE /api/tasks/:id` - Eliminar tarea

#### Hábitos
- `GET /api/habits` - Obtener todos los hábitos
- `POST /api/habits` - Crear nuevo hábito
- `PUT /api/habits/:id` - Actualizar hábito
- `DELETE /api/habits/:id` - Eliminar hábito

#### Chat
- `GET /api/chat/messages` - Obtener historial de chat
- `POST /api/chat/message` - Enviar mensaje a Aegis
- WebSocket en `/chat` para mensajes en tiempo real

## 🎨 Estructura del Código

### Frontend
```
src/
├── components/     # Componentes reutilizables
│   ├── ui/        # Componentes base (shadcn/ui)
│   └── Layout/    # Componentes de layout
├── pages/         # Páginas principales
├── hooks/         # Custom hooks
├── contexts/      # Context providers
├── types/         # Definiciones de tipos
├── lib/          # Utilidades y configuración
└── services/     # Servicios para API calls
```

### Backend
```
src/
├── controllers/   # Controladores de rutas
├── services/     # Lógica de negocio
├── models/       # Modelos de datos
├── routes/       # Definición de rutas
├── middleware/   # Middleware personalizado
├── utils/        # Utilidades
└── types/        # Definiciones de tipos
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Agradecimientos

- [Shadcn/ui](https://ui.shadcn.com/) por los componentes de UI
- [Lucide React](https://lucide.dev/) por los iconos
- [Tailwind CSS](https://tailwindcss.com/) por el framework de CSS

## 📞 Soporte

Si tienes preguntas o necesitas ayuda, puedes:
- Abrir un issue en GitHub
- Contactar al equipo de desarrollo

---

**Aegis** - Tu asistente personal inteligente 🤖✨
