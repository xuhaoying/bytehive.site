'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { tools } from '@/data/tools';
import { categories } from '@/data/categories';
import { Tool } from '@/types';
import { cn } from '@/lib/utils';
import { Search, Hash, TrendingUp, Star, Filter } from 'lucide-react';
import Link from 'next/link';
import ToolCard from './tool-card';

interface TagData {
  name: string;
  count: number;
  tools: Tool[];
  category?: string;
  trending?: boolean;
}

interface TagCloudProps {
  maxTags?: number;
  showSearch?: boolean;
  onTagClick?: (tag: string) => void;
  className?: string;
}

interface RelatedToolsProps {
  currentTool: Tool;
  maxRecommendations?: number;
  className?: string;
}

// 生成标签数据
function generateTagData(): TagData[] {
  const tagMap = new Map<string, TagData>();

  // 收集所有标签
  tools.forEach(tool => {
    tool.tags.forEach(tag => {
      const normalizedTag = tag.toLowerCase().trim();
      if (!tagMap.has(normalizedTag)) {
        tagMap.set(normalizedTag, {
          name: tag,
          count: 0,
          tools: [],
          category: tool.category
        });
      }
      const tagData = tagMap.get(normalizedTag)!;
      tagData.count++;
      tagData.tools.push(tool);
    });
  });

  // 转换为数组并排序
  const tagArray = Array.from(tagMap.values());
  
  // 标记热门标签（使用次数>3的标签）
  tagArray.forEach(tag => {
    tag.trending = tag.count > 3;
  });

  return tagArray.sort((a, b) => b.count - a.count);
}

// 获取相关工具推荐
function getRelatedTools(currentTool: Tool, allTools: Tool[], maxCount: number = 6): Tool[] {
  const relatedTools: { tool: Tool; score: number }[] = [];

  allTools.forEach(tool => {
    if (tool.id === currentTool.id) return;

    let score = 0;

    // 同类别加分
    if (tool.category === currentTool.category) {
      score += 5;
    }

    // 相同标签加分
    const commonTags = tool.tags.filter(tag => 
      currentTool.tags.some(currentTag => 
        currentTag.toLowerCase() === tag.toLowerCase()
      )
    );
    score += commonTags.length * 2;

    // 相同定价模式加分
    if (tool.pricing === currentTool.pricing) {
      score += 1;
    }

    // 热度相近加分
    const popularityDiff = Math.abs(tool.popularity - currentTool.popularity);
    if (popularityDiff <= 20) {
      score += 1;
    }

    if (score > 0) {
      relatedTools.push({ tool, score });
    }
  });

  return relatedTools
    .sort((a, b) => b.score - a.score)
    .slice(0, maxCount)
    .map(item => item.tool);
}

export function TagCloud({ 
  maxTags = 50, 
  showSearch = true, 
  onTagClick,
  className 
}: TagCloudProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showTrending, setShowTrending] = useState(false);

  const allTags = useMemo(() => generateTagData(), []);

  const filteredTags = useMemo(() => {
    let tags = allTags;

    // 搜索过滤
    if (searchQuery.trim()) {
      tags = tags.filter(tag =>
        tag.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 热门过滤
    if (showTrending) {
      tags = tags.filter(tag => tag.trending);
    }

    return tags.slice(0, maxTags);
  }, [allTags, searchQuery, showTrending, maxTags]);

  const getTagSize = (count: number) => {
    const maxCount = Math.max(...allTags.map(t => t.count));
    const minCount = Math.min(...allTags.map(t => t.count));
    const ratio = (count - minCount) / (maxCount - minCount);
    
    if (ratio > 0.8) return 'text-lg font-bold';
    if (ratio > 0.6) return 'text-base font-semibold';
    if (ratio > 0.4) return 'text-sm font-medium';
    return 'text-xs';
  };

  const getTagColor = (tag: TagData) => {
    if (tag.trending) return 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20';
    if (tag.count > 5) return 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800';
    if (tag.count > 3) return 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100 dark:bg-green-950/30 dark:text-green-300 dark:border-green-800';
    return 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 dark:bg-gray-950/30 dark:text-gray-300 dark:border-gray-800';
  };

  const handleTagClick = (tag: TagData) => {
    if (onTagClick) {
      onTagClick(tag.name);
    } else {
      // 默认跳转到搜索页面
      window.location.href = `/search?q=${encodeURIComponent(tag.name)}`;
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Hash className="h-5 w-5" />
            标签云
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant={showTrending ? "default" : "outline"}
              size="sm"
              onClick={() => setShowTrending(!showTrending)}
            >
              <TrendingUp className="h-3 w-3 mr-1" />
              热门
            </Button>
          </div>
        </div>
        
        {showSearch && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="搜索标签..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        {filteredTags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {filteredTags.map((tag) => (
              <Badge
                key={tag.name}
                variant="outline"
                className={cn(
                  'cursor-pointer transition-all duration-200 relative',
                  getTagSize(tag.count),
                  getTagColor(tag)
                )}
                onClick={() => handleTagClick(tag)}
              >
                <span>{tag.name}</span>
                <span className="ml-1 text-xs opacity-70">({tag.count})</span>
                {tag.trending && (
                  <TrendingUp className="h-3 w-3 ml-1 text-primary" />
                )}
              </Badge>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Hash className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>没有找到匹配的标签</p>
          </div>
        )}
        
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>共 {allTags.length} 个标签</span>
            <span>显示 {filteredTags.length} 个</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function RelatedTools({ 
  currentTool, 
  maxRecommendations = 6, 
  className 
}: RelatedToolsProps) {
  const relatedTools = useMemo(
    () => getRelatedTools(currentTool, tools, maxRecommendations),
    [currentTool, maxRecommendations]
  );

  if (relatedTools.length === 0) {
    return null;
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5 text-amber-500" />
          相关推荐
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          基于分类和标签为您推荐的相似工具
        </p>
      </CardHeader>
      
      <CardContent>
        <div className="grid gap-4">
          {relatedTools.map((tool) => (
            <div key={tool.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
              {tool.logo && (
                <div className="w-12 h-12 flex-shrink-0">
                  <img
                    src={tool.logo}
                    alt={`${tool.name} logo`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <Link 
                  href={`/tool/${tool.slug}`}
                  className="font-medium hover:text-primary transition-colors line-clamp-1"
                >
                  {tool.name}
                </Link>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                  {tool.description}
                </p>
                
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs">{tool.popularity}/100</span>
                  </div>
                  
                  <Badge variant="outline" className="text-xs">
                    {tool.pricing === 'Open Source' ? '开源' : 
                     tool.pricing === 'Free' ? '免费' :
                     tool.pricing === 'Freemium' ? '免费试用' : '付费'}
                  </Badge>
                  
                  {tool.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t text-center">
          <Link 
            href={`/category/${currentTool.category}`}
            className="text-sm text-primary hover:underline"
          >
            查看更多 {categories.find(c => c.slug === currentTool.category)?.name} 工具 →
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

// 标签统计组件
export function TagStats({ className }: { className?: string }) {
  const allTags = useMemo(() => generateTagData(), []);
  const topCategories = categories.slice(0, 5);

  const getTagsByCategory = (categorySlug: string) => {
    return allTags.filter(tag => 
      tag.tools.some(tool => tool.category === categorySlug)
    ).slice(0, 8);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          标签统计
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {topCategories.map((category) => {
          const categoryTags = getTagsByCategory(category.slug);
          return (
            <div key={category.slug}>
              <div className="flex items-center gap-2 mb-3">
                <div 
                  className="w-4 h-4 rounded flex items-center justify-center text-xs"
                  style={{ 
                    backgroundColor: `${category.color}20`,
                    color: category.color 
                  }}
                >
                  {category.icon}
                </div>
                <h4 className="font-medium">{category.name}</h4>
                <Badge variant="outline" className="text-xs">
                  {categoryTags.length}
                </Badge>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {categoryTags.map((tag) => (
                  <Badge
                    key={tag.name}
                    variant="secondary"
                    className="text-xs cursor-pointer hover:bg-primary/10 hover:text-primary"
                    onClick={() => {
                      window.location.href = `/search?q=${encodeURIComponent(tag.name)}`;
                    }}
                  >
                    {tag.name} ({tag.count})
                  </Badge>
                ))}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}