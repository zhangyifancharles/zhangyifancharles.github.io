import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getArticles } from '../lib/content';
import profile from '../data/profile.json';
import { href } from '../lib/links';
export async function GET(context: APIContext) {
  const articles = await getArticles({ publishedOnly: true });
  return rss({ title: profile.siteName, description: profile.description, site: context.site ?? context.url.origin, items: articles.map(({ data }) => ({ title: data.title, pubDate: data.date, description: data.summary, link: href(`writing/${data.slug}/`) })), customData: '<language>en</language>' });
}
