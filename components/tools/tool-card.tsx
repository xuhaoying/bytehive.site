"use client";

import { useState } from 'react';
import { ExternalLink, Star } from 'lucide-react';
import { Tool } from '@/types';
import { getCategoryBySlug } from '@/data/categories';
import Link from 'next/link';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { cn } from '@/lib/utils';
import { useGoogleAnalytics } from '@/components/analytics/google-analytics';
import { BookmarkSystem } from '@/components/tools/bookmark-system';
import { AffiliateLink } from '@/components/affiliate/affiliate-link';

interface ToolCardProps {
  tool: Tool;
  searchQuery?: string;
}

export default function ToolCard({ tool, searchQuery }: ToolCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { trackToolClick } = useGoogleAnalytics(process.env.NEXT_PUBLIC_GA_ID || '');
  
  const getPaymentBadgeColor = (model: string) => {
    switch (model) {
      case 'Free':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400';
      case 'Freemium':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400';
      case 'Paid':
        return 'bg-purple-50 text-purple-700 dark:bg-purple-950/30 dark:text-purple-400';
      case 'Open Source':
        return 'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };
  
  const getPopularityStars = (popularity: number) => {
    const stars = Math.round(popularity / 20); // Convert 0-100 to 0-5 stars
    return Array.from({ length: 5 }).map((_, index) => (
      <Star 
        key={index} 
        className={cn(
          "h-3 w-3",
          index < stars 
            ? "fill-amber-400 text-amber-400" 
            : "fill-none text-muted-foreground/30"
        )}
      />
    ));
  };

  const highlightText = (text: string, query?: string) => {
    if (!query || !query.trim()) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() ? 
        <mark key={index} className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">
          {part}
        </mark> : part
    );
  };

  const category = getCategoryBySlug(tool.category);

  return (
    <div 
      className="group bg-card rounded-2xl overflow-hidden border-2 border-border hover:border-primary/20 transition-all duration-300 h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-8 flex-1 flex flex-col">
        <div className="flex items-start gap-4 mb-4">
          {tool.logo ? (
            <div className="flex-shrink-0">
              <OptimizedImage
                src={tool.logo}
                alt={`${tool.name} logo`}
                width={48}
                height={48}
                className="rounded-xl"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-xl font-semibold">
              {tool.name.charAt(0)}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-1">
              <h3 className="font-semibold text-lg line-clamp-1 flex-1">
                {highlightText(tool.name, searchQuery)}
              </h3>
              <BookmarkSystem tool={tool} className="ml-2 flex-shrink-0" />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {getPopularityStars(tool.popularity)}
              </div>
              <span className="text-xs text-muted-foreground">
                {tool.popularity}/100
              </span>
            </div>
          </div>
        </div>
        
        <p className="text-muted-foreground mb-4 text-sm flex-grow line-clamp-3">
          {highlightText(tool.description, searchQuery)}
        </p>
        
        {tool.features && tool.features.length > 0 && (
          <div className="mb-4">
            <ul className="space-y-1">
              {tool.features.slice(0, 2).map((feature, index) => (
                <li key={index} className="flex items-start text-xs text-muted-foreground">
                  <span className="text-emerald-500 mr-2 text-sm">✓</span>
                  <span className="line-clamp-1">{feature}</span>
                </li>
              ))}
              {tool.features.length > 2 && (
                <li className="text-xs text-muted-foreground ml-4">
                  +{tool.features.length - 2} 更多功能
                </li>
              )}
            </ul>
          </div>
        )}
        
        <div className="flex flex-wrap gap-2 mt-auto">
          <span className={cn(
            "px-2 py-1 rounded text-xs font-medium",
            getPaymentBadgeColor(tool.pricing)
          )}>
            {tool.pricing === 'Open Source' ? '开源' : 
             tool.pricing === 'Free' ? '免费' :
             tool.pricing === 'Freemium' ? '免费试用' : '付费'}
          </span>
          
          {category && (
            <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs">
              {category.name}
            </span>
          )}
          
          {tool.tags.slice(0, 2).map((tag, index) => (
            <span key={index} className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs">
              {tag}
            </span>
          ))}
          
          {tool.tags.length > 2 && (
            <span className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs">
              +{tool.tags.length - 2}
            </span>
          )}
        </div>
      </div>
      
      <div className="flex gap-2 p-4 border-t">
        <Link 
          href={`/tool/${tool.slug}`}
          className="flex-1 py-2 px-4 text-center text-sm font-medium bg-secondary hover:bg-secondary/80 rounded-lg transition-colors"
          onClick={() => trackToolClick(tool.name, category?.name || '', 'view_details')}
        >
          查看详情
        </Link>
        <div className="flex-1">
          <AffiliateLink
            tool={tool}
            variant="outline"
            showCommission={false}
            trackingId={`card-${tool.id}`}
            className="h-full [&>div]:space-y-0 [&_button]:h-full [&_button]:text-sm [&_button]:py-2 [&_button]:px-4"
          />
        </div>
      </div>
    </div>
  );
}