import { readFile } from 'node:fs/promises';
const profile = JSON.parse(await readFile(new URL('../src/data/profile.json', import.meta.url), 'utf8'));
const errors = [];
if (profile.readyToPublish !== true) errors.push('Set readyToPublish to true when the owner approves publication.');
for (const key of ['displayName', 'siteName', 'description', 'introduction']) {
  if (typeof profile[key] !== 'string' || !profile[key].trim() || /your name|to be added|placeholder/i.test(profile[key])) errors.push(`${key} must contain real, non-placeholder text.`);
}
for (const key of ['about', 'beliefs', 'interests']) {
  if (!Array.isArray(profile[key]) || profile[key].some((item) => typeof item !== 'string' || !item.trim())) errors.push(`${key} must be an array of non-empty strings; an empty array is allowed.`);
}
if (profile.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) errors.push('Invalid email address.');
for (const [label, value] of [['GitHub', profile.github], ...profile.otherLinks.map((link) => [link.label, link.url])]) {
  if (!value) continue;
  try { const url = new URL(value); if (!['https:', 'http:'].includes(url.protocol)) throw new Error(); }
  catch { errors.push(`${label} must be an absolute http/https URL.`); }
}
if (errors.length) { console.error('Profile is not ready for publication:\n' + errors.map((error) => `- ${error}`).join('\n')); process.exitCode = 1; }
else console.log('Profile is ready for publication.');
