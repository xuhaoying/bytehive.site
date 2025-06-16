'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { Search, Plus, X, Check, Minus, Star, ExternalLink } from 'lucide-react';
import { tools } from '@/data/tools';
import { Tool } from '@/types';
import { cn } from '@/lib/utils';
import { AffiliateLink } from '@/components/affiliate/affiliate-link';

export default function ComparePage() {
  const [selectedTools, setSelectedTools] = useState<Tool[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Tool[]>([]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = tools.filter(tool =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5);
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const addTool = (tool: Tool) => {
    if (selectedTools.length < 4 && !selectedTools.find(t => t.id === tool.id)) {
      setSelectedTools([...selectedTools, tool]);
      setSearchQuery('');
      setSearchResults([]);
    }
  };

  const removeTool = (toolId: string) => {
    setSelectedTools(selectedTools.filter(t => t.id !== toolId));
  };

  const getFeatureValue = (tool: Tool, feature: string) => {
    switch (feature) {
      case '定价':
        return tool.pricing;
      case '热度评分':
        return `${tool.popularity}/100`;
      case '主要功能数':
        return tool.features?.length.toString() || '0';
      case '支持平台':
        return tool.platforms?.join(', ') || '未知';
      case '技术栈':
        return tool.techStack?.join(', ') || '未知';
      case '更新状态':
        return '活跃维护';
      default:
        return '未知';
    }
  };

  const compareFeatures = [
    '定价',
    '热度评分',
    '主要功能数',
    '支持平台',
    '技术栈',
    '更新状态'
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">AI工具对比</h1>
            <p className="text-xl text-muted-foreground mb-8">
              选择最多4个工具进行详细对比，找到最适合你的AI解决方案
            </p>
            
            {/* Tool Search */}
            <div className="relative max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="搜索要对比的工具..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card border rounded-lg shadow-lg z-10">
                  {searchResults.map((tool) => (
                    <div
                      key={tool.id}
                      className="flex items-center gap-3 p-3 hover:bg-muted cursor-pointer border-b last:border-b-0"
                      onClick={() => addTool(tool)}
                    >
                      {tool.logo && (
                        <OptimizedImage
                          src={tool.logo}
                          alt={`${tool.name} logo`}
                          width={32}
                          height={32}
                          className="rounded-lg"
                        />
                      )}
                      <div className="flex-1 text-left">
                        <div className="font-medium">{tool.name}</div>
                        <div className="text-sm text-muted-foreground line-clamp-1">
                          {tool.description}
                        </div>
                      </div>
                      <Plus className="h-4 w-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Selected Tools */}
        {selectedTools.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">已选择的工具 ({selectedTools.length}/4)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {selectedTools.map((tool) => (
                <Card key={tool.id} className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 h-8 w-8 p-0"
                    onClick={() => removeTool(tool.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      {tool.logo && (
                        <OptimizedImage
                          src={tool.logo}
                          alt={`${tool.name} logo`}
                          width={40}
                          height={40}
                          className="rounded-lg"
                        />
                      )}
                      <div>
                        <h3 className="font-semibold">{tool.name}</h3>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          <span className="text-xs text-muted-foreground">
                            {tool.popularity}/100
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {tool.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Comparison Table */}
        {selectedTools.length >= 2 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>详细对比</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-medium">特性</th>
                      {selectedTools.map((tool) => (
                        <th key={tool.id} className="text-center p-4 min-w-[200px]">
                          <div className="flex flex-col items-center gap-2">
                            {tool.logo && (
                              <OptimizedImage
                                src={tool.logo}
                                alt={`${tool.name} logo`}
                                width={48}
                                height={48}
                                className="rounded-lg"
                              />
                            )}
                            <span className="font-semibold">{tool.name}</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {compareFeatures.map((feature, index) => (
                      <tr key={feature} className={cn("border-b", index % 2 === 0 && "bg-muted/30")}>
                        <td className="p-4 font-medium">{feature}</td>
                        {selectedTools.map((tool) => (
                          <td key={`${tool.id}-${feature}`} className="p-4 text-center">
                            {feature === '定价' ? (
                              <Badge 
                                variant={tool.pricing === 'Free' || tool.pricing === 'Open Source' ? 'default' : 'secondary'}
                                className="text-xs"
                              >
                                {tool.pricing === 'Open Source' ? '开源' : 
                                 tool.pricing === 'Free' ? '免费' :
                                 tool.pricing === 'Freemium' ? '免费试用' : '付费'}
                              </Badge>
                            ) : feature === '热度评分' ? (
                              <div className="flex items-center justify-center gap-1">
                                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                <span>{tool.popularity}/100</span>
                              </div>
                            ) : (
                              <span className="text-sm">{getFeatureValue(tool, feature)}</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                    <tr className="border-b">
                      <td className="p-4 font-medium">主要功能</td>
                      {selectedTools.map((tool) => (
                        <td key={`${tool.id}-features`} className="p-4">
                          <div className="space-y-1">
                            {(tool.features || []).slice(0, 3).map((feature, idx) => (
                              <div key={idx} className="flex items-center gap-1 text-xs">
                                <Check className="h-3 w-3 text-green-500" />
                                <span>{feature}</span>
                              </div>
                            ))}
                            {(tool.features || []).length > 3 && (
                              <div className="text-xs text-muted-foreground">
                                +{tool.features!.length - 3} 更多
                              </div>
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">操作</td>
                      {selectedTools.map((tool) => (
                        <td key={`${tool.id}-action`} className="p-4">
                          <AffiliateLink
                            tool={tool}
                            variant="default"
                            showCommission={false}
                            trackingId={`compare-${tool.id}`}
                            className="[&_button]:w-full [&_button]:text-sm"
                          />
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Popular Comparisons */}
        <Card>
          <CardHeader>
            <CardTitle>热门对比</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'ChatGPT vs Claude', tools: ['chatgpt', 'claude'], description: '对比两大顶级AI助手的优劣' },
                { title: 'GitHub vs GitLab', tools: ['github'], description: '代码托管平台的全面对比' },
                { title: 'Figma vs Sketch', tools: ['figma'], description: '设计工具的功能对比分析' },
                { title: 'VS Code vs WebStorm', tools: ['visual-studio-code'], description: '代码编辑器的详细对比' },
                { title: 'Docker vs Kubernetes', tools: ['docker'], description: '容器化技术的深度对比' },
                { title: 'AWS vs Azure', tools: ['amazon-web-services'], description: '云服务平台的全面比较' },
              ].map((comparison, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{comparison.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {comparison.description}
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      查看对比
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {selectedTools.length === 0 && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="mb-4">
                <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              </div>
              <h3 className="text-xl font-semibold mb-2">开始对比工具</h3>
              <p className="text-muted-foreground">
                使用上方搜索框添加要对比的AI工具，最多可以同时对比4个工具
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}