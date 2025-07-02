import { Metadata } from 'next';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { InfrastructureNavigator } from '@/components/infrastructure/InfrastructureNavigator';
import { getCategoriesWithCount } from '@/lib/data/categories';
import { loadAllProviders } from '@/lib/data/providers';

export const metadata: Metadata = {
  title: '基础设施导航 | ByteHive',
  description: '探索和比较各类云服务、数据库、CDN等基础设施服务，使用成本计算器估算费用',
  keywords: '云服务,基础设施,成本计算器,云计算,数据库,CDN,服务器',
};

export default function InfrastructureNavigatorPage() {
  // 在服务端加载数据
  const categories = getCategoriesWithCount();
  const providers = loadAllProviders();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <div className="flex-1">
        <InfrastructureNavigator 
          initialCategories={categories}
          initialProviders={providers}
        />
      </div>
      
      <Footer />
    </div>
  );
}