import { getMarketplacesData } from '../actions';

export const revalidate = 3600; // Revalidate every hour

export default async function MarkdownHome() {
  const marketplaces = await getMarketplacesData();

  // Generate markdown content
  const markdown = `# Claude Code Plugins

Discover and install plugins for Claude Code from multiple community marketplaces.

## About

This is a directory of Claude Code plugin marketplaces. Each marketplace contains multiple plugins that extend Claude Code with new capabilities.

Total marketplaces: ${marketplaces.length}
Total plugins: ${marketplaces.reduce((sum, m) => sum + (m.pluginCount || 0), 0)}

## Marketplaces

${marketplaces.map((marketplace) => {
  const lines = [
    `### ${marketplace.name}`,
    '',
    marketplace.description,
    '',
    `- **Owner**: ${marketplace.owner.name}${marketplace.owner.url ? ` (${marketplace.owner.url})` : ''}`,
    `- **Repository**: ${marketplace.repository}`,
    marketplace.pluginCount !== undefined ? `- **Plugins**: ${marketplace.pluginCount}` : null,
    marketplace.stars !== undefined ? `- **GitHub Stars**: ${marketplace.stars}` : null,
    marketplace.lastUpdated ? `- **Last Updated**: ${marketplace.lastUpdated}` : null,
    marketplace.verified ? `- **Status**: Verified ✓` : null,
    marketplace.tags && marketplace.tags.length > 0 ? `- **Tags**: ${marketplace.tags.join(', ')}` : null,
    '',
    `**Installation**:`,
    '```bash',
    `/plugin marketplace add ${marketplace.repository.replace('https://github.com/', '')}`,
    '```',
    '',
    `**View Details**: https://claudecodemarketplace.com/markdown/marketplace/${marketplace.id}`,
    '',
  ].filter(Boolean); // Remove null entries

  return lines.join('\n');
}).join('\n---\n\n')}

## How to Use

1. Copy the installation command for any marketplace
2. Run it in Claude Code
3. Browse and install plugins from that marketplace

## Resources

- **Claude Code**: https://github.com/anthropics/claude-code
- **Documentation**: https://docs.claude.com/en/docs/claude-code
- **Plugin Announcement**: https://www.anthropic.com/news/claude-code-plugins
- **This Site (GitHub)**: https://github.com/joesaunderson/claude-code-marketplace

---

*Generated: ${new Date().toISOString()}*
*URL: https://claudecodemarketplace.com/*
`;

  return (
    <pre style={{
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word',
      fontFamily: 'monospace',
      padding: '20px',
      maxWidth: '100%',
      overflow: 'auto'
    }}>
      {markdown}
    </pre>
  );
}

// Set content type to text/markdown
export const metadata = {
  other: {
    'Content-Type': 'text/markdown; charset=utf-8',
  },
};
