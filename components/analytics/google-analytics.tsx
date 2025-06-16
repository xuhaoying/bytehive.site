'use client';

import Script from 'next/script';

interface GoogleAnalyticsProps {
  GA_TRACKING_ID: string;
}

export default function GoogleAnalytics({ GA_TRACKING_ID }: GoogleAnalyticsProps) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </Script>
    </>
  );
}

// Hook for tracking events
export const useGoogleAnalytics = (GA_TRACKING_ID: string) => {
  const trackEvent = (
    action: string,
    category: string,
    label?: string,
    value?: number
  ) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  };

  const trackPageView = (url: string, title?: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', GA_TRACKING_ID, {
        page_path: url,
        page_title: title,
      });
    }
  };

  const trackToolView = (toolName: string, category: string) => {
    trackEvent('view_item', 'tool', `${toolName} - ${category}`);
  };

  const trackToolClick = (toolName: string, category: string, action: 'visit_website' | 'view_details') => {
    trackEvent(action, 'tool_interaction', `${toolName} - ${category}`);
  };

  const trackSearch = (searchTerm: string, resultsCount: number) => {
    trackEvent('search', 'tools', searchTerm, resultsCount);
  };

  const trackCategoryView = (categoryName: string) => {
    trackEvent('view_category', 'navigation', categoryName);
  };

  const trackSubmission = (toolName: string) => {
    trackEvent('submit_tool', 'engagement', toolName);
  };

  return {
    trackEvent,
    trackPageView,
    trackToolView,
    trackToolClick,
    trackSearch,
    trackCategoryView,
    trackSubmission,
  };
};

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'set' | 'event',
      targetId: string,
      config?: any
    ) => void;
  }
}