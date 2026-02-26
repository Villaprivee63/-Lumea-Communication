import http from 'node:http';
import { promises as fs } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const PORT = Number.parseInt(process.env.PORT || '8080', 10) || 8080;

const MIME = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.js', 'application/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.xml', 'application/xml; charset=utf-8'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.webp', 'image/webp'],
  ['.avif', 'image/avif'],
  ['.gif', 'image/gif'],
  ['.ico', 'image/x-icon']
]);

function safeDecode(p) {
  try { return decodeURIComponent(p); } catch { return p; }
}

function isInsideRoot(absPath) {
  const rel = path.relative(ROOT, absPath);
  return rel && !rel.startsWith('..') && !path.isAbsolute(rel);
}

async function fileExists(p) {
  try { await fs.stat(p); return true; } catch { return false; }
}

function toFilePath(urlPathname) {
  const pathname = safeDecode(urlPathname);
  if (pathname === '/') return '/index.html';

  if (pathname.endsWith('/')) return pathname + 'index.html';
  return pathname;
}

async function resolveCandidate(urlPathname) {
  const direct = toFilePath(urlPathname);
  const directAbs = path.join(ROOT, direct);
  if (isInsideRoot(directAbs) && await fileExists(directAbs)) return directAbs;

  // Pretty URL -> .html
  if (!path.extname(direct)) {
    const htmlAbs = path.join(ROOT, direct + '.html');
    if (isInsideRoot(htmlAbs) && await fileExists(htmlAbs)) return htmlAbs;

    const indexAbs = path.join(ROOT, direct, 'index.html');
    if (isInsideRoot(indexAbs) && await fileExists(indexAbs)) return indexAbs;
  }

  return null;
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url || '/', 'http://localhost');
    const absPath = await resolveCandidate(url.pathname);

    if (!absPath) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.end('Not found');
      return;
    }

    const ext = path.extname(absPath).toLowerCase();
    const mime = MIME.get(ext) || 'application/octet-stream';
    const buf = await fs.readFile(absPath);

    res.statusCode = 200;
    res.setHeader('Content-Type', mime);
    res.setHeader('Cache-Control', 'no-store');
    res.end(buf);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Server error');
  }
});

server.listen(PORT, '127.0.0.1', () => {
  // LHCI startServerReadyPattern
  console.log(`Listening on http://localhost:${PORT}`);
});

