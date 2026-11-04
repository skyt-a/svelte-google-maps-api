# Changelog

All notable changes to this project are documented in this file.

This project follows semantic versioning while the public API stabilizes.

## 0.3.0 - Unreleased

This release rebuilds the library on Svelte 5 runes and the current Google Maps APIs. It contains breaking changes. See the [migration guide](https://skyt-a.github.io/svelte-google-maps-api/guide/migration/).

### Added

- `Pin` for customising Advanced Marker pins.
- `PlaceAutocomplete`, built on `PlaceAutocompleteElement` (Places API New).
- `RouteRenderer`, for routes from the Routes library (`google.maps.routes.Route`).
- `useMap`, `useMapsLibrary` and `useAPILoadingStatus` helpers.
- `GoogleMap` camera props with two-way binding (`bind:center`, `bind:zoom`, `bind:heading`, `bind:tilt`), plus `onIdle`, `onBoundsChanged` and `onCameraChanged` events.
- Bindable geometry on editable shapes, `bind:position` on draggable markers, `bind:open` on `InfoWindow`, and bindable instances on every component.
- On-demand library loading through `importLibrary()`. `APIProvider` `libraries` is now only a preload hint.

### Changed

- All components use runes and snippets. Slots are gone.
- `MarkerClusterer` clusters `AdvancedMarker` children.
- `AdvancedMarker` uses DOM events (`gmp-click`, `gmp-drag*`) and appends child content instead of using the deprecated `content` and `addListener` APIs.
- `GoogleMap`: `mapContainerStyle` → `style`, `mapContainerClassName` → `class`, `onRightClick` → `onContextMenu`.
- Upgraded `@types/google.maps` to 3.66, `svelte-check` to 4 and Prettier to 3. Svelte files are now formatted and type-checked, and Storybook is type-checked in CI.

### Removed

- `Marker` (deprecated by Google in February 2024), and the `Marker`-based `MarkerClusterer` / `GoogleMarkerClusterer`.
- `DrawingManager` (Drawing library unavailable from Maps JS API 3.65), `HeatmapLayer` (unavailable since May 2026) and `KmlLayer` (unavailable from 3.66).
- `Autocomplete` and `StandaloneSearchBox` (legacy Places, closed to new customers).
- `DirectionsService`, `DirectionsRenderer` and `DistanceMatrixService` (deprecated in February 2026).
- `InfoBox`, `StreetViewService`, the pane name constants and the internal `isReady` store.

## 0.2.3 - 2026-05-31

- Added PR CI for docs synchronization, package checks, lint, tests, builds, and docs smoke tests.
- Added OSS maintenance documents, issue templates, and a pull request template.
- Kept component docs navigation synchronized with package exports and Storybook entries.
- Removed runtime debug logging from library components and cleaned up lint warnings.

## 0.2.2 - 2026-05-31

- Added unit test coverage for all public Svelte components using Google Maps API mocks.
- Fixed `OverlayView` slot visibility while preserving pane insertion behavior.
- Published package README content with component, library, SSR, and troubleshooting guidance.

## 0.2.1 - 2026-05-30

- Published follow-up fixes for the `0.2.x` component and documentation expansion.

## 0.2.0 - 2026-05-30

- Added docs and Storybook coverage for the expanded component set.
- Added newer map, layer, places, services, street view, data, and clustering components.
