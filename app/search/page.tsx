'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Fuse from 'fuse.js';
import { tools } from '@/data/tools';
import { categories } from '@/data/categories';
import ToolCard from '@/components/tools/tool-card';
import CategoryFilter from '@/components/tools/category-filter';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FilterState, Tool, ToolCategory, PaymentModel } from '@/types';
import { Search, X } from 'lucide-react';

// Create Fuse.js instance for search
const fuse = new Fuse(tools, {
  keys: ['name', 'description', 'longDescription', 'tags'],
  threshold: 0.3,
  includeScore: true,
});

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    paymentModels: [],
    searchQuery: initialQuery,
  });
  const [searchResults, setSearchResults] = useState<Tool[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Get all available categories and payment models
  const allCategories = categories.map(cat => cat.slug);
  const allPaymentModels: PaymentModel[] = ['Free', 'Freemium', 'Paid', 'Open Source'];

  // Perform search
  useEffect(() => {
    setIsLoading(true);
    
    let results = tools;
    
    // Apply text search if query exists
    if (filters.searchQuery.trim()) {
      const fuseResults = fuse.search(filters.searchQuery.trim());
      results = fuseResults.map(result => result.item);
    }
    
    // Apply category filters
    if (filters.categories.length > 0) {
      results = results.filter(tool => 
        filters.categories.includes(tool.category)
      );
    }
    
    // Apply payment model filters
    if (filters.paymentModels.length > 0) {
      results = results.filter(tool => 
        filters.paymentModels.includes(tool.pricing)
      );
    }
    
    setSearchResults(results);
    setIsLoading(false);
  }, [filters]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setFilters(prev => ({
      ...prev,
      searchQuery: query
    }));
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilters({
      categories: [],
      paymentModels: [],
      searchQuery: '',
    });
  };

  const getHighlightedText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() ? 
        <mark key={index} className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">
          {part}
        </mark> : part
    );
  };

  const activeFiltersCount = filters.categories.length + filters.paymentModels.length;

  return (
    <div className="min-h-screen bg-background">
      {/* Search Header */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">搜索工具</h1>
            
            {/* Search Input */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="搜索工具名称、描述或标签..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-12 pr-12 h-14 text-lg"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Search Stats */}
            <div className="text-center text-muted-foreground">
              {filters.searchQuery ? (
                <p>找到 <span className="font-semibold text-foreground">{searchResults.length}</span> 个与 
                  "<span className="font-semibold text-foreground">{filters.searchQuery}</span>" 相关的工具
                </p>
              ) : (
                <p>共有 <span className="font-semibold text-foreground">{tools.length}</span> 个工具可供浏览</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="mb-8">
          <CategoryFilter
            categories={allCategories}
            paymentModels={allPaymentModels}
            selectedFilters={filters}
            onFilterChange={handleFilterChange}
          />
          
          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <div className="flex items-center gap-2 mt-4 flex-wrap">
              <span className="text-sm text-muted-foreground">已选择筛选：</span>
              {filters.categories.map(category => {
                const categoryInfo = categories.find(cat => cat.slug === category);
                return (
                  <Badge key={category} variant="secondary" className="flex items-center gap-1">
                    {categoryInfo?.name}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 ml-1"
                      onClick={() => handleFilterChange({
                        ...filters,
                        categories: filters.categories.filter(c => c !== category)
                      })}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                );
              })}
              {filters.paymentModels.map(model => (
                <Badge key={model} variant="secondary" className="flex items-center gap-1">
                  {model === 'Open Source' ? '开源' : 
                   model === 'Free' ? '免费' :
                   model === 'Freemium' ? '免费试用' : '付费'}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => handleFilterChange({
                      ...filters,
                      paymentModels: filters.paymentModels.filter(p => p !== model)
                    })}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={clearSearch}
                className="text-xs"
              >
                清除所有筛选
              </Button>
            </div>
          )}
        </div>

        {/* Search Results */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="text-muted-foreground mt-4">搜索中...</p>
          </div>
        ) : searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {searchResults.map(tool => (
              <ToolCard 
                key={tool.id} 
                tool={tool}
                searchQuery={filters.searchQuery}
              />
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-muted-foreground text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-medium mb-2">未找到相关工具</h3>
              <p className="text-muted-foreground mb-6">
                尝试调整搜索关键词或筛选条件，或者浏览我们的工具分类
              </p>
              <div className="flex justify-center gap-4">
                <Button onClick={clearSearch} variant="outline">
                  清除搜索
                </Button>
                <Button asChild>
                  <a href="/">浏览所有分类</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search Suggestions */}
        {!filters.searchQuery && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-6">热门搜索</h2>
            <div className="flex flex-wrap gap-3">
              {['AI助手', '代码编辑器', '部署工具', 'API测试', '数据库', '监控', '设计工具', '开源'].map((term) => (
                <Button
                  key={term}
                  variant="outline"
                  onClick={() => handleSearch(term)}
                  className="text-sm"
                >
                  {term}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-muted-foreground mt-4">加载中...</p>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}