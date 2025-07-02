'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, createContext, useContext } from 'react';
import Script from 'next/script';

// Google Analytics Context
interface GoogleAnalyticsContextType {
  trackEvent: (action: string, category: string, label?: string, value?: number) => void;
  trackPageView: (url: string, title?: string) => void;
  trackToolView: (toolName: string, category: string) => void;
  trackServiceView: (serviceName: string, category: string) => void;
  trackToolClick: (toolName: string, category: string, action: 'visit_website' | 'view_details') => void;
  trackServiceClick: (serviceName: string, category: string, action: 'visit_website' | 'view_details' | 'calculate_cost') => void;
  trackSearch: (searchTerm: string, resultsCount: number, searchType: 'tools' | 'services') => void;
  trackCategoryView: (categoryName: string, categoryType: 'tools' | 'services') => void;
  trackSubmission: (itemName: string, itemType: 'tool' | 'feedback' | 'contact') => void;
  trackLinkClick: (linkText: string, linkUrl: string, linkType: 'external' | 'internal' | 'download') => void;
  trackScrollDepth: (percentage: number, pagePath: string) => void;
  trackTimeOnPage: (seconds: number, pagePath: string) => void;
  trackError: (errorMessage: string, errorLocation: string) => void;
}

const GoogleAnalyticsContext = createContext<GoogleAnalyticsContextType | null>(null);

export const useGoogleAnalytics = () => {
  const context = useContext(GoogleAnalyticsContext);
  if (!context) {
    throw new Error('useGoogleAnalytics must be used within GoogleAnalyticsProvider');
  }
  return context;
};

interface GoogleAnalyticsProviderProps {
  GA_TRACKING_ID: string;
  children: React.ReactNode;
}

export function GoogleAnalyticsProvider({ GA_TRACKING_ID, children }: GoogleAnalyticsProviderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views on route change
  useEffect(() => {
    if (pathname && window.gtag) {
      const url = pathname + (searchParams ? `?${searchParams.toString()}` : '');
      window.gtag('config', GA_TRACKING_ID, {
        page_path: url,
        page_title: document.title,
        page_location: window.location.href,
      });
    }
  }, [pathname, searchParams, GA_TRACKING_ID]);

  // Track Core Web Vitals
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      try {
        // Track Web Vitals if available
        if ('web-vital' in window) {
          const sendWebVital = ({ name, delta, id }: any) => {
            window.gtag('event', name, {
              event_category: 'Web Vitals',
              event_label: id,
              value: Math.round(name === 'CLS' ? delta * 1000 : delta),
              non_interaction: true,
            });
          };
          
          // Listen for web vitals
          ['FCP', 'LCP', 'CLS', 'FID', 'TTFB'].forEach(metric => {
            try {
              (window as any).addEventListener(`web-vital-${metric}`, sendWebVital);
            } catch (e) {
              // Web vitals might not be available
            }
          });
        }
      } catch (error) {
        console.error('Error setting up Web Vitals tracking:', error);
      }
    }
  }, []);

  // Analytics methods
  const trackEvent = (action: string, category: string, label?: string, value?: number) => {
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
        page_title: title || document.title,
        page_location: window.location.origin + url,
      });
    }
  };

  const trackToolView = (toolName: string, category: string) => {
    trackEvent('view_item', 'tool', `${toolName} - ${category}`);
  };

  const trackServiceView = (serviceName: string, category: string) => {
    trackEvent('view_item', 'service', `${serviceName} - ${category}`);
  };

  const trackToolClick = (toolName: string, category: string, action: 'visit_website' | 'view_details') => {
    trackEvent(action, 'tool_interaction', `${toolName} - ${category}`);
  };

  const trackServiceClick = (serviceName: string, category: string, action: 'visit_website' | 'view_details' | 'calculate_cost') => {
    trackEvent(action, 'service_interaction', `${serviceName} - ${category}`);
  };

  const trackSearch = (searchTerm: string, resultsCount: number, searchType: 'tools' | 'services') => {
    trackEvent('search', searchType, searchTerm, resultsCount);
  };

  const trackCategoryView = (categoryName: string, categoryType: 'tools' | 'services') => {
    trackEvent('view_category', categoryType, categoryName);
  };

  const trackSubmission = (itemName: string, itemType: 'tool' | 'feedback' | 'contact') => {
    trackEvent(`submit_${itemType}`, 'engagement', itemName);
  };

  const trackLinkClick = (linkText: string, linkUrl: string, linkType: 'external' | 'internal' | 'download') => {
    trackEvent('click', `link_${linkType}`, `${linkText} - ${linkUrl}`);
  };

  const trackScrollDepth = (percentage: number, pagePath: string) => {
    trackEvent('scroll', 'engagement', pagePath, percentage);
  };

  const trackTimeOnPage = (seconds: number, pagePath: string) => {
    trackEvent('time_on_page', 'engagement', pagePath, seconds);
  };

  const trackError = (errorMessage: string, errorLocation: string) => {
    trackEvent('exception', 'error', `${errorMessage} at ${errorLocation}`);
  };

  const value: GoogleAnalyticsContextType = {
    trackEvent,
    trackPageView,
    trackToolView,
    trackServiceView,
    trackToolClick,
    trackServiceClick,
    trackSearch,
    trackCategoryView,
    trackSubmission,
    trackLinkClick,
    trackScrollDepth,
    trackTimeOnPage,
    trackError,
  };

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
            send_page_view: true
          });
        `}
      </Script>
      <GoogleAnalyticsContext.Provider value={value}>
        {children}
      </GoogleAnalyticsContext.Provider>
    </>
  );
}

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'set' | 'event',
      targetId: string,
      config?: any
    ) => void;
    dataLayer: any[];
  }
}