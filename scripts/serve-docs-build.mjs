import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, relative, resolve } from 'node:path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(new URL('../package.json', import.meta.url)));
const docsRoot = resolve(root, 'apps/docs/build');
const basePath = '/svelte-google-maps-api';
const port = Number(process.env.PORT ?? 4173);

const contentTypes = {
	'.css': 'text/css; charset=utf-8',
	'.html': 'text/html; charset=utf-8',
	'.js': 'text/javascript; charset=utf-8',
	'.json': 'application/json; charset=utf-8',
	'.map': 'application/json; charset=utf-8',
	'.png': 'image/png',
	'.svg': 'image/svg+xml',
	'.woff': 'font/woff',
	'.woff2': 'font/woff2'
};

function resolveRequestPath(requestUrl) {
	const url = new URL(requestUrl ?? '/', `http://127.0.0.1:${port}`);
	let pathname = decodeURIComponent(url.pathname);

	if (pathname === basePath) return { redirect: `${basePath}/` };
	if (pathname.startsWith(`${basePath}/`)) pathname = pathname.slice(basePath.length);
	if (!pathname.startsWith('/')) pathname = `/${pathname}`;

	let filePath = normalize(join(docsRoot, pathname));
	if (!relative(docsRoot, filePath).startsWith('..')) {
		if (existsSync(filePath) && statSync(filePath).isDirectory()) {
			filePath = join(filePath, 'index.html');
		} else if (!existsSync(filePath) && !extname(filePath)) {
			filePath = join(filePath, 'index.html');
		}
	}

	return { filePath };
}

const server = createServer((request, response) => {
	const resolved = resolveRequestPath(request.url);

	if (resolved.redirect) {
		response.writeHead(302, { Location: resolved.redirect });
		response.end();
		return;
	}

	const filePath = resolved.filePath;
	if (!filePath || relative(docsRoot, filePath).startsWith('..') || !existsSync(filePath)) {
		response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
		response.end('Not found');
		return;
	}

	const extension = extname(filePath);
	response.writeHead(200, {
		'content-type': contentTypes[extension] ?? 'application/octet-stream'
	});
	createReadStream(filePath).pipe(response);
});

server.listen(port, '127.0.0.1', () => {
	console.log(`Serving docs build at http://127.0.0.1:${port}${basePath}/`);
});
