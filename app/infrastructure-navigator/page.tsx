import { Metadata } from 'next';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { InfrastructureNavigator } from '@/components/infrastructure/InfrastructureNavigator';
import { getCategoriesWithCount } from '@/lib/data/categories';
import { loadAllProviders } from '@/lib/data/providers';

export const metadata: Metadata = {
  title: '基础设施导航 - 云服务选择与成本计算器 | ByteHive技术平台',
  description: '探索和比较各类云服务、数据库、CDN等基础设施服务。使用ByteHive智能成本计算器精确估算费用，对比AWS、Azure、阿里云等主流云服务商的产品特性与价格，帮助您做出最优化的技术选型决策。',
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