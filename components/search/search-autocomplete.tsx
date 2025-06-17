'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Clock, TrendingUp, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { tools } from '@/data/tools';
import { categories } from '@/data/categories';
import Link from 'next/link';

interface SearchAutocompleteProps {
  placeholder?: string;
  className?: string;
  onSearch?: (query: string) => void;
  closeMenu?: () => void;
}

interface SearchSuggestion {
  type: 'tool' | 'category' | 'history' | 'trending';
  label: string;
  value: string;
  icon?: string;
  description?: string;
  url: string;
}

export function SearchAutocomplete({
  placeholder = '搜索工具...',
  className,
  onSearch,
  closeMenu
}: SearchAutocompleteProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout>();

  // 从本地存储加载搜索历史
  useEffect(() => {
    const history = localStorage.getItem('searchHistory');
    if (history) {
      setSearchHistory(JSON.parse(history).slice(0, 5));
    }
  }, []);

  // 保存搜索历史
  const saveToHistory = (searchTerm: string) => {
    const newHistory = [
      searchTerm,
      ...searchHistory.filter(h => h !== searchTerm)
    ].slice(0, 10);
    
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  // 获取热门搜索
  const getTrendingSearches = (): SearchSuggestion[] => {
    return tools
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 3)
      .map(tool => ({
        type: 'trending',
        label: tool.name,
        value: tool.name,
        description: tool.description,
        url: `/tool/${tool.slug}`
      }));
  };

  // 生成搜索建议
  const generateSuggestions = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      // 显示搜索历史和热门搜索
      const historySuggestions: SearchSuggestion[] = searchHistory.map(h => ({
        type: 'history',
        label: h,
        value: h,
        url: `/search?q=${encodeURIComponent(h)}`
      }));
      
      const trendingSuggestions = getTrendingSearches();
      
      return [...historySuggestions, ...trendingSuggestions];
    }

    const lowerQuery = searchQuery.toLowerCase();
    const suggestions: SearchSuggestion[] = [];

    // 搜索工具
    const matchedTools = tools
      .filter(tool => 
        tool.name.toLowerCase().includes(lowerQuery) ||
        tool.description.toLowerCase().includes(lowerQuery) ||
        tool.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
      )
      .slice(0, 5)
      .map(tool => ({
        type: 'tool' as const,
        label: tool.name,
        value: tool.name,
        icon: tool.logo,
        description: tool.description,
        url: `/tool/${tool.slug}`
      }));

    suggestions.push(...matchedTools);

    // 搜索分类
    const matchedCategories = categories
      .filter(cat => 
        cat.name.toLowerCase().includes(lowerQuery) ||
        cat.description.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 3)
      .map(cat => ({
        type: 'category' as const,
        label: cat.name,
        value: cat.name,
        icon: cat.icon,
        description: `${cat.toolCount} 个工具`,
        url: `/category/${cat.slug}`
      }));

    suggestions.push(...matchedCategories);

    // 如果没有结果，添加一个直接搜索选项
    if (suggestions.length === 0) {
      suggestions.push({
        type: 'tool',
        label: `搜索 "${searchQuery}"`,
        value: searchQuery,
        url: `/search?q=${encodeURIComponent(searchQuery)}`
      });
    }

    return suggestions;
  }, [searchHistory]);

  // 处理输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedIndex(-1);
    
    // 清除之前的定时器
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    // 防抖处理
    if (value.trim() || value === '') {
      setIsLoading(true);
      debounceTimerRef.current = setTimeout(() => {
        const newSuggestions = generateSuggestions(value);
        setSuggestions(newSuggestions);
        setIsOpen(true);
        setIsLoading(false);
      }, 200);
    } else {
      setSuggestions([]);
      setIsOpen(false);
      setIsLoading(false);
    }
  };

  // 处理搜索提交
  const handleSearch = (searchQuery?: string) => {
    const finalQuery = searchQuery || query;
    
    if (finalQuery.trim()) {
      saveToHistory(finalQuery.trim());
      onSearch?.(finalQuery);
      router.push(`/search?q=${encodeURIComponent(finalQuery.trim())}`);
      setQuery('');
      setIsOpen(false);
      setSuggestions([]);
      closeMenu?.();
    }
  };

  // 处理建议项点击
  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    if (suggestion.type === 'history' || suggestion.url.includes('/search?q=')) {
      handleSearch(suggestion.value);
    } else {
      saveToHistory(suggestion.label);
      router.push(suggestion.url);
      setQuery('');
      setIsOpen(false);
      closeMenu?.();
    }
  };

  // 键盘导航
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionClick(suggestions[selectedIndex]);
        } else {
          handleSearch();
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // 点击外部关闭
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={cn('relative', className)}>
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        className="relative"
      >
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0 || !query) {
              setIsOpen(true);
            }
          }}
          className="pl-10 pr-4"
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
        )}
      </form>

      {/* 搜索建议下拉框 */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1 bg-popover border rounded-lg shadow-lg z-50 overflow-hidden"
        >
          <div className="max-h-96 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <button
                key={`${suggestion.type}-${suggestion.value}-${index}`}
                type="button"
                onClick={() => handleSuggestionClick(suggestion)}
                className={cn(
                  'w-full px-4 py-3 flex items-start gap-3 hover:bg-muted transition-colors',
                  selectedIndex === index && 'bg-muted'
                )}
              >
                {/* 图标 */}
                <div className="flex-shrink-0 mt-0.5">
                  {suggestion.type === 'history' && (
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  )}
                  {suggestion.type === 'trending' && (
                    <TrendingUp className="h-4 w-4 text-amber-500" />
                  )}
                  {suggestion.type === 'tool' && suggestion.icon && (
                    <img 
                      src={suggestion.icon} 
                      alt="" 
                      className="h-5 w-5 rounded"
                    />
                  )}
                  {suggestion.type === 'category' && (
                    <span className="text-lg">{suggestion.icon}</span>
                  )}
                  {!suggestion.icon && suggestion.type === 'tool' && (
                    <Search className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>

                {/* 内容 */}
                <div className="flex-1 text-left">
                  <div className="font-medium text-sm">{suggestion.label}</div>
                  {suggestion.description && (
                    <div className="text-xs text-muted-foreground line-clamp-1">
                      {suggestion.description}
                    </div>
                  )}
                </div>

                {/* 标签 */}
                {suggestion.type === 'trending' && (
                  <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded">
                    热门
                  </span>
                )}
                {suggestion.type === 'category' && (
                  <span className="text-xs text-muted-foreground">
                    分类
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* 底部提示 */}
          {query && suggestions.length > 0 && (
            <div className="border-t px-4 py-2 text-xs text-muted-foreground">
              按 Enter 搜索，使用方向键导航
            </div>
          )}
        </div>
      )}
    </div>
  );
}