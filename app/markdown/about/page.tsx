export const revalidate = 86400; // Revalidate every 24 hours

export default function MarkdownAboutPage() {
  const markdown = `# About Claude Code Plugins

Learn about Claude Code Plugins directory, how it works, and our safety practices for discovering and installing extensions.

## What is the Marketplace Hub?

The Claude Code Marketplace Hub is a decentralized directory that connects you to multiple Claude Code plugin marketplaces. Instead of hosting plugins directly, we provide a central discovery point for community-maintained marketplaces.

**Reference**: https://www.anthropic.com/news/claude-code-plugins

This approach allows:

- Communities to maintain their own specialized plugin collections
- Faster plugin approval and updates (no central bottleneck)
- Marketplace diversity and specialization (e.g., templates, tools, frameworks)
- Decentralized control and ownership

## How do marketplaces work?

Each marketplace listed in our hub:

- Hosts its own plugin collection on GitHub
- Maintains a \`.claude-plugin/marketplace.json\` file
- Controls which plugins are listed and how they're organized
- Can be themed or specialized for specific use cases

The hub dynamically fetches and displays plugins from these marketplaces, giving you a unified discovery experience while keeping control decentralized.

## How do plugins work?

Plugins extend Claude Code's functionality using Anthropic's official plugin API:

- No separate software is downloaded or installed on your computer
- Plugins run within Claude Code's secure environment
- All plugin code is open source and publicly viewable
- You can review any plugin's source code before installing
- Plugins are loaded directly from their source repositories

## Safety & Security

We take security seriously at every level:

- **Open Source**: All marketplaces and plugins are open source with publicly viewable code
- **Decentralized**: No single point of control or failure
- **GitHub Hosted**: All code is hosted on GitHub for transparency and version control
- **Community Reviewed**: Marketplaces and plugins are maintained by their respective communities
- **You Control Everything**: You choose which marketplaces to trust and which plugins to install
- **No Data Collection**: This hub doesn't collect personal information

## Create Your Own Marketplace

Want to start your own marketplace? It's easy:

1. Create a GitHub repository for your marketplace
2. Add a \`.claude-plugin/marketplace.json\` file
3. List your plugins in the JSON file following the schema
4. Submit your marketplace to this hub via pull request

Your marketplace can focus on any niche: specific frameworks, tools, templates, or community-curated collections.

**Documentation**: https://github.com/joesaunderson/claude-code-marketplace

## Contributing

Want to list your marketplace in the hub? Submit a pull request on GitHub. All submissions are reviewed before being listed.

**GitHub Repository**: https://github.com/joesaunderson/claude-code-marketplace

## Questions or Concerns?

If you have security concerns or questions about this hub, please open an issue on GitHub.

**Issues**: https://github.com/joesaunderson/claude-code-marketplace/issues

## Links

- **Home**: https://claudecodemarketplace.com/
- **Markdown Home**: https://claudecodemarketplace.com/markdown/
- **About (HTML)**: https://claudecodemarketplace.com/about
- **Claude Code**: https://github.com/anthropics/claude-code
- **Documentation**: https://docs.claude.com/en/docs/claude-code

---

*Generated: ${new Date().toISOString()}*
*URL: https://claudecodemarketplace.com/about*
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
