# Development Guide

Technical documentation for developing and maintaining the Claude Code Marketplace.

## Setup

```bash
# Install dependencies
yarn install

# Run development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start
```

## Project Structure

```
claude-code-marketplace/
├── .claude-plugin/
│   └── marketplace.json    # Plugin registry
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   └── page.tsx            # Main marketplace page with search
├── components/
│   ├── PluginCard.tsx      # Individual plugin card component
│   └── SearchBar.tsx       # Search input component
├── types/
│   └── plugin.ts           # TypeScript definitions
└── docs/
    └── development.md      # This file
```

## Tech Stack

- Next.js 15.5 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- Turbopack

## Marketplace Schema

The `.claude-plugin/marketplace.json` file follows the [Claude Code Plugin Marketplace Schema](https://docs.claude.com/en/docs/claude-code/plugin-marketplaces#marketplace-schema).

### Required Fields

- `name`: Marketplace identifier (kebab-case)
- `owner`: Maintainer information
- `plugins`: Array of plugin entries

### Plugin Entry

Each plugin requires:
- `name`: Plugin identifier (kebab-case)
- `source`: Repository URL or source path

Optional fields include: `description`, `version`, `author`, `homepage`, `repository`, `license`, `keywords`, `category`, `tags`

## Deployment

The marketplace can be deployed to any static hosting provider:

- **Vercel** (recommended): Connect GitHub repository for automatic deployments
- **Netlify**: Import project from GitHub
- **GitHub Pages**: Use `next export` for static export

The `marketplace.json` file is served from the `.claude-plugin` directory, which Claude Code uses by default for marketplace manifests.
