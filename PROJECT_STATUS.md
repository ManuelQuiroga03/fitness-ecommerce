# 🚀 Estado y Estructura del Proyecto (LIFT.APP - Fitness Ecommerce)

Este documento sirve como bitácora viva del proyecto. Aquí mantendremos un registro del alcance actual, la arquitectura de carpetas y los cambios más importantes tras cada iteración.

---

## 📁 Arquitectura del Proyecto

La estructura actual está diseñada siguiendo los principios de separación de responsabilidades, preparación para conectar con un backend real (como Supabase) y escalabilidad.

- **`app/`**: Contiene las rutas y páginas principales aprovechando el App Router de Next.js.
  - `page.tsx`: Homepage con el Hero banner y productos destacados.
  - `catalog/page.tsx`: Página del catálogo con cuadrícula de productos y filtros.
  - `cart/page.tsx`: Vista detallada del carrito de compras.
  - `checkout/page.tsx`: Flujo de pago simulado capturando datos de envío.
  - `checkout/success/page.tsx`: Confirmación de orden exitosa.
  - `login/page.tsx` & `registro/page.tsx`: Vistas de simulación para autenticación.
  - `layout.tsx`: Plantilla principal que envuelve a todas las páginas con `ThemeProvider` (para Dark Mode global).
  - `globals.css`: Estilos globales nativos de Tailwind ajustados para el ecosistema Dark/Light Mode.

- **`components/`**: Componentes aislados, funcionales y reutilizables.
  - `layout/`: Componentes estructurales (`Navbar.tsx`, `Footer.tsx`).
  - `ui/`: Interfaz general (`ProductCard.tsx`, `FilterBar.tsx`, `ThemeToggle.tsx`).
  - `cart/`: Componentes específicos del carrito de compras (`CartDrawer.tsx`).
  - `catalog/`: Lógica de inyección en la página del catálogo (`FilterBarWrapper.tsx`).
  - `providers/`: Proveedores globales de contexto (`ThemeProvider.tsx`).

- **`lib/api/`**: Capa de abstracción de datos o "Servicios".
  - `products.ts` / `orders.ts`: Funciones asíncronas simuladas con retardos (mocks) que retornan JSONs harcodeados en español. En un futuro, **todo el código Supabase irá aquí**.

- **`store/`**: Manejo de estado global local (Zustand + localstorage).
  - `useCartStore.ts`: Controla el carrito de compras (Añadir, remover, calcular totales).
  - `useAuthStore.ts`: Controla la sesión del usuario ficticio de forma persistente.

- **`types/`**: Definiciones de datos TypeScript.
  - `index.ts`: Interfaces elementales (`Product`, `CartItem`, `Order`).

---

## 🎯 Alcance Actual (Versión 1 y 2)

- [x] Arquitectura base de Next.js configurada y preparada para escalabilidad.
- [x] Soporte nativo fluido para temas Light/Dark (`next-themes` y explícitos clases dinámicas Tailwind).
- [x] Plataforma 100% traducida al Español latino.
- [x] Lógica local del **Carrito de Compras** completamente funcional y persistida.
- [x] Entorno visual de **Autenticación Ficticia** (Login / Registro).
- [x] **Flujo de Pago Completo (Checkout)** capturando dirección falsa, validando el carrito y confirmando el registro de orden.
- [x] Base genérica de la API preparada en `/lib/api` lista para integrar Supabase SDK.

---

## 📅 Historial de Pagos e Hitos
*Nota: Agregaremos nuevos items en esta sección a medida que avancemos con la aplicación.*

- **21/03/2026 - Sprint 2:**
  - Integración global del Tema Claro/Oscuro en un solo click usando el provider de `next-themes`.
  - Traducción absoluta de la tienda (UI, base de datos local y copies estructurales) al Español.
  - Checkout Mock Flow: Creación de página estática nativa para el carrito, pasarela de pago simulada funcional sin pasarelas de pago ni tarjetas reales implementadas, y página de confirmación.
  - Creación y conexión nativa del formulario de `Registro` y `Login` con Zustand paramostrar el perfil activo en el Header.

- **21/03/2026 - Sprint 1:**
  - Creación del MVP de Front end (Arquitectura en carpetas, Tailwind 4.0 CSS setup).
  - Implementación inicial de Zustand para el carrito de compras persistente en Client-Side Rendering.
