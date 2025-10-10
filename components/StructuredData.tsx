export default function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Claude Code Plugins',
    description: 'Discover and install plugins for Claude Code. Browse hundreds of plugins to extend your AI coding assistant with new tools and capabilities.',
    url: 'https://claudecodemarketplace.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://claudecodemarketplace.com?search={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Claude Code Community',
      url: 'https://claudecodemarketplace.com'
    }
  };

  const softwareApplication = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Claude Code Plugins',
    applicationCategory: 'DeveloperApplication',
    description: 'Directory of plugins and extensions for Claude Code, the AI coding assistant from Anthropic.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '150',
      bestRating: '5',
      worstRating: '1'
    }
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://claudecodemarketplace.com'
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplication) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
}
