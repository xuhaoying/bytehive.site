'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { ADSENSE_CONFIG } from '@/config/adsense';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdSenseProps {
  adSlot: string;
  adFormat?: string;
  adLayout?: string;
  adLayoutKey?: string;
  style?: React.CSSProperties;
  className?: string;
  responsive?: boolean;
}

export function AdSense({
  adSlot,
  adFormat = 'auto',
  adLayout,
  adLayoutKey,
  style,
  className,
  responsive = true
}: AdSenseProps) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  // Show placeholder in development environment
  if (process.env.NODE_ENV === 'development') {
    return (
      <div 
        className={`${className} flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-dashed border-gray-300 rounded-lg`} 
        style={{ minHeight: '250px', ...style }}
      >
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-white text-xl font-bold">AD</span>
          </div>
          <div className="text-sm text-gray-600 font-medium">AdSense 广告位</div>
          <div className="text-xs text-gray-500 mt-1">
            {adFormat === 'horizontal' ? '横幅广告' : 
             adFormat === 'rectangle' ? '矩形广告' : 
             adFormat === 'fluid' ? '信息流广告' : '自适应广告'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client={ADSENSE_CONFIG.client}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-ad-layout={adLayout}
        data-ad-layout-key={adLayoutKey}
        data-full-width-responsive={responsive}
      />
    </div>
  );
}

// AdSense Script Component
export function AdSenseScript() {
  if (!ADSENSE_CONFIG.client || ADSENSE_CONFIG.client === 'ca-pub-XXXXXXXXXX') {
    return null;
  }

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CONFIG.client}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}

// Predefined Ad Components
export function BannerAd({ className }: { className?: string }) {
  return (
    <AdSense
      adSlot={ADSENSE_CONFIG.slots.homeTopBanner}
      adFormat="horizontal"
      className={className}
      style={{ minHeight: '250px' }}
    />
  );
}

export function SidebarAd({ className }: { className?: string }) {
  return (
    <AdSense
      adSlot={ADSENSE_CONFIG.slots.homeSidebar}
      adFormat="rectangle"
      className={className}
      style={{ minHeight: '280px' }}
    />
  );
}

export function InArticleAd({ className }: { className?: string }) {
  return (
    <AdSense
      adSlot={ADSENSE_CONFIG.slots.articleInContent}
      adFormat="fluid"
      adLayout="in-article"
      className={className}
      style={{ minHeight: '200px' }}
    />
  );
}

export function SquareAd({ className }: { className?: string }) {
  return (
    <AdSense
      adSlot={ADSENSE_CONFIG.slots.homeSidebar}
      adFormat="rectangle"
      className={className}
      style={{ minHeight: '250px', minWidth: '250px' }}
    />
  );
}

// Auto Ad Component
export function AutoAd() {
  if (!ADSENSE_CONFIG.client || ADSENSE_CONFIG.client === 'ca-pub-XXXXXXXXXX') {
    return null;
  }

  return (
    <Script
      id="auto-ads"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (adsbygoogle = window.adsbygoogle || []).push({
            google_ad_client: "${ADSENSE_CONFIG.client}",
            enable_page_level_ads: true
          });
        `,
      }}
    />
  );
}