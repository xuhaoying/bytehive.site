'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { tools, getToolBySlug } from '@/data/tools';
import { getCategoryBySlug } from '@/data/categories';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { 
  ChevronRight, 
  Home, 
  PlayCircle, 
  CheckCircle, 
  Clock, 
  Star,
  Users,
  Download,
  ExternalLink,
  BookOpen,
  Video,
  Code,
  Lightbulb,
  AlertTriangle,
  Trophy,
  Share2,
  Bookmark,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { SidebarAd, InArticleAd } from '@/components/ads/adsense';
import { AffiliateLink } from '@/components/affiliate/affiliate-link';

interface TutorialPageProps {
  params: {
    slug: string;
  };
}

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  codeSnippet?: string;
  tips?: string[];
  warnings?: string[];
  estimated_time: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface Tutorial {
  id: string;
  title: string;
  description: string;
  toolId: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
  prerequisite?: string[];
  objectives: string[];
  steps: TutorialStep[];
  resources: {
    title: string;
    url: string;
    type: 'documentation' | 'video' | 'blog' | 'github';
  }[];
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  publishedAt: string;
  updatedAt: string;
  views: number;
  likes: number;
  completions: number;
}

// 生成教程数据
function generateTutorial(tool: any): Tutorial {
  const steps: TutorialStep[] = [
    {
      id: 'step-1',
      title: '环境准备和账号注册',
      description: `开始使用${tool.name}前的准备工作`,
      content: `在开始使用${tool.name}之前，我们需要完成一些基础准备工作。首先访问官方网站，创建一个账号。如果是付费工具，建议先使用免费试用版本熟悉功能。确保您的设备满足系统要求，安装必要的依赖软件。`,
      imageUrl: '/images/tutorials/setup.jpg',
      tips: [
        '建议使用企业邮箱注册，便于后续团队协作',
        '仔细阅读隐私政策和使用条款',
        '保存好登录凭据，建议使用密码管理器'
      ],
      warnings: [
        '注意检查系统兼容性',
        '确保网络连接稳定'
      ],
      estimated_time: 5,
      difficulty: 'beginner'
    },
    {
      id: 'step-2',
      title: '界面介绍和基础设置',
      description: `熟悉${tool.name}的用户界面和基本配置`,
      content: `登录后，我们来熟悉${tool.name}的主要界面。了解各个功能区域的作用，配置个人偏好设置，包括语言、主题、通知等选项。这一步将为后续的高效使用打下基础。`,
      imageUrl: '/images/tutorials/interface.jpg',
      tips: [
        '花时间熟悉快捷键，能大幅提升效率',
        '根据工作流程自定义界面布局',
        '启用自动保存功能避免数据丢失'
      ],
      estimated_time: 10,
      difficulty: 'beginner'
    },
    {
      id: 'step-3',
      title: '创建第一个项目',
      description: `通过实际项目了解${tool.name}的核心功能`,
      content: `现在我们来创建第一个项目，通过实际操作来理解工具的核心功能。我们将从简单的示例开始，逐步添加更多功能和配置。这个过程中会涉及到工具的主要特性和最佳实践。`,
      imageUrl: '/images/tutorials/first-project.jpg',
      codeSnippet: tool.category === 'development' ? `
// 示例代码
function initProject() {
  const config = {
    name: 'my-first-project',
    version: '1.0.0',
    dependencies: []
  };
  
  return createProject(config);
}
      ` : undefined,
      tips: [
        '从简单的例子开始，逐步增加复杂度',
        '及时保存工作进度',
        '记录遇到的问题和解决方案'
      ],
      estimated_time: 20,
      difficulty: 'intermediate'
    },
    {
      id: 'step-4',
      title: '高级功能和优化技巧',
      description: `掌握${tool.name}的高级功能和性能优化`,
      content: `在掌握基础功能后，我们来探索一些高级特性。这些功能可以显著提升工作效率和输出质量。我们还会分享一些性能优化的技巧和常见问题的解决方案。`,
      imageUrl: '/images/tutorials/advanced.jpg',
      tips: [
        '定期备份重要项目和配置',
        '学会使用插件和扩展增强功能',
        '参与社区讨论，学习他人经验'
      ],
      warnings: [
        '高级功能可能需要付费订阅',
        '某些功能可能影响性能，注意平衡'
      ],
      estimated_time: 30,
      difficulty: 'advanced'
    },
    {
      id: 'step-5',
      title: '团队协作和分享',
      description: `学习如何与团队成员协作使用${tool.name}`,
      content: `如果需要团队协作，了解如何邀请成员、设置权限、管理项目等功能。学会分享作品和获取反馈，建立有效的协作流程。这对于提升团队整体效率非常重要。`,
      imageUrl: '/images/tutorials/collaboration.jpg',
      tips: [
        '建立清晰的团队协作规范',
        '定期同步项目进度和变更',
        '充分利用评论和审核功能'
      ],
      estimated_time: 15,
      difficulty: 'intermediate'
    }
  ];

  return {
    id: `tutorial-${tool.id}`,
    title: `${tool.name} 完整使用教程：从入门到精通`,
    description: `详细的${tool.name}使用指南，包含实战案例和最佳实践，适合各个水平的用户学习。`,
    toolId: tool.id,
    category: tool.category,
    difficulty: 'beginner' as const,
    estimatedTime: steps.reduce((total, step) => total + step.estimated_time, 0),
    prerequisite: tool.category === 'development' ? ['基础编程知识', '了解相关技术栈'] : ['基本计算机操作'],
    objectives: [
      `掌握${tool.name}的核心功能`,
      '能够独立完成项目创建和管理',
      '了解最佳实践和常见问题解决',
      '具备团队协作能力'
    ],
    steps,
    resources: [
      {
        title: `${tool.name} 官方文档`,
        url: tool.website || '#',
        type: 'documentation' as const
      },
      {
        title: '视频教程合集',
        url: '#',
        type: 'video' as const
      },
      {
        title: '社区讨论',
        url: '#',
        type: 'blog' as const
      },
      {
        title: '示例项目',
        url: '#',
        type: 'github' as const
      }
    ],
    author: {
      name: 'AI工具专家',
      avatar: '/images/avatars/expert.jpg',
      bio: `${tool.name}认证专家，拥有丰富的实战经验`
    },
    publishedAt: '2024-03-15',
    updatedAt: '2024-03-15',
    views: Math.floor(Math.random() * 5000) + 1000,
    likes: Math.floor(Math.random() * 200) + 50,
    completions: Math.floor(Math.random() * 500) + 100
  };
}

export async function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: TutorialPageProps): Promise<Metadata> {
  const tool = getToolBySlug(params.slug);

  if (!tool) {
    return {
      title: 'Tutorial Not Found',
    };
  }

  return {
    title: `${tool.name} 使用教程 - 完整学习指南 | ByteHive`,
    description: `详细的${tool.name}使用教程，从入门到精通，包含实战案例和最佳实践。`,
    keywords: `${tool.name},教程,使用指南,学习,实战案例`,
  };
}

export default function TutorialPage({ params }: TutorialPageProps) {
  const tool = getToolBySlug(params.slug);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  if (!tool) {
    notFound();
  }

  const tutorial = generateTutorial(tool);
  const category = getCategoryBySlug(tool.category);
  const progress = (completedSteps.length / tutorial.steps.length) * 100;

  const toggleStepCompletion = (stepId: string) => {
    if (completedSteps.includes(stepId)) {
      setCompletedSteps(completedSteps.filter(id => id !== stepId));
    } else {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'documentation':
        return <BookOpen className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'github':
        return <Code className="h-4 w-4" />;
      default:
        return <ExternalLink className="h-4 w-4" />;
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
            <Link href={`/tool/${tool.slug}`} className="hover:text-foreground">
              {tool.name}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">使用教程</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
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
                    <h1 className="text-3xl font-bold mb-3">{tutorial.title}</h1>
                    <p className="text-lg text-muted-foreground mb-4">{tutorial.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                      <Badge className={getDifficultyColor(tutorial.difficulty)}>
                        {tutorial.difficulty === 'beginner' ? '入门级' :
                         tutorial.difficulty === 'intermediate' ? '中级' : '高级'}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{tutorial.estimatedTime} 分钟</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{tutorial.completions} 人已完成</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="h-4 w-4" />
                        <span>{tutorial.likes} 赞</span>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">学习进度</span>
                        <span className="text-sm text-muted-foreground">
                          {completedSteps.length}/{tutorial.steps.length}
                        </span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>

                    <div className="flex items-center gap-4">
                      <AffiliateLink
                        tool={tool}
                        variant="default"
                        showCommission={false}
                        trackingId={`tutorial-${tool.id}`}
                        className="[&_button]:px-6"
                      />
                      <Button variant="outline" size="sm">
                        <Bookmark className="h-4 w-4 mr-2" />
                        收藏教程
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4 mr-2" />
                        分享
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tutorial Objectives */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-amber-500" />
                  学习目标
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tutorial.objectives.map((objective, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                      <span className="text-muted-foreground">{objective}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Prerequisites */}
            {tutorial.prerequisite && tutorial.prerequisite.length > 0 && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                    前置要求
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tutorial.prerequisite.map((req, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-muted-foreground">{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Tutorial Steps */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PlayCircle className="h-5 w-5 text-blue-500" />
                  教程步骤
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={currentStep.toString()} onValueChange={(value) => setCurrentStep(parseInt(value))}>
                  <TabsList className="grid w-full grid-cols-5 mb-8">
                    {tutorial.steps.map((step, index) => (
                      <TabsTrigger
                        key={step.id}
                        value={index.toString()}
                        className={cn(
                          'text-xs',
                          completedSteps.includes(step.id) && 'bg-green-100 text-green-800'
                        )}
                      >
                        步骤 {index + 1}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {tutorial.steps.map((step, index) => (
                    <TabsContent key={step.id} value={index.toString()} className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                          <p className="text-muted-foreground">{step.description}</p>
                        </div>
                        <Button
                          variant={completedSteps.includes(step.id) ? "default" : "outline"}
                          onClick={() => toggleStepCompletion(step.id)}
                          className="ml-4"
                        >
                          {completedSteps.includes(step.id) ? (
                            <>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              已完成
                            </>
                          ) : (
                            '标记完成'
                          )}
                        </Button>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{step.estimated_time} 分钟</span>
                        </div>
                        <Badge className={getDifficultyColor(step.difficulty)} variant="outline">
                          {step.difficulty === 'beginner' ? '入门' :
                           step.difficulty === 'intermediate' ? '中级' : '高级'}
                        </Badge>
                      </div>

                      {/* Step Image */}
                      {step.imageUrl && (
                        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-6">
                          <span className="text-muted-foreground">步骤演示图</span>
                        </div>
                      )}

                      {/* Step Content */}
                      <div className="prose prose-gray dark:prose-invert max-w-none">
                        <p>{step.content}</p>
                      </div>

                      {/* Code Snippet */}
                      {step.codeSnippet && (
                        <Card className="bg-muted/30">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                              <Code className="h-5 w-5" />
                              示例代码
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <pre className="bg-black text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                              <code>{step.codeSnippet}</code>
                            </pre>
                          </CardContent>
                        </Card>
                      )}

                      {/* Tips */}
                      {step.tips && step.tips.length > 0 && (
                        <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/20">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg text-blue-700 dark:text-blue-300">
                              <Lightbulb className="h-5 w-5" />
                              实用技巧
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {step.tips.map((tip, tipIndex) => (
                                <li key={tipIndex} className="flex items-start gap-2">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />
                                  <span className="text-sm text-blue-700 dark:text-blue-300">{tip}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      )}

                      {/* Warnings */}
                      {step.warnings && step.warnings.length > 0 && (
                        <Card className="border-orange-200 bg-orange-50/50 dark:border-orange-800 dark:bg-orange-950/20">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg text-orange-700 dark:text-orange-300">
                              <AlertTriangle className="h-5 w-5" />
                              注意事项
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {step.warnings.map((warning, warningIndex) => (
                                <li key={warningIndex} className="flex items-start gap-2">
                                  <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 mt-2" />
                                  <span className="text-sm text-orange-700 dark:text-orange-300">{warning}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      )}

                      {/* Navigation */}
                      <div className="flex justify-between pt-8 border-t">
                        <Button
                          variant="outline"
                          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                          disabled={currentStep === 0}
                        >
                          上一步
                        </Button>
                        <Button
                          onClick={() => setCurrentStep(Math.min(tutorial.steps.length - 1, currentStep + 1))}
                          disabled={currentStep === tutorial.steps.length - 1}
                        >
                          下一步
                        </Button>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>

            {/* In-Article Ad */}
            <div className="mb-8">
              <InArticleAd className="border rounded-lg p-4 bg-muted/30" />
            </div>

            {/* Resources */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-purple-500" />
                  相关资源
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tutorial.resources.map((resource, index) => (
                    <Link
                      key={index}
                      href={resource.url}
                      className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {getResourceIcon(resource.type)}
                      <span className="font-medium">{resource.title}</span>
                      <ExternalLink className="h-3 w-3 ml-auto" />
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Sidebar Ad */}
            <div>
              <SidebarAd className="border rounded-lg p-4 bg-muted/30" />
            </div>

            {/* Author Info */}
            <Card>
              <CardHeader>
                <CardTitle>教程作者</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-medium">{tutorial.author.name}</div>
                    <div className="text-sm text-muted-foreground">{tutorial.author.bio}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tutorial Stats */}
            <Card>
              <CardHeader>
                <CardTitle>教程统计</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">发布时间</span>
                  <span className="text-sm">
                    {new Date(tutorial.publishedAt).toLocaleDateString('zh-CN')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">浏览次数</span>
                  <span className="text-sm">{tutorial.views.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">完成人数</span>
                  <span className="text-sm">{tutorial.completions.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">获得点赞</span>
                  <span className="text-sm">{tutorial.likes.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            {/* Step Progress */}
            <Card>
              <CardHeader>
                <CardTitle>步骤清单</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {tutorial.steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={cn(
                      'flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors',
                      currentStep === index && 'bg-primary/10',
                      completedSteps.includes(step.id) && 'bg-green-50 dark:bg-green-950/20'
                    )}
                    onClick={() => setCurrentStep(index)}
                  >
                    <div className={cn(
                      'w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium',
                      completedSteps.includes(step.id) 
                        ? 'bg-green-500 text-white' 
                        : currentStep === index
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    )}>
                      {completedSteps.includes(step.id) ? (
                        <CheckCircle className="h-3 w-3" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium line-clamp-2">{step.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {step.estimated_time} 分钟
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}