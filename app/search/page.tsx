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
import { Search, X, TrendingUp, Clock, Hash } from 'lucide-react';

// Create Fuse.js instance for search
const fuse = new Fuse(tools, {
  keys: ['name', 'description', 'longDescription', 'tags'],
  threshold: 0.3,
  includeScore: true,
});

// Hot search keywords (模拟热门搜索数据)
const hotSearches = [
  { keyword: 'AI写作工具', count: 1250 },
  { keyword: 'ChatGPT替代', count: 980 },
  { keyword: '免费AI工具', count: 856 },
  { keyword: '图像生成', count: 723 },
  { keyword: '代码助手', count: 645 },
  { keyword: '视频编辑', count: 534 },
  { keyword: 'PPT制作', count: 432 },
  { keyword: '翻译工具', count: 387 },
];

// Search suggestions based on partial input
const getSearchSuggestions = (query: string): string[] => {
  if (!query.trim()) return [];
  
  const suggestions = new Set<string>();
  
  // Tool names
  tools.forEach(tool => {
    if (tool.name.toLowerCase().includes(query.toLowerCase())) {
      suggestions.add(tool.name);
    }
  });
  
  // Tags
  tools.forEach(tool => {
    tool.tags.forEach(tag => {
      if (tag.toLowerCase().includes(query.toLowerCase())) {
        suggestions.add(tag);
      }
    });
  });
  
  // Categories
  categories.forEach(cat => {
    if (cat.name.toLowerCase().includes(query.toLowerCase())) {
      suggestions.add(cat.name);
    }
  });
  
  return Array.from(suggestions).slice(0, 8);
};

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
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

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

  // Handle search input changes
  const handleSearchInputChange = (value: string) => {
    setSearchQuery(value);
    if (value.trim()) {
      setSuggestions(getSearchSuggestions(value));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setFilters(prev => ({
      ...prev,
      searchQuery: query
    }));
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSearch(suggestion);
  };

  const handleHotSearchClick = (keyword: string) => {
    handleSearch(keyword);
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
                onChange={(e) => handleSearchInputChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch(searchQuery);
                  }
                }}
                onFocus={() => {
                  if (searchQuery.trim()) {
                    setShowSuggestions(true);
                  }
                }}
                onBlur={() => {
                  // Delay hiding suggestions to allow clicking
                  setTimeout(() => setShowSuggestions(false), 200);
                }}
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
              
              {/* Search Suggestions */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 hover:bg-muted cursor-pointer border-b last:border-b-0"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <Search className="h-4 w-4 text-muted-foreground" />
                      <span>{suggestion}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Hot Searches - only show when no search query */}
            {!filters.searchQuery && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">热门搜索</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {hotSearches.slice(0, 6).map((item, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleHotSearchClick(item.keyword)}
                      className="h-8 text-xs"
                    >
                      <Hash className="h-3 w-3 mr-1" />
                      {item.keyword}
                      <span className="ml-1 text-muted-foreground">({item.count})</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}

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