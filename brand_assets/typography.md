# Tipografia — Ethos

Inspirada nas fontes customizadas da Anthropic ("Anthropic Serif" + "Anthropic Sans"),
adaptadas com equivalentes do Google Fonts.

## Fontes

| Papel | Família | Fonte de referência |
|-------|---------|---------------------|
| Heading | Playfair Display | "Anthropic Serif" |
| Body | Inter | "Anthropic Sans" |

## Uso no código

```tsx
// heading (serif)
className="font-heading"

// body (sans-serif — padrão, não precisa declarar)
className="font-body"
```

## Escala tipográfica recomendada

| Elemento | Tamanho | Peso | Letter-spacing |
|----------|---------|------|----------------|
| H1 hero | 56-72px | 700 | -0.03em |
| H2 seção | 36-48px | 400 (Playfair) | -0.02em |
| H3 | 24-30px | 600 | -0.01em |
| Body | 18-20px | 400 | normal |
| Small/muted | 14-16px | 400 | normal |

## Princípios

- Headings grandes: Playfair Display (cria contraste editorial com o body)
- Corpo de texto: Inter (limpo, legível, moderno)
- Máximo 2 famílias no projeto inteiro
- Line-height generoso no body: 1.6–1.8
- Tracking negativo em headings grandes para densidade visual
