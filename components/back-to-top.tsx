'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 显示按钮的阈值
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 300);
      
      // 检查是否在页面底部
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollBottom = scrollTop + windowHeight;
      setIsAtBottom(scrollBottom >= documentHeight - 100);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初始检查

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        'fixed right-4 z-50 p-3 bg-primary text-primary-foreground rounded-full shadow-lg',
        'hover:shadow-xl transition-all duration-300 transform hover:scale-110',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        isAtBottom ? 'bottom-24 md:bottom-20' : 'bottom-6 md:bottom-8'
      )}
      aria-label="返回顶部"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}

// 带有进度指示的返回顶部按钮
export function BackToTopWithProgress() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / documentHeight) * 100;
      
      setScrollProgress(progress);
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-4 md:bottom-8 md:right-6 z-50 group"
      aria-label="返回顶部"
    >
      <div className="relative">
        {/* 进度环 */}
        <svg
          className="absolute inset-0 w-12 h-12 transform -rotate-90"
          viewBox="0 0 48 48"
        >
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            className="text-gray-200"
          />
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 20}`}
            strokeDashoffset={`${2 * Math.PI * 20 * (1 - scrollProgress / 100)}`}
            className="text-primary transition-all duration-300"
          />
        </svg>
        
        {/* 按钮内容 */}
        <div className="relative w-12 h-12 bg-background border-2 border-primary rounded-full flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
          <ArrowUp className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
        </div>
      </div>
      
      {/* 提示文字 */}
      <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-popover text-popover-foreground px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        返回顶部
      </span>
    </button>
  );
}