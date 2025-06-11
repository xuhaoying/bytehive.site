"use client";

import { useState, useEffect } from 'react';
import { ArrowRight, Search, Sparkles, Zap, Star } from 'lucide-react';
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
    "智能写作助手", 
    "AI图像生成", 
    "语音合成工具", 
    "数据分析AI", 
    "自动化脚本",
    "机器学习平台"
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex(prev => (prev + 1) % searchExamples.length);
    }, 2500);
    
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
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 via-orange-50/30 to-red-50/50 dark:from-amber-950/20 dark:via-orange-950/10 dark:to-red-950/20" />
      
      {/* Animated Hexagon Pattern */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${10 + (i % 4) * 25}%`,
              top: `${10 + Math.floor(i / 4) * 30}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: '4s'
            }}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-amber-400/20 to-orange-500/20 transform rotate-45 rounded-lg" />
          </div>
        ))}
      </div>
      
      <div className="container relative mx-auto px-4 pt-32 pb-40 md:pt-40 md:pb-48">
        <div className="max-w-5xl mx-auto text-center">
          {/* Brand Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-full px-6 py-3 mb-8 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-amber-600" />
            <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
              欢迎来到AI工具的蜂巢
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
              探索未来
            </span>
            <br />
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
              AI工具生态
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto leading-relaxed">
            汇聚全球 <span className="font-bold text-amber-600">{toolsCount}+</span> 优质AI工具与资源
          </p>
          
          <p className="text-lg text-muted-foreground/80 mb-16 max-w-2xl mx-auto">
            从创意设计到代码开发，从数据分析到自动化办公，ByteHive为您打造专业的AI工具生态系统
          </p>
          
          {/* Enhanced Search Bar */}
          <div className="max-w-3xl mx-auto mb-20">
            <form onSubmit={handleSubmit} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
              <div className="relative bg-background/80 backdrop-blur-xl border-2 border-border/50 rounded-3xl p-2 shadow-2xl group-hover:border-amber-500/50 transition-all duration-300">
                <div className="flex items-center">
                  <div className="flex-1 relative">
                    <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-muted-foreground h-6 w-6" />
                    <input
                      type="text"
                      placeholder={`探索 "${searchExamples[currentWordIndex]}"...`}
                      className="w-full h-16 pl-16 pr-6 bg-transparent border-0 text-lg placeholder:text-muted-foreground/60 focus:outline-none"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-amber-500 to-orange-500 text-white h-12 px-8 rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2 text-base font-medium"
                  >
                    <Zap className="h-5 w-5" />
                    探索
                  </button>
                </div>
              </div>
            </form>
          </div>
          
          {/* Quick Search Tags */}
          <div className="flex flex-wrap justify-center items-center gap-4 mb-12">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Star className="h-4 w-4" />
              <span className="text-base font-medium">热门推荐:</span>
            </div>
            {[
              { label: 'AI创作', icon: '✨' },
              { label: '智能助手', icon: '🤖' }, 
              { label: '图像生成', icon: '🎨' }, 
              { label: '数据分析', icon: '📊' },
              { label: '自动化', icon: '⚡' }
            ].map((item, index) => (
              <button
                key={index}
                onClick={() => handleQuickSearch(item.label)}
                className="flex items-center gap-2 px-4 py-2 bg-muted/50 hover:bg-gradient-to-r hover:from-amber-500/10 hover:to-orange-500/10 border border-border/50 hover:border-amber-500/30 rounded-full text-base hover:text-amber-700 dark:hover:text-amber-300 transition-all duration-300 backdrop-blur-sm"
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            {[
              { number: '500+', label: 'AI工具' },
              { number: '50+', label: '分类' },
              { number: '10万+', label: '用户' },
              { number: '4.9', label: '评分' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gradient bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}