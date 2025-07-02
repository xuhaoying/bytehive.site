"use client";

import { Provider, Plan } from '@/types/infrastructure';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  provider: Provider;
  onAddToCalculator: (providerId: string, planId: string) => void;
  className?: string;
}

export function ServiceCard({ provider, onAddToCalculator, className }: ServiceCardProps) {
  // 获取最低价格的计划
  const lowestPricePlan = provider.plans.reduce((min, plan) => 
    plan.billing.basePrice < min.billing.basePrice ? plan : min
  );
  
  const hasFreeTier = provider.plans.some(plan => plan.billing.basePrice === 0);
  
  return (
    <Card className={cn("hover:shadow-lg transition-shadow", className)}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          {/* Logo占位符 - 实际项目中应该用真实的logo */}
          <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center text-primary font-bold text-lg">
            {provider.displayName.charAt(0)}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{provider.displayName}</h3>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {provider.description}
            </p>
          </div>
        </div>
        
        {/* 标签 */}
        <div className="flex flex-wrap gap-1 mb-4">
          {hasFreeTier && (
            <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300">
              免费层
            </Badge>
          )}
          {provider.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary">
              {tag}
            </Badge>
          ))}
          {provider.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{provider.tags.length - 3}
            </Badge>
          )}
        </div>
        
        {/* 价格信息 */}
        <div className="mb-4">
          <div className="text-sm text-muted-foreground">起步价</div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold">
              {lowestPricePlan.billing.basePrice === 0 ? '免费' : `$${lowestPricePlan.billing.basePrice}`}
            </span>
            {lowestPricePlan.billing.basePrice > 0 && (
              <span className="text-sm text-muted-foreground">/月</span>
            )}
          </div>
        </div>
        
        {/* 质量指标 */}
        <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <span>设置难度:</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "text-yellow-500",
                    i < provider.metrics.setupComplexity ? "opacity-100" : "opacity-20"
                  )}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          {provider.metrics.communityRating && (
            <div className="flex items-center gap-1">
              <span>评分:</span>
              <span className="font-medium">{provider.metrics.communityRating}/5</span>
            </div>
          )}
        </div>
        
        {/* 操作按钮 */}
        <div className="flex gap-2">
          <Button 
            className="flex-1"
            onClick={() => onAddToCalculator(provider.id, lowestPricePlan.id)}
          >
            加入估算
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/service/${provider.id}`}>
              详情
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}