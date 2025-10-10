import HomeClient from './HomeClient';
import { getMarketplacesData } from './actions';

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  const marketplaces = await getMarketplacesData();

  return (
    <HomeClient marketplaces={marketplaces} />
  );
}
