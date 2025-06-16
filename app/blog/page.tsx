import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { blogPosts, blogCategories } from '@/data/blog-posts';
import { BannerAd } from '@/components/ads/adsense';
import { BreadcrumbStructuredData } from '@/components/seo/structured-data';

export const metadata: Metadata = {
  title: 'AI工具博客 - 最新评测、教程和行业资讯 | ByteHive',
  description: '探索AI工具的最新评测、使用教程和行业动态。深度分析各类AI工具，帮助您做出明智的选择。',
  keywords: 'AI工具博客,AI工具评测,AI教程,人工智能资讯,AI使用指南'
};

export default function BlogPage() {
  const featuredPosts = blogPosts.filter(post => post.featured);
  const recentPosts = blogPosts.filter(post => !post.featured);

  const breadcrumbItems = [
    { name: '首页', url: 'https://bytehive.site' },
    { name: '博客', url: 'https://bytehive.site/blog' }
  ];

  return (
    <>
      <BreadcrumbStructuredData items={breadcrumbItems} />
      
      <div className="container mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">AI工具博客</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            深度评测、实用教程、行业资讯，助您掌握AI工具的最新动态
          </p>
        </div>

        {/* 顶部广告 */}
        <BannerAd className="mb-8" />

        {/* 分类导航 */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {blogCategories.map(category => (
            <Link 
              key={category.id} 
              href={`/blog/category/${category.slug}`}
              className="hover:scale-105 transition-transform"
            >
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                {category.name}
              </Badge>
            </Link>
          ))}
        </div>

        {/* 精选文章 */}
        {featuredPosts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">精选文章</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredPosts.map(post => (
                <Card key={post.id} className="group hover:shadow-lg transition-shadow">
                  <Link href={`/blog/${post.slug}`}>
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-t-lg flex items-center justify-center">
                      <span className="text-6xl">📝</span>
                    </div>
                    <CardHeader>
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {post.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.publishedAt).toLocaleDateString('zh-CN')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readingTime} 分钟阅读
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {post.tags.slice(0, 3).map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* 最新文章 */}
        <section>
          <h2 className="text-2xl font-bold mb-6">最新文章</h2>
          <div className="space-y-4">
            {recentPosts.map(post => (
              <Card key={post.id} className="group hover:shadow-md transition-shadow">
                <Link href={`/blog/${post.slug}`}>
                  <CardContent className="flex items-center justify-between py-6">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors mb-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                        {post.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{new Date(post.publishedAt).toLocaleDateString('zh-CN')}</span>
                        <span>·</span>
                        <span>{post.readingTime} 分钟阅读</span>
                        <span>·</span>
                        <Badge variant="outline" className="text-xs">
                          {blogCategories.find(c => c.id === post.category)?.name}
                        </Badge>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors ml-4" />
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </section>

        {/* 底部广告 */}
        <div className="mt-12">
          <BannerAd className="mx-auto" />
        </div>
      </div>
    </>
  );
}