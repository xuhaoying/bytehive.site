"use client";

import { useState, useEffect } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface HeroSectionProps {
  onSearch: (query: string) => void;
  toolsCount: number;
}

export default function HeroSection({ onSearch, toolsCount }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const router = useRouter();
  
  const searchExamples = [
    "AI助手", 
    "代码编辑器", 
    "部署工具", 
    "API测试", 
    "数据库"
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex(prev => (prev + 1) % searchExamples.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      onSearch(searchQuery);
    }
  };

  const handleQuickSearch = (term: string) => {
    router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div className="hero-gradient absolute inset-0 pointer-events-none" />
      <div className="container relative mx-auto px-4 pt-24 pb-32 md:pt-32 md:pb-40">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
            发现最佳的
            <br />
            开发工具
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            浏览我们精选的 {toolsCount}+ 个开发工具，涵盖多个分类。
          </p>
          
          <div className="max-w-2xl mx-auto mb-16">
            <form onSubmit={handleSubmit} className="relative group">
              <input
                type="text"
                placeholder={`试试搜索 "${searchExamples[currentWordIndex]}"...`}
                className="w-full h-16 px-8 rounded-2xl bg-background border-2 border-border shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-3 top-3 bg-primary text-primary-foreground h-10 px-6 rounded-xl hover:bg-primary/90 transition-colors flex items-center gap-2 text-sm font-medium"
              >
                搜索
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <span className="text-muted-foreground text-lg">热门:</span>
            {['免费工具', 'AI助手', '代码编辑器', '部署工具'].map((term, index) => (
              <button
                key={index}
                onClick={() => handleQuickSearch(term)}
                className="text-lg hover:text-primary transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}