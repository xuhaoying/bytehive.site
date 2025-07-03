"use client";

import { useState, useEffect } from 'react';
import { ServiceCard } from './ServiceCard';
import { CostCalculator } from './CostCalculator';
import { ServiceCategory, Provider, Selection } from '@/types/infrastructure';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Search, LayoutGrid, List, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { searchProviders, getProviderById } from '@/lib/data/providers';

interface Category {
  id: string;
  name: string;
  displayName: string;
  icon: string;
  description: string;
  count: number;
}

interface InfrastructureNavigatorProps {
  initialCategories: Category[];
  initialProviders: Provider[];
}

export function InfrastructureNavigator({ 
  initialCategories,
  initialProviders 
}: InfrastructureNavigatorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('hosting');
  const [searchQuery, setSearchQuery] = useState('');
  const [selections, setSelections] = useState<Selection[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [categories] = useState<Category[]>(initialCategories);
  const [allProviders] = useState<Provider[]>(initialProviders);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showMobileCalculator, setShowMobileCalculator] = useState(false);
  
  // 筛选状态
  const [filters, setFilters] = useState({
    hasFreeTier: false,
    globalNodes: false,
    gdprCompliant: false,
    priceRange: [0, 100] as [number, number]
  });

  // 加载服务提供商
  useEffect(() => {
    let filteredProviders: Provider[] = [];
    
    if (searchQuery) {
      // 搜索模式
      filteredProviders = allProviders.filter(provider => {
        const searchTerm = searchQuery.toLowerCase();
        return (
          provider.name.toLowerCase().includes(searchTerm) ||
          provider.displayName.toLowerCase().includes(searchTerm) ||
          provider.description.toLowerCase().includes(searchTerm) ||
          provider.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
          (provider.searchKeywords && provider.searchKeywords.some(keyword => 
            keyword.toLowerCase().includes(searchTerm)
          ))
        );
      });
    } else {
      // 分类浏览模式
      filteredProviders = allProviders.filter(provider => provider.category === selectedCategory);
    }
    
    // 应用筛选条件
    if (filters.hasFreeTier) {
      filteredProviders = filteredProviders.filter(p => 
        p.plans.some(plan => plan.billing.basePrice === 0)
      );
    }
    
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 500) {
      filteredProviders = filteredProviders.filter(p => {
        const minPrice = Math.min(...p.plans.map(plan => plan.billing.basePrice));
        return minPrice >= filters.priceRange[0] && minPrice <= filters.priceRange[1];
      });
    }
    
    setProviders(filteredProviders);
  }, [selectedCategory, searchQuery, filters, allProviders]);

  // 添加到估算器
  const handleAddToCalculator = (providerId: string, planId: string) => {
    const provider = allProviders.find(p => p.id === providerId);
    const plan = provider?.plans.find(p => p.id === planId);
    
    if (!provider || !plan) return;
    
    // 检查是否已存在
    const exists = selections.some(s => s.providerId === providerId && s.planId === planId);
    if (exists) return;
    
    // 创建默认变量值
    const defaultVariables: Record<string, number> = {};
    plan.calculatorConfig.variables.forEach(v => {
      defaultVariables[v.name] = v.default as number;
    });
    
    const newSelection: Selection = {
      providerId,
      planId,
      variables: defaultVariables,
      calculatedCost: plan.billing.basePrice
    };
    
    setSelections([...selections, newSelection]);
    
    // 移动端显示计算器
    if (window.innerWidth < 1024) {
      setShowMobileCalculator(true);
    }
  };

  const currentCategory = categories.find(cat => cat.id === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Page Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">基础设施导航</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          探索和比较云服务、数据库、CDN等基础设施服务，使用智能成本计算器做出最佳决策
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr_300px] gap-6">
        {/* 左侧分类导航 */}
        <aside className="space-y-6 lg:block hidden">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">服务分类</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <nav className="space-y-1">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setSearchQuery('');
                    }}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-muted transition-colors",
                      selectedCategory === category.id && !searchQuery && "bg-muted font-medium"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-lg">{category.icon}</span>
                      <span>{category.name}</span>
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>

          {/* 筛选条件 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                筛选条件
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="free-tier"
                    checked={filters.hasFreeTier}
                    onCheckedChange={(checked) => 
                      setFilters(prev => ({ ...prev, hasFreeTier: checked as boolean }))
                    }
                  />
                  <Label htmlFor="free-tier" className="text-sm font-normal cursor-pointer">
                    有免费层
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="global-nodes"
                    checked={filters.globalNodes}
                    onCheckedChange={(checked) => 
                      setFilters(prev => ({ ...prev, globalNodes: checked as boolean }))
                    }
                  />
                  <Label htmlFor="global-nodes" className="text-sm font-normal cursor-pointer">
                    全球节点
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="gdpr"
                    checked={filters.gdprCompliant}
                    onCheckedChange={(checked) => 
                      setFilters(prev => ({ ...prev, gdprCompliant: checked as boolean }))
                    }
                  />
                  <Label htmlFor="gdpr" className="text-sm font-normal cursor-pointer">
                    GDPR合规
                  </Label>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm">价格范围 ($/月)</Label>
                <Slider
                  min={0}
                  max={500}
                  step={10}
                  value={filters.priceRange}
                  onValueChange={(value) => 
                    setFilters(prev => ({ ...prev, priceRange: value as [number, number] }))
                  }
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>${filters.priceRange[0]}</span>
                  <span>${filters.priceRange[1]}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* 中间服务展示区 */}
        <div className="space-y-6">
          {/* 搜索和视图切换 */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="搜索服务..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
              {/* 移动端显示计算器按钮 */}
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden"
                onClick={() => setShowMobileCalculator(!showMobileCalculator)}
              >
                成本计算器 ({selections.length})
              </Button>
            </div>
          </div>

          {/* 服务列表标题 */}
          <div>
            <h2 className="text-2xl font-bold mb-2">
              {searchQuery 
                ? `搜索结果: "${searchQuery}" (${providers.length}个)`
                : `${currentCategory?.displayName || '所有服务'} (${providers.length}个)`
              }
            </h2>
            {currentCategory?.description && !searchQuery && (
              <p className="text-muted-foreground">{currentCategory.description}</p>
            )}
          </div>

          {/* 服务卡片列表 */}
          {providers.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground mb-2">未找到匹配的服务</p>
                <p className="text-sm text-muted-foreground">请尝试调整筛选条件或搜索其他关键词</p>
              </CardContent>
            </Card>
          ) : (
            <div className={cn(
              "gap-4",
              viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2" 
                : "space-y-4"
            )}>
              {providers.map((provider) => (
                <ServiceCard
                  key={provider.id}
                  provider={provider}
                  onAddToCalculator={handleAddToCalculator}
                />
              ))}
            </div>
          )}
        </div>

        {/* 右侧成本估算器 - 桌面端 */}
        <aside className="hidden lg:block">
          <div className="sticky top-6">
            <CostCalculator
              selections={selections}
              onUpdateSelections={setSelections}
            />
          </div>
        </aside>
      </div>

      {/* 移动端成本计算器 */}
      {showMobileCalculator && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" 
               onClick={() => setShowMobileCalculator(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-background border-t">
            <div className="max-h-[80vh] overflow-y-auto">
              <CostCalculator
                selections={selections}
                onUpdateSelections={setSelections}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}