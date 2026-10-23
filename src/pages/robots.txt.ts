import type { APIContext } from 'astro';
import profile from '../data/profile.json';
import { href } from '../lib/links';
export function GET({ site, url }: APIContext) {
  const body = profile.readyToPublish ? `User-agent: *\nAllow: /\nSitemap: ${new URL(href('sitemap-index.xml'), site ?? url.origin)}\n` : 'User-agent: *\nDisallow: /\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
