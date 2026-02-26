import { spawn } from 'node:child_process';
import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import lighthouse from 'lighthouse';
import chromeLauncher from 'chrome-launcher';

function getArg(name) {
  const i = process.argv.indexOf(name);
  if (i === -1) return null;
  return process.argv[i + 1] || null;
}

const ROOT = process.cwd();
const TARGET_ROOT = path.resolve(getArg('--root') || ROOT);
const PORT = Number.parseInt(process.env.PORT || getArg('--port') || '8080', 10) || 8080;
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
  // Inline, minimal static server (so it works even for the baseline worktree).
  const serverFile = path.join(ROOT, 'tools', 'perf', 'static-server.mjs');
  const serverProc = spawn(process.execPath, [serverFile], {
    cwd: TARGET_ROOT,
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, PORT: String(PORT) }
  });

  const runId = getArg('--id') || 'run';
  const outDir = path.join(ROOT, '.lighthouseci', runId);
  const outMd = path.join(ROOT, 'docs', `perf-${runId}.md`);

  await fs.mkdir(outDir, { recursive: true });
  await fs.mkdir(path.join(ROOT, 'docs'), { recursive: true });

  try {
    await waitForServerReady(serverProc, `Listening on http://localhost:${PORT}`);

    const profileDir = path.join(os.tmpdir(), `lumea-lighthouse-profile-${runId}`);
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

    try {
      for (const url of URLS) {
        const res = await lighthouse(url, {
          port: chrome.port,
          logLevel: 'error',
          output: 'json',
          onlyCategories: ['performance', 'accessibility', 'seo', 'best-practices']
        });

        const lhr = res.lhr;
        const jsonPath = path.join(outDir, `lhr-${slugify(url)}.json`);
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
          jsonPath: path.relative(ROOT, jsonPath).replaceAll('\\', '/'),
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
      }
    } finally {
      await chrome.kill();
    }

    results.sort((a, b) => a.url.localeCompare(b.url));

    const md = [
      `# Lighthouse (mobile) – ${runId}`,
      '',
      `Root servi: \`${TARGET_ROOT}\``,
      `Généré le ${new Date().toISOString()}.`,
      '',
      '| URL | Perf | SEO | A11Y | BP | LCP | CLS | TBT | TTI | Poids | Requêtes |',
      '|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|'
    ];

    for (const r of results) {
      md.push(
        `| ${r.url} | ${r.perf} | ${r.seo} | ${r.a11y} | ${r.bp} | ${r.lcp} | ${r.cls} | ${r.tbt} | ${r.tti} | ${r.weight} | ${r.reqs} |`
      );
    }

    md.push('', '## Fichiers JSON (LHR)', '', ...results.map(r => `- \`${r.jsonPath}\``), '');

    await fs.writeFile(outMd, md.join('\n'), 'utf8');
    console.log(`Wrote ${path.relative(ROOT, outMd)}`);
  } finally {
    serverProc.kill();
  }
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});

