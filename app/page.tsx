import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { InfrastructureNavigator } from '@/components/infrastructure/InfrastructureNavigator';
import { getCategoriesWithCount } from '@/src/lib/data/categories';
import { loadAllProviders } from '@/src/lib/data/providers';

export default function Home() {
  // 在服务端加载数据
  const categories = getCategoriesWithCount();
  const providers = loadAllProviders();

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <div className="flex-1">
        <InfrastructureNavigator 
          initialCategories={categories}
          initialProviders={providers}
        />
      </div>
      
      <Footer />
    </main>
  );
}