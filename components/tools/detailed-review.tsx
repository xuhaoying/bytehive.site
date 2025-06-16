'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { 
  Star, 
  Check, 
  X, 
  TrendingUp, 
  Users, 
  Clock, 
  Shield, 
  Zap, 
  DollarSign,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { Tool } from '@/types';
import { cn } from '@/lib/utils';

interface DetailedReviewProps {
  tool: Tool;
}

interface ReviewSection {
  title: string;
  score: number;
  maxScore: number;
  description: string;
  pros: string[];
  cons: string[];
}

interface PricingTier {
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
}

export function DetailedReview({ tool }: DetailedReviewProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // 模拟详细评测数据
  const reviewSections: ReviewSection[] = [
    {
      title: '易用性',
      score: 8.5,
      maxScore: 10,
      description: '界面设计直观，新手上手较快，功能布局合理',
      pros: ['界面简洁明了', '操作流程顺畅', '有详细的新手指导'],
      cons: ['某些高级功能需要学习', '自定义选项较少']
    },
    {
      title: '功能完整性',
      score: 9.0,
      maxScore: 10,
      description: '功能覆盖全面，满足大部分使用场景',
      pros: ['功能丰富全面', '持续更新迭代', '覆盖主流使用场景'],
      cons: ['部分细分功能缺失', '某些功能还在测试阶段']
    },
    {
      title: '性能表现',
      score: 8.8,
      maxScore: 10,
      description: '响应速度快，稳定性好，资源占用合理',
      pros: ['响应速度快', '稳定性高', '资源占用低'],
      cons: ['大文件处理稍慢', '并发限制较严格']
    },
    {
      title: '性价比',
      score: 7.5,
      maxScore: 10,
      description: '价格略高但功能强大，适合专业用户',
      pros: ['功能强大', '技术支持好', '更新频繁'],
      cons: ['价格偏高', '免费版功能受限']
    }
  ];

  const pricingTiers: PricingTier[] = [
    {
      name: '免费版',
      price: '¥0/月',
      features: ['基础功能', '每月1000次调用', '社区支持', '基础模板']
    },
    {
      name: '专业版',
      price: '¥99/月',
      features: ['全部功能', '无限次调用', '优先支持', '高级模板', 'API访问'],
      popular: true
    },
    {
      name: '企业版',
      price: '¥299/月',
      features: ['专业版全部功能', '私有部署', '专属客服', '定制开发', 'SLA保障']
    }
  ];

  const useCases = [
    {
      title: '内容创作',
      description: '适合博客写作、社交媒体内容创建',
      difficulty: '简单',
      timeToLearn: '1-2天'
    },
    {
      title: '商业应用',
      description: '营销文案、产品描述、邮件模板生成',
      difficulty: '中等',
      timeToLearn: '3-5天'
    },
    {
      title: '技术文档',
      description: 'API文档、技术说明、代码注释生成',
      difficulty: '困难',
      timeToLearn: '1-2周'
    }
  ];

  const alternatives = [
    { name: 'ChatGPT', similarity: 85, reason: '功能相似，但价格更高' },
    { name: 'Claude', similarity: 75, reason: '更适合长文本处理' },
    { name: 'Jasper', similarity: 70, reason: '更专注于营销文案' }
  ];

  const overallScore = reviewSections.reduce((acc, section) => acc + section.score, 0) / reviewSections.length;

  return (
    <div className="space-y-6">
      {/* 总体评分 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-amber-500" />
            综合评分
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl font-bold text-primary">
              {overallScore.toFixed(1)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={cn(
                      'h-5 w-5',
                      index < Math.round(overallScore / 2)
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-none text-muted-foreground/30'
                    )}
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  基于 {reviewSections.length} 个维度评测
                </span>
              </div>
              <Progress value={(overallScore / 10) * 100} className="h-2" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {reviewSections.map((section) => (
              <div key={section.title} className="text-center">
                <div className="text-lg font-semibold">{section.score}</div>
                <div className="text-sm text-muted-foreground">{section.title}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 详细评测内容 */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">概览</TabsTrigger>
          <TabsTrigger value="features">功能详解</TabsTrigger>
          <TabsTrigger value="pricing">价格方案</TabsTrigger>
          <TabsTrigger value="usage">使用场景</TabsTrigger>
          <TabsTrigger value="alternatives">替代方案</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* 评分详情 */}
          {reviewSections.map((section) => (
            <Card key={section.title}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">{section.score}</span>
                    <span className="text-muted-foreground">/ {section.maxScore}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{section.description}</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-green-600 mb-2 flex items-center gap-2">
                      <ThumbsUp className="h-4 w-4" />
                      优点
                    </h4>
                    <ul className="space-y-1">
                      {section.pros.map((pro, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <Check className="h-3 w-3 text-green-500" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-red-600 mb-2 flex items-center gap-2">
                      <ThumbsDown className="h-4 w-4" />
                      缺点
                    </h4>
                    <ul className="space-y-1">
                      {section.cons.map((con, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <X className="h-3 w-3 text-red-500" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>核心功能分析</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {(tool.features || []).map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                    <Zap className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">{feature}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        详细的功能描述和使用场景说明，帮助用户更好地理解该功能的价值。
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            {pricingTiers.map((tier, index) => (
              <Card key={index} className={cn(
                'relative',
                tier.popular && 'border-primary shadow-lg scale-105'
              )}>
                {tier.popular && (
                  <div className="absolute3 left-1/2 transform -translate-y-1/2">
                    <Badge className="bg-primary text-primary-foreground">最受欢迎</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle>{tier.name}</CardTitle>
                  <div className="text-3xl font-bold">{tier.price}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="usage" className="space-y-6">
          <div className="grid gap-4">
            {useCases.map((useCase, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold">{useCase.title}</h3>
                    <div className="flex gap-2">
                      <Badge variant="outline">{useCase.difficulty}</Badge>
                      <Badge variant="secondary">
                        <Clock className="h-3 w-3 mr-1" />
                        {useCase.timeToLearn}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{useCase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="alternatives" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>替代方案对比</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alternatives.map((alt, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{alt.name}</h4>
                      <p className="text-sm text-muted-foreground">{alt.reason}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">相似度</span>
                      <Progress value={alt.similarity} className="w-20 h-2" />
                      <span className="text-sm font-medium">{alt.similarity}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}