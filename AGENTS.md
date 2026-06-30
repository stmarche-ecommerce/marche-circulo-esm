<!-- BEGIN:nextjs-agent-rules -->

# A landing page

- Deverá ser totalmente responsiva.

# Estrututra do Projeto

src/
├── app/
│ ├── layout.tsx # Layout raiz (envolve toda a aplicação)
│ ├── page.tsx # Página inicial (rota "/")
│ ├── globals.css # Estilos globais
│ ├── loading.tsx # UI de loading (Suspense automático)
│ ├── error.tsx # Boundary de erro
│ ├── not-found.tsx # Página 404 customizada
│ │
│
├── components/
│ ├── ui/ # Componentes reutilizáveis (botões, inputs)
│ ├── layout/ # Header, Footer, Sidebar
│ └── forms/ # Formulários específicos
│
├── lib/ # Lógica de negócio, clients de API/DB
│ ├── db.ts
│ ├── auth.ts
│ └── utils.ts
├── public/ # Assets estáticos (imagens, fonts)
│
├── next.config.js
├── tsconfig.json
|── postcss.config.mjs
└── package.json
