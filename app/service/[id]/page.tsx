import { notFound } from 'next/navigation';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { ServiceDetailClient } from '@/components/infrastructure/ServiceDetailClient';
import { getProviderById, getProvidersByCategory, loadAllProviders } from '@/lib/data/providers';

// Generate static params for all providers
export async function generateStaticParams() {
  const providers = loadAllProviders();
  return providers.map((provider) => ({
    id: provider.id,
  }));
}

interface ServiceDetailPageProps {
  params: {
    id: string;
  };
}

export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const provider = getProviderById(params.id);
  
  if (!provider) {
    notFound();
  }
  
  // Load alternatives from the same category
  const alternatives = getProvidersByCategory(provider.category)
    .filter(p => p.id !== provider.id)
    .slice(0, 3);
  
  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex-1">
        <ServiceDetailClient provider={provider} alternatives={alternatives} />
      </div>
      <Footer />
    </main>
  );
}