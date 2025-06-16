'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Gift, Percent, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AffiliateProgram {
  id: string;
  toolId: string;
  programName: string;
  commissionRate: number;
  commissionType: 'percentage' | 'fixed';
  commissionAmount?: number;
  cookieDuration: number; // in days
  minPayout: number;
  features: string[];
  specialOffer?: {
    discount: number;
    code: string;
    description: string;
    validUntil: string;
  };
  affiliateUrl: string;
  isActive: boolean;
}

interface AffiliateLinkProps {
  tool: {
    id: string;
    name: string;
    website: string;
  };
  className?: string;
  variant?: 'default' | 'secondary' | 'outline';
  showCommission?: boolean;
  trackingId?: string;
}

const mockAffiliatePrograms: AffiliateProgram[] = [
  {
    id: 'vscode-affiliate',
    toolId: 'visual-studio-code',
    programName: 'VS Code Extensions Partner',
    commissionRate: 15,
    commissionType: 'percentage',
    cookieDuration: 30,
    minPayout: 100,
    features: ['代码补全', '插件生态', '免费使用'],
    specialOffer: {
      discount: 20,
      code: 'DEVTOOLS20',
      description: '首月享受20%折扣',
      validUntil: '2024-12-31',
    },
    affiliateUrl: 'https://marketplace.visualstudio.com/vscode?ref=bytehive',
    isActive: true,
  },
  {
    id: 'github-affiliate',
    toolId: 'github',
    programName: 'GitHub Pro Partner',
    commissionRate: 25,
    commissionType: 'percentage',
    cookieDuration: 60,
    minPayout: 50,
    features: ['代码托管', '协作开发', 'CI/CD'],
    specialOffer: {
      discount: 30,
      code: 'GITHUB30',
      description: '年付计划享受30%折扣',
      validUntil: '2024-12-31',
    },
    affiliateUrl: 'https://github.com/pricing?ref=bytehive',
    isActive: true,
  },
  {
    id: 'postman-affiliate',
    toolId: 'postman',
    programName: 'Postman Team Partner',
    commissionRate: 20,
    commissionType: 'percentage',
    cookieDuration: 45,
    minPayout: 75,
    features: ['API测试', '团队协作', '自动化'],
    affiliateUrl: 'https://www.postman.com/pricing?ref=bytehive',
    isActive: true,
  },
];

function useAffiliateProgram(toolId: string) {
  const [program, setProgram] = useState<AffiliateProgram | null>(null);
  
  useEffect(() => {
    const affiliateProgram = mockAffiliatePrograms.find(
      p => p.toolId === toolId && p.isActive
    );
    setProgram(affiliateProgram || null);
  }, [toolId]);
  
  return program;
}

function trackAffiliateClick(programId: string, toolName: string, trackingId?: string) {
  // Track affiliate click for analytics
  console.log(`Affiliate click: ${programId} for ${toolName}`, { trackingId });
  
  // In a real app, send to analytics service
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'affiliate_click', {
      event_category: 'Affiliate',
      event_label: programId,
      tool_name: toolName,
      tracking_id: trackingId,
    });
  }
}

export function AffiliateLink({ 
  tool, 
  className, 
  variant = 'default', 
  showCommission = true,
  trackingId 
}: AffiliateLinkProps) {
  const program = useAffiliateProgram(tool.id);

  if (!program) {
    // Fallback to regular website link
    return (
      <Button
        asChild
        variant={variant}
        className={className}
      >
        <a 
          href={tool.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2"
        >
          访问官网
          <ExternalLink className="h-4 w-4" />
        </a>
      </Button>
    );
  }

  const handleAffiliateClick = () => {
    trackAffiliateClick(program.id, tool.name, trackingId);
    window.open(program.affiliateUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={cn('space-y-3', className)}>
      {/* Special Offer Banner */}
      {program.specialOffer && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50950/30950/30 border border-green-200800 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Gift className="h-4 w-4 text-green-600" />
            <span className="font-medium text-green-800200 text-sm">
              限时优惠
            </span>
            <Badge variant="secondary" className="text-xs">
              {program.specialOffer.discount}% OFF
            </Badge>
          </div>
          <p className="text-sm text-green-700300 mb-2">
            {program.specialOffer.description}
          </p>
          <div className="flex items-center gap-2 text-xs text-green-600400">
            <span className="font-mono bg-green-100900/50 px-2 py-1 rounded">
              {program.specialOffer.code}
            </span>
            <span>•</span>
            <span>有效期至 {new Date(program.specialOffer.validUntil).toLocaleDateString('zh-CN')}</span>
          </div>
        </div>
      )}

      {/* Main CTA Button */}
      <Button
        onClick={handleAffiliateClick}
        variant={variant}
        size="lg"
        className={cn(
          'w-full relative overflow-hidden group',
          variant === 'default' && 'bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70'
        )}
      >
        <div className="flex items-center justify-center gap-2">
          {program.specialOffer && <Gift className="h-4 w-4" />}
          <span>{program.specialOffer ? '立即获取优惠' : '访问官网'}</span>
          <ExternalLink className="h-4 w-4" />
        </div>
        
        {/* Animated background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-1000" />
      </Button>

      {/* Commission Info */}
      {showCommission && (
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Percent className="h-3 w-3" />
            <span>推广合作</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{program.cookieDuration}天追踪</span>
            </div>
            <div className="flex items-center gap-1">
              <Percent className="h-3 w-3" />
              <span>{program.commissionRate}%佣金</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Disclaimer */}
      <p className="text-xs text-muted-foreground text-center">
        * 通过我们的链接购买，您将支持网站运营，且不会增加额外费用
      </p>
    </div>
  );
}

// Component for displaying affiliate program details
export function AffiliateProgramInfo({ toolId }: { toolId: string }) {
  const program = useAffiliateProgram(toolId);

  if (!program) {
    // Show placeholder in development environment
    if (process.env.NODE_ENV === 'development') {
      return (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Percent className="h-6 w-6 text-white" />
            </div>
            <div className="text-sm text-gray-600 font-medium">联盟推广信息</div>
            <div className="text-xs text-gray-500 mt-1">暂无推广计划</div>
          </div>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="bg-muted/30 rounded-lg p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Gift className="h-4 w-4 text-primary" />
        <h4 className="font-medium">合作伙伴计划</h4>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-muted-foreground">佣金比例:</span>
          <div className="font-medium">{program.commissionRate}%</div>
        </div>
        <div>
          <span className="text-muted-foreground">追踪期限:</span>
          <div className="font-medium">{program.cookieDuration}天</div>
        </div>
      </div>
      
      {program.features.length > 0 && (
        <div>
          <span className="text-muted-foreground text-sm">主要特色:</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {program.features.map((feature, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Hook for affiliate analytics
export function useAffiliateAnalytics() {
  const [stats, setStats] = useState({
    totalClicks: 0,
    conversions: 0,
    revenue: 0,
  });

  useEffect(() => {
    // In a real app, fetch from analytics API
    setStats({
      totalClicks: 1250,
      conversions: 89,
      revenue: 2340,
    });
  }, []);

  return stats;
}