# Blog Demo con Next.js (SSR)

Este proyecto es una **demo de un blog** construido con [Next.js](https://nextjs.org/) utilizando **Server Side Rendering (SSR)**. El objetivo principal es mostrar lo rápido e instantáneo que puede cargar una página con esta tecnología.

## Características principales

- **Renderizado en el servidor (SSR):** Las páginas se generan en el servidor para ofrecer tiempos de carga instantáneos y mejor SEO.
- **Carga ultra rápida:** Gracias a SSR, el contenido se muestra al usuario de forma inmediata, incluso en la primera visita.
- **Estructura de blog:** Incluye categorías, etiquetas, paginación y páginas individuales para cada post.
- **Organización modular:** Código organizado en carpetas para componentes, páginas, utilidades y tipos.

## Estructura del proyecto

```
blog-demo/
├── data/                # Datos de ejemplo (blog.json)
├── public/              # Archivos estáticos
├── src/
│   ├── app/             # Páginas y rutas (Next.js App Router)
│   ├── components/      # Componentes reutilizables
│   ├── lib/             # Lógica y utilidades
│   └── types/           # Definición de tipos TypeScript
├── package.json         # Dependencias y scripts
├── next.config.ts       # Configuración de Next.js
└── README.md            # Este archivo
```

## ¿Por qué SSR?

- **Velocidad:** El contenido se entrega listo para mostrar, sin esperar a que el navegador ejecute JavaScript.
- **SEO:** Los motores de búsqueda pueden indexar el contenido fácilmente.
- **Experiencia de usuario:** La página parece "instantánea" para el usuario final.

## ¿Cómo probarlo?

1. Instala las dependencias:
	```bash
	npm install
	```
2. Inicia el servidor de desarrollo:
	```bash
	npm run dev
	```
3. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Créditos

Demo creada para mostrar el potencial de Next.js con SSR.

---

¡Explora el código y experimenta la velocidad de carga instantánea!
