# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server**: `npm run dev` - Starts Vite dev server with HMR
- **Build**: `npm run build` - Runs TypeScript compilation (`tsc -b`) then Vite build
- **Lint**: `npm run lint` - Runs ESLint on the project
- **Preview**: `npm run preview` - Preview the production build locally

## Architecture

This is a martial arts gym website (NL Fight Club) built with React 19, TypeScript, Vite 7, and Tailwind CSS v4.

### Routing Structure

Uses React Router v7 with a nested route layout:
- `App.tsx` defines all routes with `Layout` as the parent wrapper
- Main pages: `/`, `/about`, `/schedule`, `/contact`
- Martial arts pages: `/martial-arts/{jeet-kune-do,mma,bjj,san-da,eskrima}`

### Component Organization

- `src/components/ui/` - shadcn/ui components (Button, Card, Dialog, Sheet, Input, etc.)
- `src/components/layout/` - Layout components (Header, Footer, Layout wrapper)
- `src/components/sections/` - Reusable section components (e.g., `MartialArtPage`)
- `src/pages/` - Page components for each route
- `src/pages/martial-arts/` - Individual martial art discipline pages
- `src/lib/utils.ts` - Utility functions including `cn()` for className merging

### Internationalization

Uses i18next with react-i18next for bilingual support (Bulgarian/English):
- Default language: Bulgarian (`bg`)
- Translation files: `src/locales/{bg,en}/translation.json`
- Config: `src/i18n.ts`
- Use `useTranslation()` hook and `t()` function for translated strings

### Styling & UI Components

**Tailwind CSS v4** with shadcn/ui components. Theme colors in `src/index.css`:
- `background`: #1a1a1a (dark background)
- `card`/`secondary`: #2d2d2d (elevated surfaces)
- `primary`/`accent`: #d4af37 (gold - buttons, links, highlights)
- `foreground`: #ffffff (text)
- `muted-foreground`: #b3b3b3 (secondary text)

**shadcn/ui**: Add components with `npx shadcn@latest add <component>`
- Installed: Button, Card, Dialog, Sheet, Input, Textarea, Label, NavigationMenu
- Import from `@/components/ui/<component>`

### Patterns

- `MartialArtPage` component is a reusable template for all martial art discipline pages - pass `artKey` prop to render different content
- All martial art pages follow the same structure: Hero, Benefits, Training, CTA sections
- Use `@/` import alias for src directory (e.g., `import { Button } from '@/components/ui/button'`)