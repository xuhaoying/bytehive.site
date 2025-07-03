import { ModernNavbar } from '@/components/layout/modern-navbar';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/sections/hero-section';
import FeaturesSection from '@/components/sections/features-section';
import { getCategoriesWithCount } from '@/lib/data/categories';
import { loadAllProviders } from '@/lib/data/providers';

export default function Home() {
  // 在服务端加载数据
  const categories = getCategoriesWithCount();
  const providers = loadAllProviders();

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <ModernNavbar scroll={true} />
      
      <div className="flex-1">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Features Section */}
        <FeaturesSection />
        
        {/* Quick Stats Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">平台统计数据</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">{categories.length}</div>
                <div className="text-sm text-muted-foreground">工具分类</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">{providers.length}</div>
                <div className="text-sm text-muted-foreground">基础设施服务</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">持续更新</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">免费使用</div>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </main>
  );
}