export function deploymentLocation(env = process.env) {
  if (env.SITE_URL) {
    const url = new URL(env.SITE_URL);
    if (!['http:', 'https:'].includes(url.protocol) || url.search || url.hash) throw new Error('SITE_URL must be an http(s) URL without query or fragment.');
    return { site: url.origin, base: url.pathname.replace(/\/$/, '') || '/' };
  }
  const [owner, repository] = (env.GITHUB_REPOSITORY || '').split('/');
  if (owner && repository) return { site: `https://${owner}.github.io`, base: repository.toLowerCase() === `${owner.toLowerCase()}.github.io` ? '/' : `/${repository}` };
  return { site: 'http://localhost:4321', base: '/' };
}
