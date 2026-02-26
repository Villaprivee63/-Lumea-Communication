import { promises as fs } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const MANIFEST_PATH = path.join(ROOT, '.lighthouseci', 'manifest.json');
const OUT_DIR = path.join(ROOT, 'docs');
const OUT_MD = path.join(OUT_DIR, 'perf-latest.md');

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

async function main() {
  const raw = await fs.readFile(MANIFEST_PATH, 'utf8');
  const manifest = JSON.parse(raw);

  const rows = [];
  for (const entry of manifest) {
    const lhrPath = path.isAbsolute(entry.jsonPath)
      ? entry.jsonPath
      : path.join(ROOT, entry.jsonPath);

    const lhr = JSON.parse(await fs.readFile(lhrPath, 'utf8'));

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

    rows.push({
      url: entry.url,
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

  rows.sort((a, b) => a.url.localeCompare(b.url));

  await fs.mkdir(OUT_DIR, { recursive: true });

  const md = [
    '# Lighthouse (mobile) – dernier run',
    '',
    `Généré le ${new Date().toISOString()}.`,
    '',
    '> Note: Lighthouse est un test **lab**. Pour INP terrain, il faut CrUX/GA4/Real User Monitoring.',
    '',
    '| URL | Perf | SEO | A11Y | BP | LCP | CLS | TBT | TTI | Poids | Requêtes |',
    '|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|'
  ];

  for (const r of rows) {
    md.push(
      `| ${r.url} | ${r.perf} | ${r.seo} | ${r.a11y} | ${r.bp} | ${r.lcp} | ${r.cls} | ${r.tbt} | ${r.tti} | ${r.weight} | ${r.reqs} |`
    );
  }

  md.push('', `Sources: \`${path.relative(ROOT, MANIFEST_PATH)}\` + JSON LHR dans \`.lighthouseci/\`.`, '');

  await fs.writeFile(OUT_MD, md.join('\n'), 'utf8');

  // eslint-disable-next-line no-console
  console.log(`Wrote ${path.relative(ROOT, OUT_MD)}`);
}

main().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exitCode = 1;
});

