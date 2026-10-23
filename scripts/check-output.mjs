import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { parseHTML } from 'linkedom';
import { parse as parseYAML } from 'yaml';
import { deploymentLocation } from './deployment.mjs';
import { selectEntries } from '../src/lib/publishing.mjs';

const root = path.resolve('dist');
const location = deploymentLocation();
const base = location.base === '/' ? '' : location.base;
const errors = [];
async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => entry.isDirectory() ? walk(path.join(directory, entry.name)) : [path.join(directory, entry.name)]))).flat();
}
const files = await walk(root);
const htmlFiles = files.filter((file) => file.endsWith('.html'));
const documents = new Map();
let checkedLinks = 0;
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const { document } = parseHTML(html);
  documents.set(file, document);
  if (document.querySelector('.preview-notice')) errors.push(`Preview banner leaked into ${file}`);
  if (!document.querySelector('h1')) errors.push(`Missing main heading: ${file}`);
  if (document.querySelectorAll('h1').length !== 1) errors.push(`Expected one h1: ${file}`);
  for (const image of document.querySelectorAll('img')) {
    if (!image.hasAttribute('alt')) errors.push(`Image missing alt: ${file}`);
  }
}
for (const [file, document] of documents) {
  const relative = path.relative(root, file).split(path.sep).join('/');
  const pathname = `/${relative.replace(/index\.html$/, '')}`;
  const origin = new URL(`${base}${pathname}`, location.site);
  for (const element of document.querySelectorAll('a[href], img[src], script[src], link[rel="stylesheet"][href], link[rel="icon"][href], meta[property="og:image"][content]')) {
    const value = element.getAttribute('href') ?? element.getAttribute('src') ?? element.getAttribute('content');
    if (!value || /^(mailto:|tel:|data:)/.test(value)) continue;
    const url = new URL(value, origin);
    if (url.origin !== origin.origin) continue;
    checkedLinks++;
    if (base && !url.pathname.startsWith(`${base}/`)) { errors.push(`Escaped base path: ${value} in ${relative}`); continue; }
    const normalized = decodeURIComponent(base ? url.pathname.slice(base.length) : url.pathname);
    let target = path.join(root, normalized);
    try {
      if ((await stat(target)).isDirectory()) target = path.join(target, 'index.html');
      await stat(target);
      if (url.hash && target.endsWith('.html')) {
        const targetDocument = documents.get(target);
        if (targetDocument && !targetDocument.getElementById(decodeURIComponent(url.hash.slice(1)))) errors.push(`Missing anchor: ${value} in ${relative}`);
      }
    } catch { errors.push(`Broken internal resource: ${value} in ${relative}`); }
  }
}
for (const collection of ['writing', 'projects']) {
  const sourceFiles = (await walk(path.resolve('src/content', collection))).filter((file) => file.endsWith('.md'));
  const entries = await Promise.all(sourceFiles.map(async (file) => {
    const source = await readFile(file, 'utf8');
    const frontmatter = source.match(/^---\s*\n([\s\S]*?)\n---/);
    if (!frontmatter) throw new Error(`Missing frontmatter: ${file}`);
    return { data: parseYAML(frontmatter[1]) };
  }));
  const published = selectEntries(entries);
  const allowed = new Set(published.map((entry) => entry.data.slug));
  for (const entry of entries) {
    const output = path.join(root, collection, entry.data.slug, 'index.html');
    const exists = files.includes(output);
    if (exists !== allowed.has(entry.data.slug)) errors.push(`Publication boundary failed: ${collection}/${entry.data.slug}`);
  }
  const archiveExists = files.includes(path.join(root, collection, 'index.html'));
  if (!archiveExists) errors.push(`Missing archive: ${collection}`);
  const rss = await readFile(path.join(root, 'rss.xml'), 'utf8');
  const sitemapFiles = files.filter((file) => /sitemap.*\.xml$/.test(file));
  const sitemap = (await Promise.all(sitemapFiles.map((file) => readFile(file, 'utf8')))).join('\n');
  for (const entry of entries.filter((entry) => !allowed.has(entry.data.slug))) {
    if (rss.includes(entry.data.slug) || sitemap.includes(entry.data.slug)) errors.push(`Hidden content leaked into RSS/sitemap: ${entry.data.slug}`);
  }
}
if (errors.length) { console.error(errors.map((error) => `✗ ${error}`).join('\n')); process.exitCode = 1; }
else console.log(`✓ Static output: ${htmlFiles.length} HTML pages, ${checkedLinks} internal links/resources; drafts, demos, empty archives, RSS and sitemap checked.`);
