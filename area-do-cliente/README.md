# Círculo Santa Maria — Área do cliente

Recriação do painel do cliente do Círculo Santa Maria em **Next.js 14 (App Router)** + **TypeScript** + **Tailwind CSS**, a partir do protótipo estático original.

## Stack

- Next.js 14 (App Router, componentes de servidor + cliente)
- TypeScript
- Tailwind CSS (tokens de design customizados: cores, fontes, radius)
- `next/font` para carregar Fraunces, Inter e JetBrains Mono de forma otimizada (sem FOUC, self-hosted pelo Next)

## Estrutura

```
src/
  app/
    layout.tsx       # fontes + metadata
    page.tsx          # entry point
    globals.css        # tailwind + estilos base
  components/
    Sidebar.tsx         # navegação lateral
    Dashboard.tsx        # orquestra a troca de abas (estado no client)
    ui.tsx                # Card, Eyebrow, UsageBar (componentes reutilizáveis)
    tabs/
      OverviewTab.tsx      # Visão geral
      BenefitsTab.tsx       # Benefícios (detalhado)
      PromotionsTab.tsx      # Promoções (com filtro por categoria)
      HistoryTab.tsx           # Histórico completo
      ProfileTab.tsx            # Meu cadastro
  data/
    mock-data.ts        # dados mockados (fácil de trocar por fetch de API/CMS)
  types/
    index.ts             # tipos compartilhados
```

## Decisões de arquitetura

- **Componentização por aba**: cada aba do painel virou um componente próprio, ao invés de um único arquivo com `display:none/block` como no HTML original. A troca de aba é feita via `useState` no `Dashboard.tsx`, renderizando condicionalmente — mais alinhado ao modelo do React/Next do que manipular classes CSS diretamente no DOM.
- **Tipagem centralizada** (`types/index.ts`) e **dados centralizados** (`data/mock-data.ts`): facilita trocar os dados mockados por uma chamada de API/CMS sem tocar nos componentes visuais.
- **Tokens de design no `tailwind.config.ts`**: as cores e fontes do CSS original (`--ink`, `--burgundy`, `--gold` etc.) viraram cores nomeadas do Tailwind, garantindo consistência e evitando "magic numbers" espalhados pelo código.
- **Acessibilidade**: `aria-current` nos itens de navegação ativos, `aria-pressed` nos filtros de promoção, `role="progressbar"` nas barras de uso dos benefícios, e foco visível (`focus-ring`) em todos os elementos interativos.
- **Responsividade**: sidebar empilha acima do conteúdo em telas menores que `md` (768px), grids colapsam para 1 coluna, replicando o breakpoint `900px` do protótipo original.

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse http://localhost:3000
