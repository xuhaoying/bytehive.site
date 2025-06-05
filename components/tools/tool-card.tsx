"use client";

import { useState } from 'react';
import { ExternalLink, Star } from 'lucide-react';
import { AITool } from '@/types';
import { cn } from '@/lib/utils';

export default function ToolCard({ tool }: { tool: AITool }) {
  const [isHovered, setIsHovered] = useState(false);
  
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
  
  const renderPopularityStars = (popularity: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star 
        key={index} 
        className={cn(
          "h-4 w-4",
          index < popularity 
            ? "fill-amber-400 text-amber-400" 
            : "fill-none text-muted-foreground/30"
        )}
      />
    ));
  };

  return (
    <div 
      className="group bg-card rounded-2xl overflow-hidden border-2 border-border hover:border-primary/20 transition-all duration-300 h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-8 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center">
            {tool.logoUrl ? (
              <div className="h-12 w-12 rounded-xl overflow-hidden mr-4 bg-secondary flex items-center justify-center">
                <div
                  className="h-full w-full bg-contain bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${tool.logoUrl})` }}
                ></div>
              </div>
            ) : (
              <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mr-4 text-xl font-semibold">
                {tool.name.charAt(0)}
              </div>
            )}
            <h3 className="font-semibold text-xl">{tool.name}</h3>
          </div>
          <div className="flex">
            {renderPopularityStars(tool.popularity)}
          </div>
        </div>
        
        <p className="text-muted-foreground mb-6 text-base flex-grow">
          {tool.description}
        </p>
        
        <div className="mb-6">
          <ul className="space-y-2">
            {tool.shortEvaluation.map((feature, index) => (
              <li key={index} className="flex items-start text-sm">
                <span className="text-emerald-500 mr-2">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          <span className={cn(
            "px-3 py-1.5 rounded-full text-sm font-medium",
            getPaymentBadgeColor(tool.paymentModel)
          )}>
            {tool.paymentModel}
          </span>
          
          {tool.categories.slice(0, 2).map((category, index) => (
            <span key={index} className="bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full text-sm">
              {category}
            </span>
          ))}
          
          {tool.categories.length > 2 && (
            <span className="bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full text-sm">
              +{tool.categories.length - 2}
            </span>
          )}
        </div>
      </div>
      
      <a 
        href={tool.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className={cn(
          "w-full py-4 px-6 flex items-center justify-center gap-2 text-base font-medium transition-colors",
          "border-t-2 border-border group-hover:border-primary/20",
          isHovered 
            ? "bg-primary text-primary-foreground" 
            : "bg-secondary/50 text-secondary-foreground hover:bg-secondary"
        )}
      >
        Visit Website
        <ExternalLink className="h-4 w-4" />
      </a>
    </div>
  );
}