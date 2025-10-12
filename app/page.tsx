import HomeClient from './HomeClient';
import { getMarketplacesData } from './actions';
import type { Metadata } from 'next';

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  alternates: {
    types: {
      'text/markdown': 'https://claudecodemarketplace.com/markdown/',
    },
  },
};

export default async function Home() {
  const marketplaces = await getMarketplacesData();

  return (
    <HomeClient marketplaces={marketplaces} />
  );
}
