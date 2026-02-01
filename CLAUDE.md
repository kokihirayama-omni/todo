# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16.1.6 application using the App Router, React 19, TypeScript, and Tailwind CSS v4. The project was bootstrapped with `create-next-app` and follows the standard Next.js App Router structure.

## Development Commands

### Running the Application
- `npm run dev` - Start development server at http://localhost:3000
- `npm run build` - Build production bundle
- `npm start` - Start production server (requires build first)
- `npm run lint` - Run ESLint

### TypeScript
TypeScript strict mode is enabled. The project uses:
- Target: ES2017
- Module resolution: bundler
- Path alias: `@/*` maps to project root

## Architecture

### App Structure
- `app/` - Next.js App Router directory containing routes and layouts
  - `layout.tsx` - Root layout with Geist fonts (sans and mono)
  - `page.tsx` - Homepage component
  - `globals.css` - Global styles with Tailwind imports and CSS variables

### Styling
The project uses Tailwind CSS v4 with PostCSS integration:
- Configured via `postcss.config.mjs` using `@tailwindcss/postcss`
- CSS theme variables defined in `app/globals.css` with dark mode support
- Custom fonts: Geist Sans and Geist Mono loaded via `next/font/google`
- Theme colors managed through CSS variables: `--background` and `--foreground`
- Dark mode handled via `prefers-color-scheme` media query

### Configuration Files
- `next.config.ts` - Next.js configuration (currently minimal)
- `eslint.config.mjs` - ESLint configuration using Next.js presets (core-web-vitals and TypeScript)
- `tsconfig.json` - TypeScript compiler options with Next.js plugin

## Key Patterns

### Font Loading
The application uses Next.js font optimization with Geist fonts. Font variables are applied to the body element and referenced in Tailwind theme configuration via CSS variables.

### Component Structure
Components follow the Next.js App Router conventions with React Server Components by default. Client components must use the `"use client"` directive.

### Image Optimization
The project uses Next.js `<Image>` component for optimized image loading. Static images are stored in the `public/` directory.

## document
- docs/specification.md: 仕様書
