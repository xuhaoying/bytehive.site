import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, ArrowLeft, Share2 } from 'lucide-react';
import { blogPosts, blogCategories } from '@/data/blog-posts';
import { InArticleAd, SidebarAd } from '@/components/ads/adsense';
import { BreadcrumbStructuredData } from '@/components/seo/structured-data';
import { ArticleStructuredData } from '@/components/seo/enhanced-structured-data';
import RelatedTools from '@/components/related-tools';
import MarkdownRenderer from '@/components/markdown-renderer';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find(p => p.slug === params.slug);
  
  if (!post) {
    return {
      title: '文章未找到 | ByteHive',
    };
  }

  return {
    title: `${post.title} | ByteHive`,
    description: post.description,
    keywords: post.tags.join(','),
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find(p => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const category = blogCategories.find(c => c.id === post.category);
  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && (
      p.category === post.category || 
      p.tags.some(tag => post.tags.includes(tag))
    ))
    .slice(0, 3);

  const breadcrumbItems = [
    { name: '首页', url: 'https://bytehive.site' },
    { name: '博客', url: 'https://bytehive.site/blog' },
    { name: post.title, url: `https://bytehive.site/blog/${post.slug}` }
  ];

  return (
    <>
      <BreadcrumbStructuredData items={breadcrumbItems} />
      <ArticleStructuredData
        title={post.title}
        description={post.description}
        author={post.author}
        datePublished={post.publishedAt}
        dateModified={post.updatedAt}
        image={`https://bytehive.site${post.coverImage}`}
        url={`https://bytehive.site/blog/${post.slug}`}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 主内容区 */}
          <article className="lg:col-span-2">
            {/* 返回按钮 */}
            <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6">
              <ArrowLeft className="w-4 h-4" />
              返回博客列表
            </Link>

            {/* 文章头部 */}
            <header className="mb-8">
              <Badge variant="secondary" className="mb-4">
                {category?.name}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {post.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                {post.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.publishedAt).toLocaleDateString('zh-CN')}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readingTime} 分钟阅读
                </span>
              </div>
            </header>

            {/* 文章内容 */}
            <div className="prose prose-lg max-w-none">
              <InArticleAd className="my-8" />
              <MarkdownRenderer content={post.content} />
            </div>

            {/* 标签 */}
            <div className="mt-8 pt-8 border-t">
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* 相关工具推荐 */}
            {post.relatedTools && post.relatedTools.length > 0 && (
              <div className="mt-8">
                <RelatedTools toolIds={post.relatedTools} />
              </div>
            )}

            {/* 分享按钮 */}
            <div className="mt-8 flex items-center gap-4">
              <span className="text-muted-foreground">分享文章：</span>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                分享
              </Button>
            </div>
          </article>

          {/* 侧边栏 */}
          <aside className="space-y-6">
            {/* 广告位 */}
            <SidebarAd className="sticky top-20" />

            {/* 相关文章 */}
            {relatedPosts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>相关文章</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {relatedPosts.map(relatedPost => (
                    <Link 
                      key={relatedPost.id}
                      href={`/blog/${relatedPost.slug}`}
                      className="block group"
                    >
                      <h4 className="font-medium group-hover:text-primary transition-colors mb-1">
                        {relatedPost.title}
                      </h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {relatedPost.description}
                      </p>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* 分类导航 */}
            <Card>
              <CardHeader>
                <CardTitle>文章分类</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {blogCategories.map(cat => (
                    <Link
                      key={cat.id}
                      href={`/blog/category/${cat.slug}`}
                      className="flex items-center justify-between py-2 hover:text-primary transition-colors"
                    >
                      <span>{cat.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {blogPosts.filter(p => p.category === cat.id).length}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </>
  );
}