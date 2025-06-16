'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { 
  TrendingUp, 
  Star, 
  Users, 
  Clock, 
  Trophy, 
  Medal, 
  Award,
  ExternalLink,
  Eye,
  Heart,
  Download
} from 'lucide-react';
import { tools } from '@/data/tools';
import { categories } from '@/data/categories';
import { Tool, ToolCategory } from '@/types';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { AffiliateLink } from '@/components/affiliate/affiliate-link';

interface RankingMetrics {
  popularity: number;
  views: number;
  favorites: number;
  downloads: number;
  growthRate: number;
}

// 模拟统计数据
const generateMetrics = (tool: Tool): RankingMetrics => {
  const baseViews = tool.popularity * 100 + Math.floor(Math.random() * 5000);
  return {
    popularity: tool.popularity,
    views: baseViews,
    favorites: Math.floor(baseViews * 0.1 + Math.random() * 200),
    downloads: Math.floor(baseViews * 0.05 + Math.random() * 1000),
    growthRate: Math.random() * 50 - 10, // -10% to +40%
  };
};

const toolMetrics = tools.reduce((acc, tool) => {
  acc[tool.id] = generateMetrics(tool);
  return acc;
}, {} as Record<string, RankingMetrics>);

interface RankingItemProps {
  tool: Tool;
  rank: number;
  metrics: RankingMetrics;
  showMetric: keyof RankingMetrics;
  metricLabel: string;
  metricIcon: React.ReactNode;
}

function RankingItem({ tool, rank, metrics, showMetric, metricLabel, metricIcon }: RankingItemProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-orange-500" />;
      default:
        return <span className="font-bold text-lg text-muted-foreground">#{rank}</span>;
    }
  };

  const category = categories.find(cat => cat.slug === tool.category);
  const metricValue = metrics[showMetric];
  
  const formatMetricValue = (value: number, metric: keyof RankingMetrics) => {
    if (metric === 'growthRate') {
      return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }
    return value.toString();
  };

  return (
    <Card className={cn(
      'transition-all hover:shadow-lg',
      rank <= 3 && 'border-primary/20 bg-gradient-to-r from-primary/5 to-transparent'
    )}>
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          {/* Rank */}
          <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
            {getRankIcon(rank)}
          </div>

          {/* Tool Info */}
          <div className="flex items-center gap-4 flex-1">
            {tool.logo && (
              <OptimizedImage
                src={tool.logo}
                alt={`${tool.name} logo`}
                width={48}
                height={48}
                className="rounded-lg flex-shrink-0"
                loading="lazy"
              />
            )}
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Link 
                  href={`/tool/${tool.slug}`}
                  className="font-semibold text-lg text-foreground hover:text-primary transition-colors line-clamp-1"
                >
                  {tool.name}
                </Link>
                {rank <= 3 && (
                  <Badge variant="secondary" className="text-xs">
                    TOP {rank}
                  </Badge>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                {tool.description}
              </p>
              
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                {category && (
                  <Badge variant="outline" className="text-xs">
                    {category.name}
                  </Badge>
                )}
                
                <Badge 
                  variant={tool.pricing === 'Free' || tool.pricing === 'Open Source' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {tool.pricing === 'Open Source' ? '开源' : 
                   tool.pricing === 'Free' ? '免费' :
                   tool.pricing === 'Freemium' ? '免费试用' : '付费'}
                </Badge>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="flex items-center gap-1 justify-center mb-1">
                {metricIcon}
                <span className="text-lg font-bold">
                  {formatMetricValue(metricValue, showMetric)}
                </span>
              </div>
              <div className="text-xs text-muted-foreground">{metricLabel}</div>
            </div>
            
            <div className="w-32">
              <AffiliateLink
                tool={tool}
                variant="outline"
                showCommission={false}
                trackingId={`ranking-${rank}-${tool.id}`}
                className="[&_button]:w-full [&_button]:text-xs [&_button]:h-8"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function CategoryRanking({ category }: { category: ToolCategory }) {
  const categoryTools = tools
    .filter(tool => tool.category === category)
    .sort((a, b) => toolMetrics[b.id].popularity - toolMetrics[a.id].popularity)
    .slice(0, 10);

  const categoryInfo = categories.find(cat => cat.slug === category);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <div 
          className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
          style={{ 
            backgroundColor: `${categoryInfo?.color}20`,
            color: categoryInfo?.color 
          }}
        >
          {categoryInfo?.icon}
        </div>
        <h2 className="text-2xl font-bold">{categoryInfo?.name} 排行榜</h2>
        <Badge variant="outline">{categoryTools.length} 个工具</Badge>
      </div>
      
      {categoryTools.map((tool, index) => (
        <RankingItem
          key={tool.id}
          tool={tool}
          rank={index + 1}
          metrics={toolMetrics[tool.id]}
          showMetric="popularity"
          metricLabel="热度评分"
          metricIcon={<Star className="h-4 w-4 text-amber-500" />}
        />
      ))}
    </div>
  );
}

export default function RankingsPage() {
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | 'all'>('all');

  const getRankedTools = (metric: keyof RankingMetrics) => {
    return tools
      .map(tool => ({ tool, metrics: toolMetrics[tool.id] }))
      .sort((a, b) => b.metrics[metric] - a.metrics[metric])
      .slice(0, 20);
  };

  const topByPopularity = getRankedTools('popularity');
  const topByViews = getRankedTools('views');
  const topByFavorites = getRankedTools('favorites');
  const topByGrowth = getRankedTools('growthRate');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">AI工具排行榜</h1>
            <p className="text-xl text-muted-foreground">
              基于用户使用数据的最权威AI工具排名
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="popularity" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
            <TabsTrigger value="popularity" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              热度排行
            </TabsTrigger>
            <TabsTrigger value="views" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              浏览排行
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              收藏排行
            </TabsTrigger>
            <TabsTrigger value="growth" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              增长排行
            </TabsTrigger>
          </TabsList>

          <TabsContent value="popularity" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">热度排行榜</h2>
              <p className="text-muted-foreground">基于综合评分的最受欢迎AI工具</p>
            </div>
            
            {topByPopularity.map(({ tool, metrics }, index) => (
              <RankingItem
                key={tool.id}
                tool={tool}
                rank={index + 1}
                metrics={metrics}
                showMetric="popularity"
                metricLabel="热度评分"
                metricIcon={<Star className="h-4 w-4 text-amber-500" />}
              />
            ))}
          </TabsContent>

          <TabsContent value="views" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">浏览排行榜</h2>
              <p className="text-muted-foreground">用户浏览次数最多的AI工具</p>
            </div>
            
            {topByViews.map(({ tool, metrics }, index) => (
              <RankingItem
                key={tool.id}
                tool={tool}
                rank={index + 1}
                metrics={metrics}
                showMetric="views"
                metricLabel="浏览次数"
                metricIcon={<Eye className="h-4 w-4 text-blue-500" />}
              />
            ))}
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">收藏排行榜</h2>
              <p className="text-muted-foreground">用户收藏次数最多的AI工具</p>
            </div>
            
            {topByFavorites.map(({ tool, metrics }, index) => (
              <RankingItem
                key={tool.id}
                tool={tool}
                rank={index + 1}
                metrics={metrics}
                showMetric="favorites"
                metricLabel="收藏次数"
                metricIcon={<Heart className="h-4 w-4 text-red-500" />}
              />
            ))}
          </TabsContent>

          <TabsContent value="growth" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">增长排行榜</h2>
              <p className="text-muted-foreground">近期增长最快的AI工具</p>
            </div>
            
            {topByGrowth.map(({ tool, metrics }, index) => (
              <RankingItem
                key={tool.id}
                tool={tool}
                rank={index + 1}
                metrics={metrics}
                showMetric="growthRate"
                metricLabel="增长率"
                metricIcon={<TrendingUp className="h-4 w-4 text-green-500" />}
              />
            ))}
          </TabsContent>
        </Tabs>

        {/* Category Rankings */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">分类排行榜</h2>
            <p className="text-xl text-muted-foreground">各分类下的热门工具排名</p>
          </div>

          <div className="grid gap-8">
            {categories.slice(0, 4).map((category) => (
              <Card key={category.slug}>
                <CardContent className="p-6">
                  <CategoryRanking category={category.slug} />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}