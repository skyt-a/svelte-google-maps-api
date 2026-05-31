# Contributing

Thanks for taking time to improve `svelte-google-maps-api`.

## Development Setup

```bash
corepack pnpm install
```

Use Node.js 20 or newer. The repository is a pnpm workspace with the library in `packages/svelte-google-maps-api`, docs in `apps/docs`, and Storybook in `apps/storybook`.

## Common Commands

```bash
corepack pnpm test
corepack pnpm check
corepack pnpm lint
corepack pnpm build
corepack pnpm docs:sync:check
```

Run `corepack pnpm docs:sync` after adding, removing, or renaming exported Svelte components. It keeps the docs navigation synchronized with the package exports and checks that every component has a docs page and a Storybook story.

## Component Changes

For new or changed components, include:

- The Svelte component and package export.
- A docs page under `apps/docs/src/routes/components`.
- A Storybook story under `apps/storybook/src/stories`.
- Unit tests under `packages/svelte-google-maps-api/tests`.
- Any required Google Maps library notes in docs and README when relevant.

## Pull Requests

Before opening a pull request:

- Keep changes scoped to one feature or fix.
- Run the checks listed above.
- Update docs and tests together with behavior changes.
- Avoid committing local secrets, API keys, generated build output, or OS metadata files.

## Google Maps API Keys

Examples and Storybook may need a browser API key for manual verification. Use a restricted key and do not commit it. Storybook accepts keys through its UI or the `STORYBOOK_GOOGLE_MAPS_API_KEY` environment variable.
