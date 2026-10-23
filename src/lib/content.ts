import { getCollection } from 'astro:content';
import { selectEntries, selectFeatured } from './publishing.mjs';

export const isPreview = import.meta.env.DEV;
export async function getArticles(options: { publishedOnly?: boolean } = {}) {
  const entries = await getCollection('writing');
  return selectEntries(entries, { preview: isPreview && !options.publishedOnly });
}
export async function getProjects(options: { publishedOnly?: boolean } = {}) {
  const entries = await getCollection('projects');
  return selectEntries(entries, { preview: isPreview && !options.publishedOnly });
}
export { selectFeatured };
export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', year: 'numeric', month: 'long', day: 'numeric' }).format(date);
}
export function isoDate(date: Date) { return date.toISOString().slice(0, 10); }
export function category(kind: string) { return kind === 'technical' ? 'Research & technical' : 'Notes & essays'; }
