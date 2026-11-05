# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Svelte 5 component library for the Google Maps JavaScript API, structured as a pnpm monorepo using Turborepo. The library provides 20 components plus `useMap` / `useMapsLibrary` / `useAPILoadingStatus` helpers. It only wraps current (non-deprecated) Maps APIs: Advanced Markers, Places API (New) and the Routes library.

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

# Storybook
cd apps/storybook
pnpm dev
```

## Architecture

### Monorepo Structure
- `/packages/svelte-google-maps-api/` - Main library with all Google Maps components
- `/apps/docs/` - SveltePress documentation site
- `/apps/storybook/` - Storybook stories (one per exported component)

### Component Architecture
All components follow a consistent pattern:
1. Components get the API context with `getAPIContext()` and the map with `getMap()` (`src/lib/internal/context.svelte.ts`)
2. Classes come from libraries loaded with `api.importLibrary(name)`. `core` and `maps` are always preloaded, so `api.requireLibrary('maps')` is safe at init
3. Each component manages its own Google Maps object lifecycle (create on mount, destroy on unmount)
4. Props are synced with `$effect`. Values the user can change on the map (camera, marker position, editable geometry) are `$bindable`
5. Maps event listeners go through `addListeners()` (`src/lib/internal/utils.ts`), which runs handlers untracked
6. Content snippets render into a hidden wrapper and are moved into the Google element (marker, info window, control, overlay)
7. TypeScript types come from `@types/google.maps`

### Key Components
- `APIProvider.svelte` - Loads the Maps JavaScript API once per page (`internal/loader.ts`) and provides context
- `GoogleMap.svelte` - The map. Renders children only after the map exists
- All other components must be nested within `GoogleMap`, except `PlaceAutocomplete` and `StreetViewPanorama`
- Do not add components that wrap deprecated Google Maps APIs (check the `@deprecated` tags in `@types/google.maps`)

### Build Process
1. Turborepo orchestrates builds across packages
2. Library uses `svelte-package` for building
3. `publint` validates package before publishing
4. Documentation uses `@sveltejs/adapter-static` for static site generation

## Testing Approach
When adding new features or fixing bugs:
1. Add component tests using Vitest against the mock in `packages/svelte-google-maps-api/tests/googleMapsMock.ts`
2. Update documentation in `/apps/docs/src/routes/components/[component-name]/+page.md`
3. Update the Storybook story and `ComponentStory.svelte` in `/apps/storybook/src/stories/`
4. Run `pnpm docs:sync` after adding or removing exported components
5. Run `pnpm test`, `pnpm check` and `pnpm lint`

## Code Style
- TypeScript with strict mode
- Prettier formatting (tabs, single quotes, no trailing commas)
- ESLint for code quality
- Svelte 5 with runes (`$state`, `$effect`, etc.)

## PR作成時
created By Claudeみたいな文言は不要です