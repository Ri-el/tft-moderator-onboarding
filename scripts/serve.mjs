import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const project = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const directory = process.argv[2] || 'dist';
if (!['dist', 'build'].includes(directory)) throw new Error('Use dist or build as the serving directory.');
const root = path.join(project, directory);
await fs.access(path.join(root, 'index.html')).catch(() => {
  throw new Error('Site files not found. Run npm run build before npm run preview.');
});
const port = Number(process.env.PORT || 4173);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('PORT must be between 1 and 65535.');
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.png': 'image/png', '.svg': 'image/svg+xml', '.ttf': 'font/ttf', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8' };
const server = http.createServer(async (request, response) => {
  try {
    if (!['GET', 'HEAD'].includes(request.method)) {response.writeHead(405, { Allow: 'GET, HEAD' }).end();return;}
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const target = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!target.startsWith(root + path.sep) || path.relative(root, target).split(path.sep).some(part => part.startsWith('.'))) {
      response.writeHead(403).end('Forbidden');return;
    }
    const bytes = await fs.readFile(target);
    response.writeHead(200, { 'Content-Type': types[path.extname(target)] || 'application/octet-stream', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
    response.end(request.method === 'HEAD' ? undefined : bytes);
  } catch (error) {
    response.writeHead(error instanceof URIError ? 400 : 404).end('Not found');
  }
});
server.on('error', error => {console.error(error.message);process.exitCode=1;});
server.listen(port, '127.0.0.1', () => console.log(`Local: http://127.0.0.1:${port} (${directory}/)`));
