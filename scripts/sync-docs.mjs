import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(new URL('../package.json', import.meta.url)));
const checkOnly = process.argv.includes('--check');

const preferredOrder = [
	'APIProvider',
	'GoogleMap',
	'Marker',
	'AdvancedMarker',
	'MarkerClusterer',
	'GoogleMarkerClusterer',
	'InfoWindow',
	'InfoBox',
	'Polyline',
	'Polygon',
	'Circle',
	'Rectangle',
	'Data',
	'DrawingManager',
	'DirectionsRenderer',
	'DirectionsService',
	'DistanceMatrixService',
	'HeatmapLayer',
	'KmlLayer',
	'TrafficLayer',
	'TransitLayer',
	'BicyclingLayer',
	'GroundOverlay',
	'MapControl',
	'Autocomplete',
	'StandaloneSearchBox',
	'OverlayView',
	'StreetViewPanorama',
	'StreetViewService'
];

function readJson(path) {
	return JSON.parse(readFileSync(path, 'utf8'));
}

function toKebabCase(value) {
	return value
		.replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
		.replace(/([a-z0-9])([A-Z])/g, '$1-$2')
		.toLowerCase();
}

function storyId(componentName) {
	return `components-${componentName.toLowerCase()}--basic`;
}

function getExportedComponents() {
	const pkg = readJson(join(root, 'packages/svelte-google-maps-api/package.json'));

	return Object.keys(pkg.exports)
		.filter((key) => key !== '.' && key.endsWith('.svelte'))
		.map((key) => basename(key, '.svelte'));
}

function compareSets(label, expected, actual) {
	const missing = expected.filter((item) => !actual.includes(item));
	const extra = actual.filter((item) => !expected.includes(item));
	const errors = [];

	if (missing.length) errors.push(`${label} missing: ${missing.join(', ')}`);
	if (extra.length) errors.push(`${label} extra: ${extra.join(', ')}`);

	return errors;
}

const exportedComponents = getExportedComponents();
const errors = compareSets('preferred component order', exportedComponents, preferredOrder);
const components = preferredOrder.filter((component) => exportedComponents.includes(component));

const navFile = join(root, 'apps/docs/src/lib/component-nav.ts');
const generated = `export type ComponentNavItem = {
\ttitle: string;
\tto: string;
\tstoryId: string;
};

export const componentItems = [
${components
	.map(
		(component) =>
			`\t{\n\t\ttitle: '${component}',\n\t\tto: '/components/${toKebabCase(
				component
			)}/',\n\t\tstoryId: '${storyId(component)}'\n\t}`
	)
	.join(',\n')}
] as const satisfies readonly ComponentNavItem[];
`;

if (checkOnly) {
	const current = existsSync(navFile) ? readFileSync(navFile, 'utf8') : '';
	if (current !== generated) {
		errors.push('apps/docs/src/lib/component-nav.ts is out of sync. Run `pnpm docs:sync`.');
	}
} else {
	writeFileSync(navFile, generated);
}

const docsDir = join(root, 'apps/docs/src/routes/components');
const storyDir = join(root, 'apps/storybook/src/stories');

for (const component of components) {
	const slug = toKebabCase(component);
	const docsPage = join(docsDir, slug, '+page.md');
	const storyFile = join(storyDir, `${component}.stories.ts`);
	const expectedStoryId = storyId(component);

	if (!existsSync(docsPage)) {
		errors.push(`Missing docs page for ${component}: ${docsPage}`);
	} else {
		const docs = readFileSync(docsPage, 'utf8');
		if (!docs.includes(`title: ${component}`)) {
			errors.push(`Docs page title is not synchronized for ${component}.`);
		}
		if (!docs.includes(`/storybook/?path=/story/${expectedStoryId}`)) {
			errors.push(`Docs page is missing the Storybook link for ${component}.`);
		}
	}

	if (!existsSync(storyFile)) {
		errors.push(`Missing Storybook story for ${component}: ${storyFile}`);
	} else {
		const story = readFileSync(storyFile, 'utf8');
		if (!story.includes(`title: 'Components/${component}'`)) {
			errors.push(`Storybook title is not synchronized for ${component}.`);
		}
		if (!story.includes(`componentName: '${component}'`)) {
			errors.push(`Storybook ComponentStory componentName is not synchronized for ${component}.`);
		}
	}
}

if (errors.length) {
	console.error(errors.map((error) => `- ${error}`).join('\n'));
	process.exit(1);
}

console.log(`Docs synchronized for ${components.length} exported components.`);
