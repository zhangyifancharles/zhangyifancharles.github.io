import test from 'node:test';
import assert from 'node:assert/strict';
import { deploymentLocation } from '../scripts/deployment.mjs';
import remarkSiteLinks from '../scripts/remark-site-links.mjs';

test('GitHub user sites use the domain root, case insensitively', () => {
  assert.deepEqual(deploymentLocation({ GITHUB_REPOSITORY: 'Alice/alice.github.io' }), { site: 'https://Alice.github.io', base: '/' });
});
test('GitHub project sites and custom subpaths preserve their base', () => {
  assert.deepEqual(deploymentLocation({ GITHUB_REPOSITORY: 'alice/notebook' }), { site: 'https://alice.github.io', base: '/notebook' });
  assert.deepEqual(deploymentLocation({ SITE_URL: 'https://example.org/notes/' }), { site: 'https://example.org', base: '/notes' });
});
test('bad canonical URL schemes, queries and fragments are rejected', () => {
  for (const url of ['javascript:alert(1)', 'https://example.org/?x=1', 'https://example.org/#fragment']) assert.throws(() => deploymentLocation({ SITE_URL: url }));
});
test('Markdown assets and site links work on a project subpath without altering external links', () => {
  const tree = { children: [{ type: 'image', url: '/images/photo.svg' }, { type: 'link', url: '/writing/notes/' }, { type: 'link', url: 'https://example.org/' }, { type: 'link', url: '#section' }, { type: 'link', url: '//example.org/' }] };
  remarkSiteLinks({ base: '/notebook' })(tree);
  assert.deepEqual(tree.children.map((node) => node.url), ['/notebook/images/photo.svg', '/notebook/writing/notes/', 'https://example.org/', '#section', '//example.org/']);
});
