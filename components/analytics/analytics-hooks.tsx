'use client';

import { useEffect, useRef } from 'react';
import { useGoogleAnalytics } from './google-analytics-provider';

// Hook to track scroll depth
export function useScrollDepthTracking() {
  const { trackScrollDepth } = useGoogleAnalytics();
  const hasTracked = useRef<Set<number>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.scrollY;
      const scrollPercentage = Math.round((scrollTop / documentHeight) * 100);

      // Track at 25%, 50%, 75%, and 100%
      const milestones = [25, 50, 75, 100];
      
      milestones.forEach(milestone => {
        if (scrollPercentage >= milestone && !hasTracked.current.has(milestone)) {
          hasTracked.current.add(milestone);
          trackScrollDepth(milestone, window.location.pathname);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [trackScrollDepth]);
}

// Hook to track time on page
export function useTimeOnPageTracking() {
  const { trackTimeOnPage } = useGoogleAnalytics();
  const startTime = useRef<number>(Date.now());
  const lastTracked = useRef<number>(0);

  useEffect(() => {
    const trackTime = () => {
      const timeOnPage = Math.round((Date.now() - startTime.current) / 1000);
      
      // Track at 10s, 30s, 60s, 180s, 300s
      const milestones = [10, 30, 60, 180, 300];
      
      milestones.forEach(milestone => {
        if (timeOnPage >= milestone && lastTracked.current < milestone) {
          lastTracked.current = milestone;
          trackTimeOnPage(milestone, window.location.pathname);
        }
      });
    };

    const interval = setInterval(trackTime, 5000); // Check every 5 seconds

    return () => {
      clearInterval(interval);
      // Track final time when leaving
      const finalTime = Math.round((Date.now() - startTime.current) / 1000);
      if (finalTime > 5) {
        trackTimeOnPage(finalTime, window.location.pathname);
      }
    };
  }, [trackTimeOnPage]);
}

// Hook to track external link clicks
export function useExternalLinkTracking() {
  const { trackLinkClick } = useGoogleAnalytics();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.href) {
        const url = new URL(link.href);
        const currentHost = window.location.hostname;
        
        // Track external links
        if (url.hostname !== currentHost && !url.hostname.includes('bytehive')) {
          trackLinkClick(
            link.textContent || 'Unknown',
            link.href,
            'external'
          );
        }
        // Track download links
        else if (link.download || url.pathname.match(/\.(pdf|zip|doc|docx|xls|xlsx)$/i)) {
          trackLinkClick(
            link.textContent || 'Unknown',
            link.href,
            'download'
          );
        }
      }
    };

    document.addEventListener('click', handleClick);
    
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [trackLinkClick]);
}

// Hook to track search interactions
export function useSearchTracking() {
  const { trackSearch } = useGoogleAnalytics();

  const trackSearchEvent = (query: string, results: number, type: 'tools' | 'services' = 'tools') => {
    if (query && query.length > 0) {
      trackSearch(query, results, type);
    }
  };

  return { trackSearchEvent };
}

// Hook to track errors
export function useErrorTracking() {
  const { trackError } = useGoogleAnalytics();

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      trackError(
        event.message,
        `${event.filename}:${event.lineno}:${event.colno}`
      );
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      trackError(
        event.reason?.toString() || 'Unknown promise rejection',
        'Promise rejection'
      );
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, [trackError]);
}

// Component to use all tracking hooks
export function PageAnalytics() {
  useScrollDepthTracking();
  useTimeOnPageTracking();
  useExternalLinkTracking();
  useErrorTracking();
  
  return null;
}