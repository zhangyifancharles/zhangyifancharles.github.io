/** Prefix site-root Markdown links and public images for GitHub project sites. */
export default function remarkSiteLinks({ base = '/' } = {}) {
  const prefix = base === '/' ? '' : base.replace(/\/$/, '');
  return (tree) => {
    function visit(node) {
      if (['link', 'image', 'definition'].includes(node.type) && typeof node.url === 'string' && node.url.startsWith('/') && !node.url.startsWith('//')) node.url = `${prefix}${node.url}`;
      if (node.children) node.children.forEach(visit);
    }
    visit(tree);
  };
}
