# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Svelte component library for Google Maps API integration, structured as a pnpm monorepo using Turborepo. The library provides 20+ components for declarative Google Maps usage in Svelte 5 applications.

## Key Commands

### Development
```bash
# Install dependencies
pnpm install

# Start development servers (library + docs)
pnpm dev

# Build everything
pnpm build

# Build only the library package
pnpm package

# Type checking
pnpm check

# Linting
pnpm lint

# Format code
pnpm format

# Run tests
pnpm test
```

### Working on specific packages
```bash
# Library development
cd packages/svelte-google-maps-api
pnpm dev

# Documentation site
cd apps/docs
pnpm dev

# Examples
cd apps/examples
pnpm dev
```

## Architecture

### Monorepo Structure
- `/packages/svelte-google-maps-api/` - Main library with all Google Maps components
- `/apps/docs/` - SveltePress documentation site
- `/apps/examples/` - Example applications

### Component Architecture
All components follow a consistent pattern:
1. Components use `getContext` to access the Google Maps API instance from `APIProvider`
2. Each component manages its own Google Maps object lifecycle (create on mount, destroy on unmount)
3. Props are reactive using `$effect` for Svelte 5 runes
4. TypeScript types are imported from `@types/google.maps`

### Key Components
- `APIProvider.svelte` - Loads Google Maps API and provides context
- `GoogleMap.svelte` - Main map container that provides map instance to children
- All other components require being nested within `GoogleMap` (except `Autocomplete` and `StreetViewPanorama`)

### Build Process
1. Turborepo orchestrates builds across packages
2. Library uses `svelte-package` for building
3. `publint` validates package before publishing
4. Documentation uses `@sveltejs/adapter-static` for static site generation

## Testing Approach
When adding new features or fixing bugs:
1. Create or update the example in `/apps/examples/`
2. Add component tests using Vitest
3. Update documentation in `/apps/docs/src/routes/components/[component-name]/+page.md`
4. Run `pnpm test` to ensure all tests pass

## Code Style
- TypeScript with strict mode
- Prettier formatting (tabs, single quotes, no trailing commas)
- ESLint for code quality
- Svelte 5 with runes (`$state`, `$effect`, etc.)

## PR作成時
created By Claudeみたいな文言は不要です