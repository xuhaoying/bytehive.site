import { notFound } from 'next/navigation';
import { tools, getToolBySlug } from '@/data/tools';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { 
  ChevronRight, 
  Home, 
  Clock, 
  Star,
  Users,
  BookOpen,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';

interface TutorialPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export default function TutorialPage({ params }: TutorialPageProps) {
  const tool = getToolBySlug(params.slug);

  if (!tool) {
    notFound();
  }

  const tutorialSteps = [
    {
      title: '环境准备和账号注册',
      description: `开始使用${tool.name}前的准备工作`,
      content: `在开始使用${tool.name}之前，我们需要完成一些基础准备工作。首先访问官方网站，创建一个账号。`,
      time: 5
    },
    {
      title: '界面介绍和基础设置',
      description: `熟悉${tool.name}的用户界面和基本配置`,
      content: `登录后，我们来熟悉${tool.name}的主要界面。了解各个功能区域的作用，配置个人偏好设置。`,
      time: 10
    },
    {
      title: '创建第一个项目',
      description: `通过实际项目了解${tool.name}的核心功能`,
      content: `现在我们来创建第一个项目，通过实际操作来理解工具的核心功能。`,
      time: 20
    },
    {
      title: '高级功能和优化技巧',
      description: `掌握${tool.name}的高级功能和性能优化`,
      content: `在掌握基础功能后，我们来探索一些高级特性。这些功能可以显著提升工作效率。`,
      time: 30
    }
  ];

  const totalTime = tutorialSteps.reduce((sum, step) => sum + step.time, 0);

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
            <Link href={`/tool/${tool.slug}`} className="hover:text-foreground">
              {tool.name}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">使用教程</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Tutorial Header */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex items-start gap-6">
                {tool.logo && (
                  <OptimizedImage
                    src={tool.logo}
                    alt={`${tool.name} logo`}
                    width={80}
                    height={80}
                    className="rounded-xl flex-shrink-0"
                    loading="eager"
                  />
                )}
                
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-3">{tool.name} 使用教程</h1>
                  <p className="text-lg text-muted-foreground mb-4">
                    详细的{tool.name}使用指南，从入门到精通，包含实战案例和最佳实践。
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <Badge className="bg-green-100 text-green-800">入门级</Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{totalTime} 分钟</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>234 人已完成</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="h-4 w-4" />
                      <span>98% 好评</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Link href={tool.website || '#'} target="_blank" rel="noopener noreferrer">
                      <Button className="px-6">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        访问工具
                      </Button>
                    </Link>
                    <Link href={`/tool/${tool.slug}`}>
                      <Button variant="outline">
                        <BookOpen className="h-4 w-4 mr-2" />
                        工具详情
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tutorial Steps */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">教程内容</h2>
            
            {tutorialSteps.map((step, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {step.time} 分钟
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{step.content}</p>
                  
                  {/* Placeholder for step demonstration */}
                  <div className="mt-4 aspect-video bg-gradient-to-br from-blue-50 to-emerald-50 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center">
                        <BookOpen className="h-8 w-8 text-white" />
                      </div>
                      <span className="text-muted-foreground text-sm">步骤 {index + 1} 演示</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Resources */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>相关资源</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href={tool.website || '#'}
                  className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BookOpen className="h-4 w-4" />
                  <span className="font-medium">官方文档</span>
                  <ExternalLink className="h-3 w-3 ml-auto" />
                </Link>
                <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <Users className="h-4 w-4" />
                  <span className="font-medium">社区讨论</span>
                  <ExternalLink className="h-3 w-3 ml-auto" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}