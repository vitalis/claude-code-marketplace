# Claude Code Marketplace

The community marketplace for Claude Code plugins. Discover, share, and install plugins to enhance your Claude Code experience.

Browse plugins at [claudecodemarketplace.com](https://claudecodemarketplace.com)

## Install the Marketplace

Add this marketplace to your Claude Code configuration:

```bash
/plugin marketplace add joesaunderson/claude-code-marketplace
```

Once added, you'll be able to browse and install any plugin from this marketplace directly in Claude Code.

### Update Marketplace

To refresh plugin listings and metadata:

```bash
/plugin marketplace update joesaunderson/claude-code-marketplace
```

## Submit Your Plugin

Have a plugin you'd like to share with the community? We'd love to include it!

**To submit a plugin:**

1. Fork this repository
2. Edit `.claude-plugin/marketplace.json` and add your plugin entry
3. Submit a Pull Request

Your plugin entry should include:

```json
{
  "name": "your-plugin-name",
  "source": "https://github.com/username/your-plugin-repo",
  "description": "Brief description of what your plugin does",
  "version": "1.0.0",
  "author": "Your Name",
  "license": "MIT",
  "tags": ["relevant", "tags"]
}
```

### Plugin Sources

The `source` field supports multiple formats:

- **GitHub repository**: `"username/repo"` or `"https://github.com/username/repo"`
- **Git URL**: `"https://example.com/repo.git"`
- **Local path**: `"file:///absolute/path/to/plugin"`
- **HTTP URL**: `"https://example.com/plugin.zip"`

See the [Plugin Sources](https://docs.claude.com/en/docs/claude-code/plugin-marketplaces#plugin-sources) documentation for more details.

For complete schema documentation, see [Plugin Entry Schema](https://docs.claude.com/en/docs/claude-code/plugin-marketplaces#plugin-entries).

## Contributing

Contributions are welcome! Whether you're submitting a plugin, fixing a bug, or improving documentation, we appreciate your help.

See [docs/development.md](docs/development.md) for development setup and technical details.

## License

MIT
