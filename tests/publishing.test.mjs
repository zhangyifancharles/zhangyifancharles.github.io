import test from 'node:test';
import assert from 'node:assert/strict';
import { selectEntries, selectFeatured, isFutureDate } from '../src/lib/publishing.mjs';
const entry = (slug, extra = {}) => ({ data: { slug, date: new Date('2026-01-01'), draft: false, demo: false, featured: false, ...extra } });

test('production excludes both drafts and demonstration entries', () => {
  const entries = [entry('published'), entry('draft', { draft: true }), entry('demo', { demo: true }), entry('featured-draft', { draft: true, featured: true })];
  assert.deepEqual(selectEntries(entries).map((e) => e.data.slug), ['published']);
});
test('local preview includes demos but never drafts', () => {
  assert.deepEqual(selectEntries([entry('demo', { demo: true }), entry('draft', { draft: true }), entry('public')], { preview: true }).map((e) => e.data.slug), ['demo', 'public']);
});
test('duplicate URL identifiers fail even when one entry is hidden', () => {
  assert.throws(() => selectEntries([entry('same'), entry('same', { draft: true })]), /Duplicate slug/);
});
test('sorting is newest first and deterministic when dates match', () => {
  const entries = [entry('z'), entry('a'), entry('new', { date: new Date('2026-02-01') })];
  assert.deepEqual(selectEntries(entries).map((e) => e.data.slug), ['new', 'a', 'z']);
});
test('featured entries come first, then latest; source order is preserved', () => {
  const entries = [entry('new'), entry('pick', { featured: true }), entry('older')];
  assert.deepEqual(selectFeatured(entries, 2).map((e) => e.data.slug), ['pick', 'new']);
  assert.equal(entries[0].data.slug, 'new');
  assert.deepEqual(selectFeatured([], 3), []);
});
test('future publication dates use the Japan calendar date at the UTC day boundary', () => {
  const now = new Date('2026-10-22T16:00:00Z');
  assert.equal(isFutureDate('2026-10-23', now), false);
  assert.equal(isFutureDate('2026-10-24', now), true);
});
test('unsupported scheduled publishing is rejected rather than silently released', () => {
  assert.throws(() => selectEntries([entry('future', { date: new Date('2999-01-01') })]), /Future publication/);
});
