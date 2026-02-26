import { spawn } from 'node:child_process';
import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import lighthouse from 'lighthouse';
import chromeLauncher from 'chrome-launcher';

const ROOT = process.cwd();
const PORT = Number.parseInt(process.env.PORT || '8080', 10) || 8080;
const BASE = `http://localhost:${PORT}`;

const URLS = [
  `${BASE}/fr/`,
  `${BASE}/fr/services.html`,
  `${BASE}/fr/sites-branding.html`,
  `${BASE}/fr/consulting.html`,
  `${BASE}/fr/developpement.html`,
  `${BASE}/fr/formation.html`,
  `${BASE}/fr/realisations.html`,
  `${BASE}/fr/blog.html`,
  `${BASE}/fr/article.html`,
  `${BASE}/fr/contact.html`,
  `${BASE}/fr/mentions-legales.html`,
  `${BASE}/fr/confidentialite.html`,
  `${BASE}/fr/cookies.html`,
  `${BASE}/fr/cgv.html`,
  `${BASE}/fr/zone-intervention.html`
];

const OUT_DIR = path.join(ROOT, '.lighthouseci');
const DOCS_DIR = path.join(ROOT, 'docs');
const OUT_MD = path.join(DOCS_DIR, 'perf-latest.md');
const CLS_THRESHOLD = 0.1;

function slugify(u) {
  return u
    .replace(/^https?:\/\//, '')
    .replace(/[^\w]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

function fmtMs(ms) {
  if (typeof ms !== 'number' || !Number.isFinite(ms)) return '—';
  if (ms >= 1000) return `${(ms / 1000).toFixed(2)} s`;
  return `${Math.round(ms)} ms`;
}

function fmtScore(score) {
  if (typeof score !== 'number' || !Number.isFinite(score)) return '—';
  return `${Math.round(score * 100)}`;
}

function fmtKb(bytes) {
  if (typeof bytes !== 'number' || !Number.isFinite(bytes)) return '—';
  return `${Math.round(bytes / 1024)} KB`;
}

function pickAudit(lhr, id) {
  return lhr?.audits?.[id] || null;
}

async function waitForServerReady(proc, pattern, timeoutMs = 20000) {
  const start = Date.now();
  let buf = '';

  return await new Promise((resolve, reject) => {
    const onData = (chunk) => {
      buf += chunk.toString('utf8');
      if (buf.includes(pattern)) {
        cleanup();
        resolve();
      } else if (Date.now() - start > timeoutMs) {
        cleanup();
        reject(new Error('Server start timeout'));
      }
    };

    const onExit = (code) => {
      cleanup();
      reject(new Error(`Server exited early (${code})`));
    };

    const cleanup = () => {
      proc.stdout?.off('data', onData);
      proc.stderr?.off('data', onData);
      proc.off('exit', onExit);
    };

    proc.on('exit', onExit);
    proc.stdout?.on('data', onData);
    proc.stderr?.on('data', onData);
  });
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.mkdir(DOCS_DIR, { recursive: true });

  const serverProc = spawn(process.execPath, [path.join('tools', 'perf', 'static-server.mjs')], {
    cwd: ROOT,
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, PORT: String(PORT) }
  });

  try {
    await waitForServerReady(serverProc, `Listening on http://localhost:${PORT}`);

    const profileDir = path.join(os.tmpdir(), 'lumea-lighthouse-profile');
    await fs.mkdir(profileDir, { recursive: true });

    const chrome = await chromeLauncher.launch({
      chromeFlags: [
        '--headless=new',
        '--disable-gpu',
        '--no-first-run',
        '--no-default-browser-check',
        '--disable-dev-shm-usage'
      ],
      userDataDir: profileDir
    });

    const results = [];
    const clsViolations = [];

    try {
      for (const url of URLS) {
        const res = await lighthouse(url, {
          port: chrome.port,
          logLevel: 'error',
          output: 'json',
          onlyCategories: ['performance', 'accessibility', 'seo', 'best-practices']
        });

        const lhr = res.lhr;
        const jsonPath = path.join(OUT_DIR, `lhr-${slugify(url)}.json`);
        await fs.writeFile(jsonPath, JSON.stringify(lhr, null, 2), 'utf8');

        const perf = lhr?.categories?.performance?.score;
        const seo = lhr?.categories?.seo?.score;
        const a11y = lhr?.categories?.accessibility?.score;
        const bp = lhr?.categories?.['best-practices']?.score;

        const lcp = pickAudit(lhr, 'largest-contentful-paint')?.numericValue;
        const cls = pickAudit(lhr, 'cumulative-layout-shift')?.numericValue;
        const tbt = pickAudit(lhr, 'total-blocking-time')?.numericValue;
        const tti = pickAudit(lhr, 'interactive')?.numericValue;
        const weight = pickAudit(lhr, 'total-byte-weight')?.numericValue;
        const reqs = pickAudit(lhr, 'network-requests')?.details?.items?.length;

        results.push({
          url,
          jsonPath: path.relative(ROOT, jsonPath),
          perf: fmtScore(perf),
          seo: fmtScore(seo),
          a11y: fmtScore(a11y),
          bp: fmtScore(bp),
          lcp: fmtMs(lcp),
          cls: typeof cls === 'number' ? cls.toFixed(3) : '—',
          tbt: fmtMs(tbt),
          tti: fmtMs(tti),
          weight: fmtKb(weight),
          reqs: typeof reqs === 'number' ? String(reqs) : '—'
        });

        if (typeof cls === 'number' && cls > CLS_THRESHOLD) {
          clsViolations.push({ url, cls });
        }
      }
    } finally {
      await chrome.kill();
    }

    results.sort((a, b) => a.url.localeCompare(b.url));

    const md = [
      '# Lighthouse (mobile) – dernier run',
      '',
      `Généré le ${new Date().toISOString()}.`,
      '',
      '> Note: Lighthouse est un test **lab**. Les signaux INP terrain nécessitent CrUX/RUM. On reporte aussi TBT (proxy lab de réactivité).',
      '',
      '| URL | Perf | SEO | A11Y | BP | LCP | CLS | TBT | TTI | Poids | Requêtes |',
      '|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|'
    ];

    for (const r of results) {
      md.push(
        `| ${r.url} | ${r.perf} | ${r.seo} | ${r.a11y} | ${r.bp} | ${r.lcp} | ${r.cls} | ${r.tbt} | ${r.tti} | ${r.weight} | ${r.reqs} |`
      );
    }

    md.push(
      '',
      '## Fichiers JSON (LHR)',
      '',
      ...results.map(r => `- \`${r.jsonPath}\``),
      ''
    );

    await fs.writeFile(OUT_MD, md.join('\n'), 'utf8');

    console.log(`Wrote ${path.relative(ROOT, OUT_MD)}`);

    if (clsViolations.length) {
      const lines = clsViolations
        .sort((a, b) => b.cls - a.cls)
        .map(v => `- ${v.url} CLS=${v.cls.toFixed(3)}`);
      console.error(`CLS threshold failed (>${CLS_THRESHOLD}).\n` + lines.join('\n'));
      process.exitCode = 1;
    }
  } finally {
    serverProc.kill();
  }
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});

