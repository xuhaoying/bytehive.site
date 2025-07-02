import { notFound } from 'next/navigation';
import { Metadata } from 'next';
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

// Generate metadata for each service page
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const provider = getProviderById(params.id);
  
  if (!provider) {
    return {
      title: '服务未找到 - ByteHive',
      description: '抱歉，您要查找的云服务不存在。'
    };
  }

  const lowestPrice = Math.min(...provider.plans.map(p => p.billing.basePrice));
  const hasFreeTier = provider.plans.some(p => p.billing.basePrice === 0);
  
  const title = `${provider.displayName} - ${provider.category === 'hosting' ? '网站托管' : 
    provider.category === 'database' ? '数据库服务' :
    provider.category === 'cdn' ? 'CDN加速' :
    provider.category === 'security' ? '安全服务' :
    provider.category === 'email' ? '邮箱服务' :
    provider.category === 'storage' ? '存储服务' :
    provider.category === 'monitoring' ? '监控分析' :
    provider.category === 'serverless' ? 'Serverless计算' : '云服务'} | ByteHive`;
  
  const description = `${provider.description}。${hasFreeTier ? '提供免费层，' : ''}${lowestPrice === 0 ? '免费起' : `$${lowestPrice}/月起`}。查看详细定价、功能对比和成本计算器。`;
  
  const keywords = [
    provider.displayName,
    provider.name,
    ...provider.tags,
    ...(provider.searchKeywords || []),
    '云服务',
    '价格对比',
    '成本计算器',
    provider.category === 'hosting' ? '网站托管' : 
    provider.category === 'database' ? '数据库' :
    provider.category === 'cdn' ? 'CDN' :
    provider.category === 'security' ? '安全服务' :
    provider.category === 'email' ? '邮箱服务' :
    provider.category === 'storage' ? '存储服务' :
    provider.category === 'monitoring' ? '监控分析' :
    provider.category === 'serverless' ? 'Serverless' : '云服务'
  ].join(', ');

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://bytehive.site/service/${provider.id}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://bytehive.site/service/${provider.id}`,
    },
  };
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