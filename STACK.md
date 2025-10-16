# 🎯 Stack Tecnológico - Programa NO-CODE & AI

**Universidad de San Andrés - Educación Ejecutiva**

---

## 📋 Tabla de Contenidos

- [Frontend Framework & UI](#frontend-framework--ui)
- [Backend & Authentication](#backend--authentication)
- [State Management & Forms](#state-management--forms)
- [UI/UX Components](#uiux-components--libraries)
- [Analytics & Monitoring](#analytics--monitoring)
- [Development Tools](#development-tools)
- [External Services](#external-services-integrations)
- [Project Structure](#project-structure)
- [Deployment](#deployment--hosting)
- [Scripts](#scripts-disponibles)
- [Resumen](#resumen-del-stack)

---

## 🎨 Frontend Framework & UI

### Core Framework

#### **Next.js 14.2.33**
Framework React de producción con:
- **App Router** - Sistema de rutas basado en archivos en `/app`
- **Server Components** - Componentes que se renderizan en el servidor
- **Client Components** - Componentes interactivos marcados con `"use client"`
- **API Routes** - Endpoints serverless integrados
- **Image Optimization** - Optimización automática de imágenes
- **Static & Dynamic Rendering** - Renderizado híbrido

```json
{
  "next": "^14.2.33"
}
```

#### **React 18**
Librería principal de UI con:
- Concurrent Features
- Automatic Batching
- Server Components Support
- Suspense for Data Fetching

```json
{
  "react": "^18",
  "react-dom": "^18"
}
```

#### **TypeScript 5**
Superset tipado de JavaScript:
- Type Safety completo
- IntelliSense mejorado
- Detección de errores en tiempo de desarrollo
- Configuración estricta habilitada

```json
{
  "typescript": "^5"
}
```

**Configuración TypeScript:**
```json
{
  "compilerOptions": {
    "target": "ES6",
    "lib": ["dom", "dom.iterable", "esnext"],
    "strict": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "jsx": "preserve",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

---

### Styling & Design

#### **Tailwind CSS 4.1.9**
Framework CSS utility-first de última generación:
- **Just-in-Time (JIT)** - Generación bajo demanda
- **CSS Variables** - Theming dinámico
- **Responsive Design** - Mobile-first approach
- **Dark Mode** - Soporte nativo de temas

```json
{
  "tailwindcss": "^4.1.9",
  "@tailwindcss/oxide": "^4.1.14",
  "@tailwindcss/postcss": "^4.1.9"
}
```

**Plugins & Utilities:**
- `tailwindcss-animate` - Animaciones predefinidas
- `tw-animate-css` - Animaciones CSS adicionales
- `tailwind-merge` - Merge inteligente de clases
- `clsx` - Clases condicionales

#### **PostCSS 8.5**
Procesador de CSS con:
- `autoprefixer` - Autoprefixing automático
- `@tailwindcss/postcss` - Plugin de Tailwind v4

#### **LightningCSS 1.30.2**
CSS bundler ultra-rápido:
- Parsing y minificación optimizados
- Transpilación moderna
- Mejor performance que PostCSS tradicional

#### **Design System Utilities**
```json
{
  "class-variance-authority": "^0.7.1",  // CVA - Variantes de componentes
  "clsx": "^2.1.1",                       // Clases condicionales
  "tailwind-merge": "^2.5.5"              // Merge de clases Tailwind
}
```

---

### Component Library

#### **shadcn/ui** (Style: "new-york")
Sistema de componentes accesibles y customizables:
- **Copy-paste components** - Componentes que posees
- **Radix UI based** - Primitivos accesibles
- **Fully customizable** - Control total del código
- **TypeScript native** - Types incluidos

**Configuración:**
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "baseColor": "neutral",
    "cssVariables": true
  },
  "iconLibrary": "lucide"
}
```

#### **Radix UI Components**
Primitivos headless para componentes accesibles:

**Navigation & Interaction:**
```json
{
  "@radix-ui/react-navigation-menu": "1.2.3",
  "@radix-ui/react-dropdown-menu": "2.1.4",
  "@radix-ui/react-context-menu": "2.2.4",
  "@radix-ui/react-menubar": "1.1.4"
}
```

**Overlays:**
```json
{
  "@radix-ui/react-dialog": "1.1.4",
  "@radix-ui/react-alert-dialog": "1.1.4",
  "@radix-ui/react-popover": "1.1.4",
  "@radix-ui/react-hover-card": "1.1.4",
  "@radix-ui/react-tooltip": "1.1.6"
}
```

**Form Controls:**
```json
{
  "@radix-ui/react-checkbox": "1.1.3",
  "@radix-ui/react-radio-group": "1.2.2",
  "@radix-ui/react-select": "2.1.4",
  "@radix-ui/react-slider": "1.2.2",
  "@radix-ui/react-switch": "1.1.2"
}
```

**Layout & Organization:**
```json
{
  "@radix-ui/react-accordion": "1.2.2",
  "@radix-ui/react-collapsible": "1.1.2",
  "@radix-ui/react-tabs": "1.1.2",
  "@radix-ui/react-scroll-area": "1.2.2",
  "@radix-ui/react-separator": "1.1.1"
}
```

**Feedback:**
```json
{
  "@radix-ui/react-toast": "1.2.4",
  "@radix-ui/react-progress": "1.1.1"
}
```

**Misc:**
```json
{
  "@radix-ui/react-avatar": "1.1.2",
  "@radix-ui/react-label": "^2.1.1",
  "@radix-ui/react-slot": "latest",
  "@radix-ui/react-toggle": "1.1.1",
  "@radix-ui/react-toggle-group": "1.1.1",
  "@radix-ui/react-aspect-ratio": "1.1.1"
}
```

#### **Icons & Typography**

**Lucide React 0.454.0**
Librería moderna de iconos:
- 1000+ iconos consistentes
- Tree-shakeable
- TypeScript support
- Customizable size & color

```typescript
import { User, Code, Calendar, TrendingUp } from "lucide-react"
```

**Geist Font**
Font family oficial de Vercel:
- Sans & Mono variants
- Variable font
- Optimizado para legibilidad

---

## 🔐 Backend & Authentication

### **Supabase** - Backend as a Service (BaaS)

Plataforma completa de backend con:

#### **Supabase Client 2.74.0**
```json
{
  "@supabase/supabase-js": "^2.74.0"
}
```

**Características:**
- **PostgreSQL Database** - Base de datos relacional
- **Row Level Security** - Seguridad a nivel de fila
- **Realtime Subscriptions** - Actualizaciones en tiempo real
- **Storage** - Almacenamiento de archivos
- **Edge Functions** - Serverless functions

#### **Authentication Helpers**
```json
{
  "@supabase/ssr": "^0.7.0",
  "@supabase/auth-helpers-nextjs": "^0.10.0"
}
```

**Auth Features:**
- Email/Password authentication
- OAuth providers (Google, GitHub, etc.)
- Magic links
- Session management
- Protected routes
- Middleware integration

**Estructura de Autenticación:**
```
lib/supabase/
├── client.ts      # Cliente para componentes client-side
├── server.ts      # Cliente para Server Components
└── middleware.ts  # Middleware de autenticación
```

**Ejemplo de uso:**
```typescript
// Client Component
import { createClient } from '@/lib/supabase/client'

// Server Component
import { createClient } from '@/lib/supabase/server'
```

---

## 📦 State Management & Forms

### **React Hook Form 7.60.0**
Librería performante de gestión de formularios:
- **Uncontrolled Components** - Mejor performance
- **Built-in Validation** - Validación integrada
- **TypeScript Support** - Types completos
- **Small Bundle Size** - ~8kb minified

```typescript
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
```

### **Zod 3.25.67**
Schema validation TypeScript-first:
- **Type Inference** - Types automáticos desde schemas
- **Composable** - Schemas reutilizables
- **Error Messages** - Mensajes personalizables
- **TypeScript Native** - Diseñado para TS

```typescript
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

type LoginForm = z.infer<typeof loginSchema>
```

### **@hookform/resolvers 3.10.0**
Resolvers para integrar validación:
```typescript
const form = useForm<LoginForm>({
  resolver: zodResolver(loginSchema)
})
```

---

## 🎨 UI/UX Components & Libraries

### **Theming**

**next-themes (latest)**
Gestión de temas con:
- Dark/Light mode
- System preference detection
- No flash on load
- localStorage persistence

```typescript
import { ThemeProvider } from "next-themes"
```

### **Interactive Components**

**Embla Carousel React 8.5.1**
Carrusel/slider de alto rendimiento:
- Touch-friendly
- Responsive
- Customizable
- TypeScript support

```typescript
import useEmblaCarousel from 'embla-carousel-react'
```

**React Day Picker 9.8.0**
Selector de fechas moderno:
- Accessible
- Localization
- Range selection
- Customizable styling

**cmdk 1.0.4**
Command menu (⌘K style):
- Keyboard navigation
- Fuzzy search
- Composable
- Accessible

**input-otp 1.4.1**
Input de códigos OTP:
- Auto-focus next
- Paste support
- Customizable

### **Feedback Components**

**Sonner 1.7.4**
Toast notifications elegantes:
- Promise-based API
- Swipe to dismiss
- Rich content support
- Position control

```typescript
import { toast } from "sonner"

toast.success("Cambios guardados")
```

**Vaul 0.9.9**
Drawer components para mobile:
- Touch-friendly
- Snap points
- Backdrop support

### **Layout Components**

**react-resizable-panels 2.1.7**
Paneles redimensionables:
- Drag to resize
- Collapse/expand
- Persistent state
- Keyboard accessible

### **Utilities**

**date-fns 4.1.0**
Utilidades modernas para fechas:
- Tree-shakeable
- Immutable
- TypeScript support
- i18n ready

**Recharts 2.15.4**
Librería de gráficos React:
- Composable
- Responsive
- Customizable
- SVG-based

---

## 📊 Analytics & Monitoring

### **Vercel Analytics**
Analytics integrados de Vercel:
- **Web Vitals** - Core Web Vitals tracking
- **Page Views** - Tracking de páginas
- **Custom Events** - Eventos personalizados
- **Real-time** - Datos en tiempo real
- **Privacy-focused** - Sin cookies

```typescript
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

---

## 🛠️ Development Tools

### **Build Tools**

**rimraf 6.0.1**
Cross-platform `rm -rf`:
```bash
npm run clean  # Limpia .next, node_modules, etc.
```

**Autoprefixer 10.4.20**
Autoprefixer automático para CSS:
- Vendor prefixes
- Browser compatibility
- PostCSS plugin

### **Type Definitions**
```json
{
  "@types/node": "^22",
  "@types/react": "^18",
  "@types/react-dom": "^18"
}
```

### **Linting & Formatting**
- **ESLint** - Integrado con Next.js
- **TypeScript Strict Mode** - Habilitado

---

## 🎯 External Services Integrations

### **Twitter Embeds**
Integración de tweets:
```html
<script async src="https://platform.twitter.com/widgets.js"></script>
```

### **Vercel**
Plataforma de deployment:
- Edge Network
- Automatic HTTPS
- Git Integration
- Preview Deployments
- Environment Variables

---

## 📁 Project Structure

### **Architecture Pattern**
```
udesa-nocode/
├── app/                           # Next.js App Router
│   ├── auth/
│   │   └── callback/
│   │       └── page.tsx          # OAuth callback
│   ├── dashboard/                # Dashboard protegido
│   │   ├── benefits/
│   │   │   └── page.tsx
│   │   ├── glossary/             # Glosarios
│   │   │   ├── css/
│   │   │   │   └── page.tsx
│   │   │   ├── development/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx          # UI Glossary
│   │   ├── heuristics/
│   │   │   └── page.tsx
│   │   ├── nocode-tools/
│   │   │   └── page.tsx
│   │   ├── worksheets/
│   │   │   └── page.tsx
│   │   └── page.tsx              # Dashboard home
│   ├── login/
│   │   └── page.tsx
│   ├── globals.css               # Estilos globales
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page
│
├── components/                    # Componentes reutilizables
│   ├── ui/                       # shadcn/ui components
│   │   ├── alert.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── collapsible.tsx
│   │   ├── glossary-term.tsx
│   │   ├── input.tsx
│   │   └── label.tsx
│   ├── glossary/                 # Componentes específicos de glosario
│   │   ├── glossary-page-layout.tsx
│   │   └── help-sections/
│   │       ├── example-section.tsx
│   │       ├── terminal-commands-section.tsx
│   │       └── units-reference-section.tsx
│   └── theme-provider.tsx
│
├── lib/                          # Utilidades y lógica de negocio
│   ├── supabase/                 # Configuración Supabase
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── middleware.ts
│   ├── hooks/                    # Custom React hooks
│   │   └── use-glossary-filter.ts
│   ├── css-glossary-data.ts      # Datos del glosario CSS
│   ├── dev-glossary-data.ts      # Datos del glosario Dev
│   ├── ui-glossary-data.ts       # Datos del glosario UI
│   ├── nocode-tools-data.ts      # Datos de herramientas no-code
│   ├── glossary-types.ts         # Types para glosarios
│   ├── glossary-utils.ts         # Utilidades para glosarios
│   └── utils.ts                  # Utilidades generales
│
├── public/                       # Assets estáticos
│   ├── images/                   # Imágenes
│   └── placeholder.*             # Placeholders
│
├── middleware.ts                 # Next.js middleware (auth)
├── components.json               # Config shadcn/ui
├── next.config.mjs               # Config Next.js
├── postcss.config.mjs            # Config PostCSS
├── tailwind.config.js            # Config Tailwind CSS
├── tsconfig.json                 # Config TypeScript
├── vercel.json                   # Config Vercel
└── package.json                  # Dependencies
```

### **Routing Structure**
```
/ (public)
├── /login (public)
├── /auth/callback (public)
└── /dashboard (protected)
    ├── /dashboard/benefits (protected)
    ├── /dashboard/glossary (protected)
    │   ├── /dashboard/glossary/css (protected)
    │   └── /dashboard/glossary/development (protected)
    ├── /dashboard/heuristics (protected)
    ├── /dashboard/nocode-tools (protected)
    └── /dashboard/worksheets (protected)
```

### **Component Patterns**

#### **Server Components (Default)**
```typescript
// app/page.tsx
export default function Page() {
  // Server Component - puede hacer fetch directo
  return <div>...</div>
}
```

#### **Client Components**
```typescript
// components/interactive-component.tsx
"use client"

import { useState } from "react"

export function InteractiveComponent() {
  const [state, setState] = useState()
  return <div>...</div>
}
```

#### **Layout Pattern**
```typescript
// app/layout.tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Programa NO-CODE & AI",
  description: "Universidad de San Andrés"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
```

---

## 🌐 Deployment & Hosting

### **Vercel Platform**

**Características:**
- **Edge Network** - CDN global
- **Automatic HTTPS** - SSL automático
- **Git Integration** - Deploy en cada push
- **Preview Deployments** - URL única por PR
- **Environment Variables** - Variables de entorno seguras
- **Analytics** - Analytics integrados
- **Web Vitals** - Monitoring de performance

**Configuración:**
```json
{
  "framework": "nextjs",
  "buildCommand": "next build",
  "devCommand": "next dev -p 3001",
  "installCommand": "npm install"
}
```

**Environment Variables:**
```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

### **Build Configuration**

**next.config.mjs:**
```javascript
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}
```

---

## 📝 Scripts Disponibles

### **Development**
```bash
# Desarrollo normal en puerto 3001
npm run dev

# Desarrollo con limpieza de cache
npm run dev:clean
```

### **Production**
```bash
# Build de producción
npm run build

# Iniciar servidor de producción
npm run start
```

### **Maintenance**
```bash
# Linting
npm run lint

# Limpieza completa (elimina .next, node_modules, package-lock.json)
npm run clean
```

### **package.json Scripts:**
```json
{
  "scripts": {
    "dev": "rimraf .next && next dev -p 3001",
    "dev:clean": "rimraf .next && next dev -p 3001",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "clean": "rimraf .next node_modules package-lock.json && npm install"
  }
}
```

---

## 📊 Resumen del Stack

### **Por Categoría**

| Categoría | Tecnologías |
|-----------|-------------|
| **Frontend Framework** | Next.js 14, React 18, TypeScript 5 |
| **Styling** | Tailwind CSS 4, PostCSS, LightningCSS |
| **Component Library** | shadcn/ui (Radix UI), Lucide Icons |
| **Backend/Auth** | Supabase (PostgreSQL, Auth, Storage) |
| **Forms & Validation** | React Hook Form, Zod |
| **State Management** | React Hooks, Server State |
| **UI/UX Libraries** | Embla Carousel, Sonner, cmdk, Vaul |
| **Theming** | next-themes, CSS Variables |
| **Analytics** | Vercel Analytics |
| **Deployment** | Vercel Edge Network |
| **Version Control** | Git, GitHub |

### **Versiones Clave**
```json
{
  "next": "^14.2.33",
  "react": "^18",
  "typescript": "^5",
  "tailwindcss": "^4.1.9",
  "@supabase/supabase-js": "^2.74.0",
  "react-hook-form": "^7.60.0",
  "zod": "3.25.67",
  "lucide-react": "^0.454.0"
}
```

---

## 💡 Características Destacadas del Stack

### **✅ Performance**
- **Server Components** - Renderizado en el servidor
- **Code Splitting** - Carga bajo demanda
- **Image Optimization** - Optimización automática
- **Edge Network** - CDN global de Vercel
- **LightningCSS** - Procesamiento ultra-rápido

### **✅ Developer Experience**
- **TypeScript Strict** - Type safety completo
- **Hot Reload** - Recarga instantánea
- **Path Aliases** - Imports simplificados (`@/`)
- **ESLint Integration** - Linting integrado
- **Git Hooks** - Pre-commit checks

### **✅ User Experience**
- **Responsive Design** - Mobile-first
- **Dark Mode** - Soporte de temas
- **Accessible** - WCAG 2.1 AA (Radix UI)
- **Fast Loading** - Sub-second TTI
- **Smooth Animations** - 60fps animations

### **✅ Security**
- **Row Level Security** - Supabase RLS
- **Environment Variables** - Secrets seguros
- **Middleware Protection** - Rutas protegidas
- **HTTPS Automatic** - SSL por defecto

### **✅ Scalability**
- **Serverless** - Auto-scaling
- **Edge Functions** - Globally distributed
- **Database Pooling** - Conexiones optimizadas
- **CDN Caching** - Static asset caching

---

## 🔄 Stack Evolution

### **Version History**

**v1.0 - Initial Stack (Actual)**
- Next.js 14 App Router
- Tailwind CSS 4
- Supabase Backend
- shadcn/ui Components

**Planned Improvements:**
- [ ] Storybook para documentación de componentes
- [ ] Testing con Vitest + Testing Library
- [ ] E2E testing con Playwright
- [ ] CI/CD con GitHub Actions
- [ ] Performance monitoring con Sentry
- [ ] A/B testing capabilities

---

## 📚 Recursos y Documentación

### **Official Documentation**
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [shadcn/ui Docs](https://ui.shadcn.com)
- [Radix UI Docs](https://www.radix-ui.com/primitives/docs/overview/introduction)

### **Community Resources**
- [Next.js GitHub](https://github.com/vercel/next.js)
- [Supabase GitHub](https://github.com/supabase/supabase)
- [shadcn/ui GitHub](https://github.com/shadcn-ui/ui)

---

## 🤝 Contributing

Este proyecto es parte del Programa NO-CODE & AI de la Universidad de San Andrés.

**Coordinadores Académicos:**
- Franco Zan
- Greta Gawianski

**Stack mantained by:** Equipo de Educación Ejecutiva UdeSA

---

## 📄 License

Este proyecto es de uso educativo exclusivo para el Programa NO-CODE & AI de la Universidad de San Andrés.

---

**Última actualización:** Octubre 2025
**Next.js Version:** 14.2.33
**React Version:** 18
**Node Version:** ≥18.17.0

