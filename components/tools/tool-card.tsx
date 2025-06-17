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
import { getPricingConfig, getPricingClassName } from '@/lib/pricing-utils';

interface ToolCardProps {
  tool: Tool;
  searchQuery?: string;
}

export default function ToolCard({ tool, searchQuery }: ToolCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { trackToolClick } = useGoogleAnalytics(process.env.NEXT_PUBLIC_GA_ID || '');
  
  const pricingConfig = getPricingConfig(tool.pricing);
  
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
        <mark key={index} className="bg-yellow-200 px-1 rounded">
          {part}
        </mark> : part
    );
  };

  const category = getCategoryBySlug(tool.category);

  const handleCardClick = () => {
    trackToolClick(tool.name, tool.category, 'view_details');
  };

  return (
    <Link 
      href={`/tool/${tool.slug}`}
      className="group bg-card rounded-2xl overflow-hidden border-2 border-border hover:border-primary/20 transition-all duration-300 h-full flex flex-col cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
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
              <h3 className="font-semibold text-lg text-foreground line-clamp-1 flex-1">
                {highlightText(tool.name, searchQuery)}
              </h3>
              <div onClick={(e) => e.stopPropagation()}>
                <BookmarkSystem tool={tool} className="ml-2 flex-shrink-0" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {tool.pricing}
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
            "px-2 py-1 rounded text-xs font-medium border",
            getPricingClassName(tool.pricing)
          )}>
            {pricingConfig.icon && <span className="mr-1">{pricingConfig.icon}</span>}
            {pricingConfig.label}
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
      
      <div className="flex gap-2 p-4 border-t" onClick={(e) => e.stopPropagation()}>
        <AffiliateLink
          tool={tool}
          variant="default"
          showCommission={false}
          trackingId={`card-${tool.id}`}
          className="flex-1 [&>div]:space-y-0 [&_button]:w-full [&_button]:text-sm [&_button]:py-2"
        />
      </div>
    </Link>
  );
}