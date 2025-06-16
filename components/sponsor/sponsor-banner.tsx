'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { ExternalLink, X, Star, Users, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Sponsor {
  id: string;
  name: string;
  description: string;
  logo: string;
  website: string;
  category: string;
  pricing: 'Free' | 'Freemium' | 'Paid';
  featured: boolean;
  startDate: string;
  endDate: string;
  position: 'banner' | 'sidebar' | 'featured' | 'newsletter';
  clickCount: number;
  impressionCount: number;
  sponsorshipTier: 'bronze' | 'silver' | 'gold' | 'platinum';
}

interface SponsorBannerProps {
  position: 'banner' | 'sidebar' | 'featured';
  className?: string;
  maxSponsors?: number;
}

const mockSponsors: Sponsor[] = [
  {
    id: '1',
    name: 'CodeMaster Pro',
    description: '专业代码编辑器，提升开发效率300%',
    logo: '/icons/code-editor.svg',
    website: 'https://example.com/codemaster',
    category: 'development',
    pricing: 'Freemium',
    featured: true,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    position: 'banner',
    clickCount: 1250,
    impressionCount: 50000,
    sponsorshipTier: 'platinum',
  },
  {
    id: '2',
    name: 'AI Design Studio',
    description: 'AI驱动的设计工具，创造无限可能',
    logo: '/icons/design-tool.svg',
    website: 'https://example.com/aidesign',
    category: 'design',
    pricing: 'Paid',
    featured: true,
    startDate: '2024-01-01',
    endDate: '2024-06-30',
    position: 'sidebar',
    clickCount: 890,
    impressionCount: 35000,
    sponsorshipTier: 'gold',
  },
  {
    id: '3',
    name: 'CloudOps Manager',
    description: '云端运维管理平台，简化DevOps流程',
    logo: '/icons/cloud-ops.svg',
    website: 'https://example.com/cloudops',
    category: 'deployment',
    pricing: 'Freemium',
    featured: false,
    startDate: '2024-02-01',
    endDate: '2024-08-31',
    position: 'featured',
    clickCount: 650,
    impressionCount: 25000,
    sponsorshipTier: 'silver',
  },
];

function SponsorCard({ sponsor, compact = false, onClose }: { sponsor: Sponsor; compact?: boolean; onClose?: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClick = () => {
    // Track click analytics
    console.log(`Sponsor clicked: ${sponsor.name}`);
    
    // Open sponsor website
    window.open(sponsor.website, '_blank', 'noopener,noreferrer');
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
    onClose?.();
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'platinum':
        return 'border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50';
      case 'gold':
        return 'border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50';
      case 'silver':
        return 'border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50';
      case 'bronze':
        return 'border-orange-200 bg-gradient-to-r from-orange-50 to-red-50';
      default:
        return 'border-border bg-card';
    }
  };

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'platinum':
        return <Badge className="bg-purple-100 text-purple-700">白金赞助商</Badge>;
      case 'gold':
        return <Badge className="bg-amber-100 text-amber-700">黄金赞助商</Badge>;
      case 'silver':
        return <Badge className="bg-gray-100 text-gray-700">银牌赞助商</Badge>;
      case 'bronze':
        return <Badge className="bg-orange-100 text-orange-700">铜牌赞助商</Badge>;
      default:
        return <Badge variant="outline">赞助商</Badge>;
    }
  };

  if (!isVisible) return null;

  if (compact) {
    return (
      <div 
        className={cn(
          'relative p-3 rounded-lg border cursor-pointer hover:shadow-md transition-all group',
          getTierColor(sponsor.sponsorshipTier)
        )}
        onClick={handleClick}
      >
        <div className="flex items-center gap-3">
          <OptimizedImage
            src={sponsor.logo}
            alt={`${sponsor.name} logo`}
            width={40}
            height={40}
            className="rounded-lg flex-shrink-0"
            loading="lazy"
            fallback="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iOCIgZmlsbD0iIzk0YTNiOCIvPgo8L3N2Zz4K"
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm line-clamp-1">{sponsor.name}</h4>
            <p className="text-xs text-muted-foreground line-clamp-1">{sponsor.description}</p>
          </div>
          <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-foreground" />
        </div>
        
        {onClose && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleClose}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
    );
  }

  return (
    <Card 
      className={cn(
        'relative cursor-pointer hover:shadow-lg transition-all group overflow-hidden',
        getTierColor(sponsor.sponsorshipTier)
      )}
      onClick={handleClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <OptimizedImage
            src={sponsor.logo}
            alt={`${sponsor.name} logo`}
            width={60}
            height={60}
            className="rounded-xl flex-shrink-0"
            loading="lazy"
            fallback="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiByeD0iMTIiIGZpbGw9IiM5NGEzYjgiLz4KPC9zdmc+Cg=="
          />
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-lg">{sponsor.name}</h3>
              {getTierBadge(sponsor.sponsorshipTier)}
            </div>
            <p className="text-muted-foreground mb-4 line-clamp-2">{sponsor.description}</p>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{sponsor.impressionCount.toLocaleString()} 次展示</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                <span>{sponsor.clickCount} 次点击</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3" />
                <span>{sponsor.pricing === 'Free' ? '免费' : sponsor.pricing === 'Freemium' ? '免费试用' : '付费'}</span>
              </div>
            </div>
            
            <Button className="group-hover:shadow-md transition-all">
              访问官网
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
        
        {onClose && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export function SponsorBanner({ position, className, maxSponsors = 3 }: SponsorBannerProps) {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);

  useEffect(() => {
    // In a real app, this would fetch from an API
    const activeSponsors = mockSponsors
      .filter(sponsor => {
        const now = new Date();
        const start = new Date(sponsor.startDate);
        const end = new Date(sponsor.endDate);
        return sponsor.position === position && now >= start && now <= end;
      })
      .sort((a, b) => {
        // Sort by tier (platinum > gold > silver > bronze)
        const tierOrder = { platinum: 4, gold: 3, silver: 2, bronze: 1 };
        return tierOrder[b.sponsorshipTier] - tierOrder[a.sponsorshipTier];
      })
      .slice(0, maxSponsors);
    
    setSponsors(activeSponsors);
  }, [position, maxSponsors]);

  const handleCloseSponsor = (sponsorId: string) => {
    setSponsors(prev => prev.filter(s => s.id !== sponsorId));
  };

  if (sponsors.length === 0) {
    // Show placeholder in development environment
    if (process.env.NODE_ENV === 'development') {
      return (
        <div className={cn('space-y-3', className)}>
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm text-muted-foreground">赞助商推荐</h3>
            <Badge variant="outline" className="text-xs">广告</Badge>
          </div>
          <Card className="cursor-pointer hover:shadow-lg transition-all border-dashed border-2 border-gray-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">AD</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm text-gray-600">赞助商广告位</h4>
                  <p className="text-xs text-gray-500">
                    {position === 'sidebar' ? '侧边栏推广位' : 
                     position === 'banner' ? '横幅广告位' : '精选推广位'}
                  </p>
                </div>
                <ExternalLink className="h-3 w-3 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }
    return null;
  }

  if (position === 'sidebar') {
    return (
      <div className={cn('space-y-3', className)}>
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-sm text-muted-foreground">赞助商推荐</h3>
          <Badge variant="outline" className="text-xs">广告</Badge>
        </div>
        {sponsors.map((sponsor) => (
          <SponsorCard 
            key={sponsor.id} 
            sponsor={sponsor} 
            compact 
            onClose={() => handleCloseSponsor(sponsor.id)}
          />
        ))}
      </div>
    );
  }

  if (position === 'banner') {
    return (
      <div className={cn('space-y-4', className)}>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">赞助商推荐</h2>
          <Badge variant="outline">广告</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sponsors.map((sponsor) => (
            <SponsorCard 
              key={sponsor.id} 
              sponsor={sponsor} 
              onClose={() => handleCloseSponsor(sponsor.id)}
            />
          ))}
        </div>
      </div>
    );
  }

  if (position === 'featured') {
    return (
      <div className={cn('space-y-4', className)}>
        {sponsors.map((sponsor) => (
          <SponsorCard 
            key={sponsor.id} 
            sponsor={sponsor} 
            onClose={() => handleCloseSponsor(sponsor.id)}
          />
        ))}
      </div>
    );
  }

  return null;
}

// Hook for sponsor analytics
export function useSponsorAnalytics() {
  const trackImpression = (sponsorId: string, position: string) => {
    console.log(`Sponsor impression: ${sponsorId} at ${position}`);
    // In a real app, send to analytics service
  };

  const trackClick = (sponsorId: string, position: string) => {
    console.log(`Sponsor click: ${sponsorId} at ${position}`);
    // In a real app, send to analytics service
  };

  return {
    trackImpression,
    trackClick,
  };
}