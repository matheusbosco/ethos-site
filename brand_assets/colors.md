# Paleta de Cores — Ethos

Inspirada na paleta real do site da Anthropic, adaptada com azul grafite e marrom.

## Tokens

| Token | Hex | Uso |
|-------|-----|-----|
| `background` | `#FAF9F5` | Fundo geral (areia quente) |
| `surface` | `#F0EEE6` | Cards, seções alternadas |
| `border` | `#E8E6DC` | Divisórias, bordas sutis |
| `text` | `#141413` | Texto principal, headings |
| `muted` | `#87867F` | Subtítulos, metadados, placeholders |
| `primary` | `#1C2B3A` | Botões primários, destaques (azul grafite) |
| `primary-hover` | `#263D54` | Hover dos botões primários |
| `accent` | `#7C5C3E` | CTAs secundários, links de destaque (marrom) |
| `accent-hover` | `#9A7050` | Hover do acento |

## Uso no código

```tsx
// background
className="bg-background"

// texto principal
className="text-text"

// botão primário
className="bg-primary text-background hover:bg-primary-hover"

// acento
className="text-accent"
```
