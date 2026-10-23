/** Never treat a draft flag as a privacy boundary for a public repository. */
/** @template {{ data: { slug: string, date: Date | string, draft?: boolean, demo?: boolean } }} T
 * @param {T[]} entries
 * @param {{ preview?: boolean }} [options]
 * @returns {T[]}
 */
export function selectEntries(entries, { preview = false } = {}) {
  const slugs = new Set();
  for (const entry of entries) {
    if (slugs.has(entry.data.slug)) throw new Error(`Duplicate slug: ${entry.data.slug}`);
    slugs.add(entry.data.slug);
    if (!entry.data.draft && !entry.data.demo && isFutureDate(entry.data.date)) throw new Error(`Future publication date is not supported: ${entry.data.slug}`);
  }
  return entries
    .filter(({ data }) => !data.draft && (preview || !data.demo))
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime() || a.data.slug.localeCompare(b.data.slug));
}

/** @template {{ data: { featured?: boolean } }} T
 * @param {T[]} entries
 * @param {number} limit
 * @returns {T[]}
 */
export function selectFeatured(entries, limit) {
  return [...entries.filter((entry) => entry.data.featured), ...entries.filter((entry) => !entry.data.featured)].slice(0, limit);
}

/** @param {Date | string} value @param {Date} [now] */
export function isFutureDate(value, now = new Date()) {
  // Publication dates are calendar dates in Asia/Tokyo, not UTC instants.
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Tokyo', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
  return new Date(value).toISOString().slice(0, 10) > today;
}
