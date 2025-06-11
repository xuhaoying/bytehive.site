import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { tools, getToolBySlug, getToolsByCategory } from '@/data/tools';
import { getCategoryBySlug } from '@/data/categories';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import ToolCard from '@/components/tools/tool-card';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Home, ExternalLink, Calendar, Users, Star } from 'lucide-react';

interface ToolPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const tool = getToolBySlug(params.slug);

  if (!tool) {
    return {
      title: 'Tool Not Found',
    };
  }

  return {
    title: `${tool.name} - ${tool.description} | DevHub`,
    description: tool.longDescription || tool.description,
    keywords: `${tool.name},${tool.tags.join(',')},开发者工具`,
    openGraph: {
      title: tool.name,
      description: tool.description,
      images: tool.logo ? [tool.logo] : [],
      type: 'website',
    },
  };
}

export default function ToolPage({ params }: ToolPageProps) {
  const tool = getToolBySlug(params.slug);

  if (!tool) {
    notFound();
  }

  const category = getCategoryBySlug(tool.category);
  const relatedTools = getToolsByCategory(tool.category)
    .filter(t => t.id !== tool.id)
    .slice(0, 4);

  const getPricingColor = (pricing: string) => {
    switch (pricing) {
      case 'Free':
      case 'Open Source':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Freemium':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Paid':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground flex items-center">
              <Home className="h-4 w-4" />
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link 
              href={`/category/${tool.category}`} 
              className="hover:text-foreground"
            >
              {category?.name}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">{tool.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tool Header */}
            <div className="flex items-start gap-6 mb-8">
              {tool.logo && (
                <div className="flex-shrink-0">
                  <Image
                    src={tool.logo}
                    alt={`${tool.name} logo`}
                    width={80}
                    height={80}
                    className="rounded-xl"
                  />
                </div>
              )}
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold mb-3">{tool.name}</h1>
                <p className="text-xl text-muted-foreground mb-4">{tool.description}</p>
                
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <Badge className={getPricingColor(tool.pricing)}>
                    {tool.pricing === 'Open Source' ? '开源' : 
                     tool.pricing === 'Free' ? '免费' :
                     tool.pricing === 'Freemium' ? '免费试用' : '付费'}
                  </Badge>
                  {tool.subcategory && (
                    <Badge variant="outline">{tool.subcategory}</Badge>
                  )}
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{tool.popularity}/100</span>
                  </div>
                </div>

                <Button asChild size="lg" className="mb-4">
                  <a 
                    href={tool.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    访问官网
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Detailed Description */}
            {tool.longDescription && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>详细介绍</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {tool.longDescription}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Features */}
            {tool.features && tool.features.length > 0 && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>主要功能</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {tool.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>相关标签</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {tool.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tool Info */}
            <Card>
              <CardHeader>
                <CardTitle>工具信息</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">分类</div>
                  <Link 
                    href={`/category/${tool.category}`}
                    className="text-primary hover:underline"
                  >
                    {category?.name}
                  </Link>
                </div>
                
                <Separator />
                
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">定价模式</div>
                  <div>{tool.pricing === 'Open Source' ? '开源' : 
                           tool.pricing === 'Free' ? '免费' :
                           tool.pricing === 'Freemium' ? '免费试用' : '付费'}</div>
                </div>
                
                {tool.platforms && tool.platforms.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">支持平台</div>
                      <div className="flex flex-wrap gap-1">
                        {tool.platforms.map((platform) => (
                          <Badge key={platform} variant="outline" className="text-xs">
                            {platform}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                
                {tool.techStack && tool.techStack.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">技术栈</div>
                      <div className="flex flex-wrap gap-1">
                        {tool.techStack.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                
                {tool.lastUpdated && (
                  <>
                    <Separator />
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>更新于 {tool.lastUpdated}</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Related Tools */}
            {relatedTools.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>相关工具</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {relatedTools.map((relatedTool) => (
                      <div key={relatedTool.id} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                        {relatedTool.logo && (
                          <Image
                            src={relatedTool.logo}
                            alt={`${relatedTool.name} logo`}
                            width={40}
                            height={40}
                            className="rounded-lg flex-shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <Link 
                            href={`/tool/${relatedTool.slug}`}
                            className="font-medium hover:text-primary line-clamp-1"
                          >
                            {relatedTool.name}
                          </Link>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {relatedTool.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}