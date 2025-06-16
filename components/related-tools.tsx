'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, ExternalLink, TrendingUp } from 'lucide-react';
import { tools } from '@/data/tools';
import type { Tool } from '@/types';

interface RelatedToolsProps {
  currentToolId?: string;
  toolIds?: string[];
  category?: string;
  maxItems?: number;
  title?: string;
}

export default function RelatedTools({
  currentToolId,
  toolIds,
  category,
  maxItems = 6,
  title = '相关推荐'
}: RelatedToolsProps) {
  const [relatedTools, setRelatedTools] = useState<Tool[]>([]);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  useEffect(() => {
    let tools: Tool[] = [];

    if (toolIds && toolIds.length > 0) {
      // 根据指定的工具ID获取工具
      tools = tools.filter(tool => toolIds.includes(tool.id));
    } else if (category) {
      // 根据分类获取工具
      tools = tools
        .filter(tool => tool.category === category && tool.id !== currentToolId)
        .sort((a, b) => b.popularity - a.popularity);
    } else if (currentToolId) {
      // 获取当前工具的相关工具
      const currentTool = tools.find(t => t.id === currentToolId);
      if (currentTool) {
        // 同分类工具
        const sameCategoryTools = tools
          .filter(t => t.category === currentTool.category && t.id !== currentToolId)
          .slice(0, 3);
        
        // 相似标签的工具
        const similarTagTools = tools
          .filter(t => 
            t.id !== currentToolId && 
            t.tags.some(tag => currentTool.tags.includes(tag))
          )
          .slice(0, 3);

        // 合并并去重
        const toolSet = new Set([...sameCategoryTools, ...similarTagTools]);
        tools = Array.from(toolSet);
      }
    }

    setRelatedTools(tools.slice(0, maxItems));
  }, [currentToolId, toolIds, category, maxItems]);

  const handleToolClick = (toolId: string) => {
    setSelectedTool(toolId);
    // 追踪用户点击行为
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'click', {
        event_category: 'related_tools',
        event_label: toolId
      });
    }
  };

  if (relatedTools.length === 0) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {relatedTools.map((tool) => (
            <Link
              key={tool.id}
              href={`/tool/${tool.id}`}
              onClick={() => handleToolClick(tool.id)}
              className={`block group ${
                selectedTool === tool.id ? 'ring-2 ring-primary' : ''
              }`}
            >
              <Card className="h-full hover:shadow-md transition-all duration-200 group-hover:border-primary/50">
                <CardContent className="p-4">
                  {/* 工具图标和名称 */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">🔧</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                        {tool.name}
                      </h3>
                      {tool.popularity > 80 && (
                        <Badge variant="secondary" className="text-xs mt-1">
                          推荐
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* 描述 */}
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {tool.description}
                  </p>

                  {/* 受欢迎度和价格 */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Badge variant={tool.pricing === 'Free' ? 'secondary' : 'outline'}>
                        {tool.pricing === 'Free' ? '免费' : 
                         tool.pricing === 'Freemium' ? '免费试用' :
                         tool.pricing === 'Open Source' ? '开源' : '付费'}
                      </Badge>
                    </div>
                  </div>

                  {/* 标签 */}
                  <div className="flex flex-wrap gap-1 mt-3">
                    {tool.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {tool.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{tool.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* 查看更多按钮 */}
        {category && (
          <div className="mt-6 text-center">
            <Button asChild variant="outline">
              <Link href={`/category/${category}`}>
                查看更多同类工具
                <ExternalLink className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}