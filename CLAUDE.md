# CLAUDE.md — ethos-site

> Este arquivo complementa o CLAUDE.md global de cada colaborador.
> Regras de workflow, permissoes e padroes gerais de codigo ja estao definidas la — aqui so vivem regras especificas deste projeto.

---

## 1. Identidade do Projeto

- **Projeto:** Site institucional da Ethos
- **Repo:** `ethos-ia/ethos-site`
- **Colaboradores:** Matheus Bosco (`matheusbosco`), Luca Braggio (`Lbraggioo`)
- **Estetica alvo:** minimalista, premium, moderno
- **Referencias visuais:** Manus, Anthropic — layout limpo, espacamento generoso, tipografia forte
- **Referencia de conceito:** LeftClick.ai — posicionamento e funcionalidades de agencia de IA

---

## 2. Stack e Estrutura

- **Framework:** Next.js 15 (App Router) + TypeScript
- **Estilizacao:** Tailwind CSS v4 — tokens de cor e tipografia definidos em `src/app/globals.css` via `@theme`
- **Hospedagem:** Vercel (deploy automatico a cada push na `main`)
- **Idioma:** Portugues (PT-BR)

### Estrutura de pastas

```
src/
  app/
    globals.css       — tokens de design (@theme) e reset global
    layout.tsx        — layout raiz, metadata global, fonte
    page.tsx          — composicao das secoes da landing page
  components/
    ui/               — componentes atomicos (Button, etc.)
    layout/           — Nav, Footer, Section wrapper
  sections/           — secoes da landing page (Hero, Manifesto, etc.)
brand_assets/         — logo, paleta, tipografia (ver README la dentro)
```

### Comandos

```bash
npm run dev    # servidor local em localhost:3000
npm run build  # build de producao
npm run lint   # checar erros de lint antes de PR
```

### Sobre o Tailwind v4

Nao existe `tailwind.config.ts` neste projeto. Tokens ficam em `src/app/globals.css`:

```css
@theme {
  --color-primary: #...; /* cor primaria */
  --font-heading: var(--font-...);
}
```

Usar `bg-primary`, `text-primary`, etc. normalmente via classes Tailwind.

---

## 3. Workflow Frontend

### Skill obrigatorio
Antes de criar ou modificar qualquer componente visual, **invocar o skill `frontend-design`**. Isso garante que o codigo gerado siga padroes de design de alta qualidade.

Nao e necessario invocar para:
- Logica pura (utils, API calls, configs)
- Ajustes de texto/conteudo sem mudanca visual
- Correcoes de bugs que nao afetam layout

### Servidor local
- Sempre servir em localhost para visualizar mudancas — nunca abrir `file:///` direto
- Usar o dev server do framework escolhido (comando sera definido na secao 2)

### Verificacao visual
- Apos mudancas visuais, visualizar no navegador e comparar com o estado anterior ou referencia
- Verificar em pelo menos 2 viewports: mobile (~375px) e desktop (~1440px)
- So declarar tarefa visual concluida apos confirmar que nao ha regressoes

---

## 4. Design System e Guardrails

### Cores
- Nunca usar a paleta padrao do Tailwind (indigo-500, blue-600, etc.) como cor primaria
- Derivar todas as cores da identidade visual da Ethos (ver `brand_assets/` quando disponivel)
- Manter contraste minimo WCAG AA (4.5:1 para texto normal, 3:1 para texto grande)

### Tipografia
- Priorizar contraste visual entre headings e body text (peso, tamanho, tracking)
- Tracking apertado (`-0.02em` a `-0.04em`) em headings grandes
- Line-height generoso (`1.6` a `1.8`) em texto corrido
- Limitar a no maximo 2 familias tipograficas no projeto inteiro

### Sombras e Profundidade
- Evitar `shadow-md` ou `shadow-lg` crus — usar sombras em camadas com opacidade baixa
- Definir sistema de elevacao: base (0) → elevado (cards, modais) → flutuante (tooltips, dropdowns)
- Considerar sombras com tonalidade da cor primaria para coesao visual

### Gradientes
- Usar com intencionalidade — gradientes servem para guiar o olho, nao como decoracao
- Quando usar, preferir gradientes sutis (baixa opacidade) ou radiais com multiplas camadas

### Animacoes
- Animar apenas `transform` e `opacity` (propriedades compostas pelo GPU)
- Nunca usar `transition-all` — declarar explicitamente quais propriedades animam
- Easing suave: `cubic-bezier(0.16, 1, 0.3, 1)` para entradas, `ease-out` para saidas
- Duracoes curtas: 150-300ms para micro-interacoes, 300-500ms para transicoes de layout

### Estados interativos
- Todo elemento clicavel deve ter estados: hover, focus-visible e active
- Focus-visible deve ser visivel e acessivel (outline com offset, nunca `outline: none` sem substituto)

### Espacamento
- Usar tokens de espacamento consistentes — nao misturar valores aleatorios
- Manter ritmo vertical: usar multiplos de uma unidade base (ex: 4px ou 8px)

### Responsividade
- Mobile-first: escrever estilos base para mobile, usar breakpoints para desktop
- Testar em: 375px (mobile), 768px (tablet), 1440px (desktop)

---

## 5. Brand Assets

- Antes de qualquer trabalho visual, verificar a pasta `brand_assets/` na raiz do projeto
- Se existirem logo, paleta de cores ou guia de estilo — usar exatamente como definido
- Nunca inventar cores ou tipografia da marca — se nao existir definicao, perguntar antes
- Para imagens placeholder (quando nao houver asset real): usar `https://placehold.co/WIDTHxHEIGHT`

---

## 6. Qualidade Web

### Acessibilidade
- HTML semantico: usar tags corretas (`nav`, `main`, `section`, `article`, `button`, etc.)
- Todas as imagens devem ter atributo `alt` descritivo
- Formularios com labels associados aos inputs
- Navegacao por teclado deve funcionar em todos os elementos interativos

### SEO
- Meta tags essenciais: title, description, viewport
- Open Graph tags para compartilhamento em redes sociais
- Estrutura de headings hierarquica (h1 unico por pagina, h2-h6 em ordem)

### Performance
- Otimizar imagens (formatos modernos: WebP/AVIF quando suportado)
- Lazy loading para imagens abaixo do fold
- Minimizar JavaScript no bundle inicial

---

## 7. Workflow de Branches

- `main` = producao. Sempre estavel. Nunca commitar direto
- Branches de feature: `feat/nome-da-feature`
- Branches de fix: `fix/nome-do-fix`
- Toda mudanca entra via Pull Request com descricao do que mudou
- Antes de abrir PR: garantir que o build passa e nao ha erros de lint

---

## 8. Regras Aprendidas

> Secao auto-corretiva. Adicionar regras aqui conforme erros forem encontrados ou preferencias definidas durante o desenvolvimento.
> Formato: `N. [CATEGORIA] Sempre/Nunca faca X — porque Y.`

<!-- nenhuma regra ainda — sera preenchido durante o desenvolvimento -->
