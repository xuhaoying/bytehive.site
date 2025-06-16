'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { 
  Calendar, 
  User, 
  Clock, 
  Eye, 
  Heart, 
  Share2, 
  Search,
  TrendingUp,
  Bookmark,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  publishedAt: string;
  readTime: number;
  views: number;
  likes: number;
  featured: boolean;
}

// 模拟博客文章数据
const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'ChatGPT vs Claude：2024年最全面的AI助手对比',
    excerpt: '深入分析两大顶级AI助手的功能特点、优劣势，帮你选择最适合的AI工具。从对话质量到编程能力，我们为你详细解读。',
    content: '',
    coverImage: '/images/blog/chatgpt-vs-claude.jpg',
    category: 'AI对比',
    tags: ['ChatGPT', 'Claude', 'AI助手', '对比评测'],
    author: {
      name: 'AI科技观察员',
      avatar: '/images/avatars/author1.jpg',
      bio: '专注AI工具研究5年，深度测试过200+AI产品'
    },
    publishedAt: '2024-03-15',
    readTime: 8,
    views: 12500,
    likes: 324,
    featured: true
  },
  {
    id: '2',
    title: '免费AI图像生成工具大盘点：10个不花钱的创意神器',
    excerpt: '不想为AI绘画付费？这10个免费工具让你轻松生成精美图片。从Stable Diffusion到DALL-E Mini，总有一款适合你。',
    content: '',
    coverImage: '/images/blog/free-ai-image-tools.jpg',
    category: 'AI绘画',
    tags: ['AI绘画', '免费工具', 'Stable Diffusion', '图像生成'],
    author: {
      name: '创意设计师',
      avatar: '/images/avatars/author2.jpg',
      bio: '资深UI设计师，AI绘画爱好者'
    },
    publishedAt: '2024-03-12',
    readTime: 6,
    views: 8760,
    likes: 256,
    featured: true
  },
  {
    id: '3',
    title: 'AI编程助手终极指南：提升开发效率300%的秘密武器',
    excerpt: '从GitHub Copilot到CodeT5，全面解析AI编程助手的使用技巧。实战案例教你如何让AI成为最佳编程伙伴。',
    content: '',
    coverImage: '/images/blog/ai-coding-tools.jpg',
    category: '开发工具',
    tags: ['AI编程', 'GitHub Copilot', '开发效率', '代码生成'],
    author: {
      name: '全栈开发者',
      avatar: '/images/avatars/author3.jpg',
      bio: '10年开发经验，AI工具深度用户'
    },
    publishedAt: '2024-03-10',
    readTime: 12,
    views: 15600,
    likes: 445,
    featured: false
  },
  {
    id: '4',
    title: '企业级AI工具选型指南：如何为团队选择最佳AI解决方案',
    excerpt: '企业导入AI工具需要考虑哪些因素？成本、安全性、易用性...这份指南帮你做出明智决策。',
    content: '',
    coverImage: '/images/blog/enterprise-ai-guide.jpg',
    category: '企业应用',
    tags: ['企业AI', '选型指南', 'AI解决方案', '团队协作'],
    author: {
      name: '企业数字化顾问',
      avatar: '/images/avatars/author4.jpg',
      bio: '帮助100+企业完成AI转型'
    },
    publishedAt: '2024-03-08',
    readTime: 10,
    views: 6890,
    likes: 178,
    featured: false
  },
  {
    id: '5',
    title: 'AI写作工具深度测评：谁是内容创作者的最佳助手？',
    excerpt: '测试了市面上主流的AI写作工具，从文案质量到创意程度，为你揭秘哪款工具最值得使用。',
    content: '',
    coverImage: '/images/blog/ai-writing-review.jpg',
    category: '内容创作',
    tags: ['AI写作', '内容创作', '文案工具', '创意写作'],
    author: {
      name: '内容营销专家',
      avatar: '/images/avatars/author5.jpg',
      bio: '专注内容营销8年，AI写作实践者'
    },
    publishedAt: '2024-03-05',
    readTime: 7,
    views: 9240,
    likes: 267,
    featured: false
  },
  {
    id: '6',
    title: 'AI工具安全使用指南：保护隐私的10个关键建议',
    excerpt: '使用AI工具时如何保护个人和企业数据？这些安全建议你一定要知道。',
    content: '',
    coverImage: '/images/blog/ai-security-guide.jpg',
    category: 'AI安全',
    tags: ['AI安全', '隐私保护', '数据安全', '使用指南'],
    author: {
      name: '网络安全专家',
      avatar: '/images/avatars/author6.jpg',
      bio: '信息安全领域从业12年'
    },
    publishedAt: '2024-03-03',
    readTime: 9,
    views: 5670,
    likes: 134,
    featured: false
  }
];

const categories = [
  { name: 'AI对比', count: 12, color: '#3b82f6' },
  { name: 'AI绘画', count: 18, color: '#8b5cf6' },
  { name: '开发工具', count: 15, color: '#10b981' },
  { name: '企业应用', count: 8, color: '#f59e0b' },
  { name: '内容创作', count: 22, color: '#ef4444' },
  { name: 'AI安全', count: 6, color: '#6b7280' },
];

const featuredTags = [
  'ChatGPT', 'AI绘画', '免费工具', 'AI编程', '企业AI', 
  'AI写作', '使用技巧', '对比评测', 'AI安全', '效率提升'
];

function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <Card className={cn(
      'group hover:shadow-lg transition-all duration-300',
      featured && 'border-primary/20'
    )}>
      <div className="relative overflow-hidden">
        <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-dashed border-gray-200 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl font-bold">AI</span>
            </div>
            <span className="text-muted-foreground text-sm">文章封面</span>
          </div>
        </div>
        {post.featured && (
          <Badge className="absolute top-3 left-3 bg-primary">
            精选
          </Badge>
        )}
        <Badge 
          variant="secondary" 
          className="absolute top-3 right-3"
          style={{ backgroundColor: categories.find(c => c.name === post.category)?.color + '20' }}
        >
          {post.category}
        </Badge>
      </div>
      
      <CardContent className="p-6">
        <div className="space-y-3">
          <h3 className={cn(
            'font-semibold leading-tight group-hover:text-primary transition-colors line-clamp-2',
            featured ? 'text-xl' : 'text-lg'
          )}>
            <Link href={`/blog/${post.id}`}>
              {post.title}
            </Link>
          </h3>
          
          <p className="text-muted-foreground text-sm line-clamp-3">
            {post.excerpt}
          </p>
          
          <div className="flex flex-wrap gap-1">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{post.tags.length - 3}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center justify-between pt-3 border-t">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(post.publishedAt).toLocaleDateString('zh-CN')}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {post.readTime}分钟
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {post.views.toLocaleString()}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Heart className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Bookmark className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Share2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  const filteredPosts = regularPosts.filter(post => {
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">AI工具资讯</h1>
            <p className="text-xl text-muted-foreground mb-8">
              最新AI工具动态、深度评测、使用技巧，助你掌握AI时代先机
            </p>
            
            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="搜索文章..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Featured Posts */}
            {!searchQuery && !selectedCategory && featuredPosts.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <h2 className="text-2xl font-bold">精选文章</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {featuredPosts.map((post) => (
                    <BlogCard key={post.id} post={post} featured />
                  ))}
                </div>
              </section>
            )}

            {/* Regular Posts */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">
                  {selectedCategory ? `${selectedCategory} 文章` : '最新文章'}
                </h2>
                {selectedCategory && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedCategory(null)}
                  >
                    清除筛选
                  </Button>
                )}
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {filteredPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
              
              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-muted-foreground">
                    {searchQuery ? '没有找到相关文章' : '该分类下暂无文章'}
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">文章分类</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(
                      selectedCategory === category.name ? null : category.name
                    )}
                    className={cn(
                      'w-full flex items-center justify-between p-2 rounded-lg text-left hover:bg-muted transition-colors',
                      selectedCategory === category.name && 'bg-primary/10 text-primary'
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-sm">{category.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                      <ChevronRight className="h-3 w-3" />
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">热门标签</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {featuredTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => setSearchQuery(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">订阅资讯</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  订阅我们的邮件，第一时间获得最新AI工具资讯
                </p>
                <div className="space-y-2">
                  <Input placeholder="输入邮箱地址" type="email" />
                  <Button className="w-full" size="sm">
                    立即订阅
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}