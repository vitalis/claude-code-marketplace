import Script from 'next/script';

export default function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Claude Code Marketplace',
    url: 'https://claudecodemarketplace.com',
    description: 'Community marketplace for Claude Code plugins - Discover and install plugins to enhance your Claude Code experience',
    publisher: {
      '@type': 'Organization',
      name: 'Claude Code Community',
      url: 'https://claudecodemarketplace.com',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://claudecodemarketplace.com?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      strategy="beforeInteractive"
    >
      {JSON.stringify(structuredData)}
    </Script>
  );
}
