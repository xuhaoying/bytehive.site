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
import { OptimizedImage } from '@/components/ui/optimized-image';
import { ChevronRight, Home, ExternalLink, Calendar, Users, Star, BookOpen } from 'lucide-react';
import { SidebarAd, InArticleAd } from '@/components/ads/adsense';
import { cn } from '@/lib/utils';
import { RatingSystem } from '@/components/tools/rating-system';
import { BookmarkSystem } from '@/components/tools/bookmark-system';
import { SponsorBanner } from '@/components/sponsor/sponsor-banner';
import { AffiliateLink, AffiliateProgramInfo } from '@/components/affiliate/affiliate-link';
import { DetailedReview } from '@/components/tools/detailed-review';
import { RelatedTools, TagCloud } from '@/components/tools/tag-cloud';

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
        return 'bg-green-100 text-green-800';
      case 'Freemium':
        return 'bg-blue-100 text-blue-800';
      case 'Paid':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
                  <OptimizedImage
                    src={tool.logo}
                    alt={`${tool.name} logo`}
                    width={80}
                    height={80}
                    className="rounded-xl"
                    loading="eager"
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
                  <BookmarkSystem tool={tool} />
                </div>

                <div className="mb-4">
                  <AffiliateLink
                    tool={tool}
                    variant="default"
                    showCommission={true}
                    trackingId={`detail-${tool.id}`}
                    className="[&_button]:w-auto [&_button]:px-8"
                  />
                </div>
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

            {/* Detailed Review */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>专业评测</CardTitle>
              </CardHeader>
              <CardContent>
                <DetailedReview tool={tool} />
              </CardContent>
            </Card>

            {/* Rating System */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>用户评价</CardTitle>
              </CardHeader>
              <CardContent>
                <RatingSystem 
                  toolId={tool.id}
                  toolName={tool.name}
                  currentRating={tool.popularity / 20}
                  totalRatings={Math.floor(tool.popularity / 10)}
                />
              </CardContent>
            </Card>

            {/* In-Article Ad */}
            <div className="mb-8">
              <InArticleAd className="border rounded-lg p-4 bg-muted/30" />
            </div>

            {/* Usage Guide */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>使用指南</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">🚀 快速开始</h4>
                    <p className="text-sm text-muted-foreground">
                      访问 {tool.name} 官网，根据您的需求选择合适的计划。大多数工具都提供免费试用，让您在购买前体验完整功能。
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">💡 使用技巧</h4>
                    <p className="text-sm text-muted-foreground">
                      建议先浏览官方文档和教程，了解基本功能。如果是开发工具，请确保您的开发环境满足系统要求。
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">🔧 最佳实践</h4>
                    <p className="text-sm text-muted-foreground">
                      定期更新工具版本以获得最新功能和安全修复。加入相关社区和论坛，与其他用户交流经验。
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>常见问题</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-1">这个工具适合初学者吗？</h4>
                    <p className="text-sm text-muted-foreground">
                      {tool.pricing === 'Free' || tool.pricing === 'Freemium' 
                        ? '是的，该工具提供免费版本，非常适合初学者入门学习。' 
                        : '建议先通过免费试用来评估是否适合您的技能水平和需求。'}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">支持哪些平台？</h4>
                    <p className="text-sm text-muted-foreground">
                      {tool.platforms && tool.platforms.length > 0 
                        ? `支持 ${tool.platforms.join('、')} 等平台。` 
                        : '请查看官网了解具体的平台支持情况。'}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">如何获得技术支持？</h4>
                    <p className="text-sm text-muted-foreground">
                      大部分工具都提供官方文档、社区论坛或客服支持。建议优先查阅官方文档解决常见问题。
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

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
            {/* Sponsor Sidebar */}
            <SponsorBanner position="sidebar" maxSponsors={2} />
            
            {/* Sidebar Ad */}
            <div>
              <SidebarAd className="border rounded-lg p-4 bg-muted/30" />
            </div>
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

            {/* Tool Statistics */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>工具统计</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">热度评分</span>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">{tool.popularity}/100</span>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star 
                          key={index} 
                          className={cn(
                            "h-3 w-3",
                            index < Math.round(tool.popularity / 20) 
                              ? "fill-amber-400 text-amber-400" 
                              : "fill-none text-muted-foreground/30"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">同类工具</span>
                  <span className="font-medium">{relatedTools.length + 1} 个</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">更新状态</span>
                  <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                    活跃维护
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Affiliate Program Info */}
            <AffiliateProgramInfo toolId={tool.id} />

            {/* Quick Actions */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>快速操作</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <AffiliateLink
                  tool={tool}
                  variant="default"
                  showCommission={false}
                  trackingId={`sidebar-${tool.id}`}
                  className="[&_button]:w-full [&_button]:text-sm"
                />
                <Link href={`/tutorial/${tool.slug}`}>
                  <Button variant="outline" className="w-full" size="sm">
                    <BookOpen className="h-4 w-4 mr-2" />
                    使用教程
                  </Button>
                </Link>
                <Button variant="outline" className="w-full" size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  加入社区讨论
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  <Star className="h-4 w-4 mr-2" />
                  收藏工具
                </Button>
              </CardContent>
            </Card>

            {/* Related Tools */}
            <RelatedTools currentTool={tool} maxRecommendations={6} />

            {/* Tag Cloud */}
            <TagCloud 
              maxTags={30} 
              showSearch={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}