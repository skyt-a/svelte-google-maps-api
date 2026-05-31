import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(new URL('../package.json', import.meta.url)));
const storybookBuild = join(root, 'apps/storybook/storybook-static');
const docsStorybook = join(root, 'apps/docs/build/storybook');

if (!existsSync(storybookBuild)) {
	console.error('Storybook build output is missing. Run `pnpm build --filter=storybook` first.');
	process.exit(1);
}

rmSync(docsStorybook, { recursive: true, force: true });
mkdirSync(docsStorybook, { recursive: true });
cpSync(storybookBuild, docsStorybook, { recursive: true });

console.log('Attached Storybook static build to apps/docs/build/storybook.');
