'use client';

import { useEffect } from 'react';
import Script from 'next/script';

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

  return (
    <div className={className} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXXX" // Replace with your AdSense client ID
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
  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXXX"
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}

// Predefined Ad Components
export function BannerAd({ className }: { className?: string }) {
  return (
    <AdSense
      adSlot="1234567890"
      adFormat="horizontal"
      className={className}
      style={{ minHeight: '250px' }}
    />
  );
}

export function SidebarAd({ className }: { className?: string }) {
  return (
    <AdSense
      adSlot="1234567891"
      adFormat="rectangle"
      className={className}
      style={{ minHeight: '280px' }}
    />
  );
}

export function InArticleAd({ className }: { className?: string }) {
  return (
    <AdSense
      adSlot="1234567892"
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
      adSlot="1234567893"
      adFormat="rectangle"
      className={className}
      style={{ minHeight: '250px', minWidth: '250px' }}
    />
  );
}

// Auto Ad Component
export function AutoAd() {
  return (
    <Script
      id="auto-ads"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (adsbygoogle = window.adsbygoogle || []).push({
            google_ad_client: "ca-pub-XXXXXXXXXXXXXXXXX",
            enable_page_level_ads: true
          });
        `,
      }}
    />
  );
}