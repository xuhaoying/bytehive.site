import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { categories, getCategoryBySlug } from '@/data/categories';
import { getToolsByCategory } from '@/data/tools';
import ToolCard from '@/components/tools/tool-card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { CategoryPageTracker } from '@/components/analytics/page-trackers';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = getCategoryBySlug(params.slug);

  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${category.name} - DevHub | ${category.toolCount}个优质工具`,
    description: `${category.description}，精选${category.toolCount}个${category.name}相关的优质工具和资源。`,
    keywords: `${category.name},开发者工具,${category.subcategories?.map(sub => sub.name).join(',')}`,
    openGraph: {
      title: `${category.name} - DevHub`,
      description: category.description,
      type: 'website',
    },
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  const tools = getToolsByCategory(category.slug);
  const featuredTools = tools.filter(tool => category.featured.includes(tool.id));
  const otherTools = tools.filter(tool => !category.featured.includes(tool.id));

  return (
    <div className="min-h-screen bg-background">
      <CategoryPageTracker categoryName={category.name} categoryType="tools" />
      {/* Breadcrumb */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground flex items-center">
              <Home className="h-4 w-4" />
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">{category.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Category Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl"
              style={{ backgroundColor: `${category.color}20`, color: category.color }}
            >
              {category.icon}
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{category.name}</h1>
              <p className="text-lg text-muted-foreground mb-4">{category.description}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{category.toolCount} 个工具</span>
                <Separator orientation="vertical" className="h-4" />
                <span>{category.subcategories?.length || 0} 个子分类</span>
              </div>
            </div>
          </div>
        </div>

        {/* Subcategories */}
        {category.subcategories && category.subcategories.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">子分类</h2>
            <div className="flex flex-wrap gap-3">
              {category.subcategories.map((subcategory) => (
                <Badge
                  key={subcategory.slug}
                  variant="secondary"
                  className="px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors"
                >
                  {subcategory.name} ({subcategory.count})
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Featured Tools */}
        {featuredTools.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">
              精选推荐
              <span className="text-base font-normal text-muted-foreground ml-2">
                ({featuredTools.length} 个工具)
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        )}

        {/* All Tools */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">
            所有工具
            <span className="text-base font-normal text-muted-foreground ml-2">
              ({otherTools.length} 个工具)
            </span>
          </h2>
          
          {otherTools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {otherTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>暂无其他工具，敬请期待更多精彩内容！</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}