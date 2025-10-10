import { notFound } from 'next/navigation';
import MarketplaceDetailClient from './MarketplaceDetailClient';
import { getMarketplaceData, getMarketplaceEntry } from '@/app/actions';

export const revalidate = 3600; // Revalidate every hour

interface MarketplacePageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: MarketplacePageProps) {
  const entry = await getMarketplaceEntry(params.id);

  if (!entry) {
    return {
      title: 'Marketplace Not Found',
    };
  }

  return {
    title: `${entry.name} - Claude Code Plugin Marketplaces`,
    description: entry.description,
  };
}

export default async function MarketplacePage({ params }: MarketplacePageProps) {
  const marketplace = await getMarketplaceData(params.id);

  if (!marketplace) {
    notFound();
  }

  return <MarketplaceDetailClient marketplace={marketplace} marketplaceId={params.id} />;
}
