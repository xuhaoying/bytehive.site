'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Web Vitals types
interface WebVitalsMetric {
  id: string;
  name: string;
  value: number;
  delta: number;
  entries: PerformanceEntry[];
}

interface WebVitalsConfig {
  reportWebVitals?: boolean;
  debug?: boolean;
}

// Send Web Vitals to analytics
function sendToAnalytics(metric: WebVitalsMetric) {
  // Send to Google Analytics if available
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  }

  // Also log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vitals:', metric);
  }

  // Send to custom analytics endpoint if needed
  // fetch('/api/analytics/web-vitals', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(metric),
  // });
}

// Performance observer for custom metrics
function observePerformance() {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return;
  }

  // Observe navigation timing
  const navigationObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'navigation') {
        const nav = entry as PerformanceNavigationTiming;
        
        // Time to First Byte (TTFB)
        const ttfb = nav.responseStart - nav.requestStart;
        sendToAnalytics({
          id: `ttfb-${Date.now()}`,
          name: 'TTFB',
          value: ttfb,
          delta: ttfb,
          entries: [entry],
        });

        // DOM Content Loaded
        const dcl = nav.domContentLoadedEventEnd - nav.domContentLoadedEventStart;
        sendToAnalytics({
          id: `dcl-${Date.now()}`,
          name: 'DCL',
          value: dcl,
          delta: dcl,
          entries: [entry],
        });
      }
    }
  });

  navigationObserver.observe({ entryTypes: ['navigation'] });

  // Observe resource loading
  const resourceObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'resource') {
        const resource = entry as PerformanceResourceTiming;
        
        // Track slow resources
        if (resource.duration > 1000) {
          sendToAnalytics({
            id: `slow-resource-${Date.now()}`,
            name: 'SlowResource',
            value: resource.duration,
            delta: resource.duration,
            entries: [entry],
          });
        }
      }
    }
  });

  resourceObserver.observe({ entryTypes: ['resource'] });
}

// Component for Web Vitals monitoring
export default function WebVitalsMonitor({ config = {} }: { config?: WebVitalsConfig }) {
  const router = useRouter();

  useEffect(() => {
    if (!config.reportWebVitals) return;

    // Dynamic import of web-vitals library
    import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      // Core Web Vitals
      onCLS(sendToAnalytics);
      onINP(sendToAnalytics); // FID is deprecated, INP is the new metric
      onLCP(sendToAnalytics);
      
      // Other useful metrics
      onFCP(sendToAnalytics);
      onTTFB(sendToAnalytics);
    }).catch((error) => {
      console.warn('Failed to load web-vitals:', error);
    });

    // Custom performance monitoring
    observePerformance();
  }, [config.reportWebVitals]);

  // Track route changes
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // Send page view timing
      if (typeof window !== 'undefined' && window.performance) {
        const navigationStart = window.performance.timeOrigin;
        const now = window.performance.now();
        
        sendToAnalytics({
          id: `route-change-${Date.now()}`,
          name: 'RouteChange',
          value: now,
          delta: now,
          entries: [],
        });
      }
    };

    // Note: In Next.js 13+ App Router, you might need to use a different approach
    // This is a placeholder for route change tracking
    const originalPushState = window.history.pushState;
    window.history.pushState = function(...args) {
      originalPushState.apply(window.history, args);
      handleRouteChange(args[2] as string);
    };

    return () => {
      window.history.pushState = originalPushState;
    };
  }, []);

  return null; // This component doesn't render anything
}

// Hook for manual performance tracking
export function usePerformanceTracking() {
  const markStart = (name: string) => {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.mark(`${name}-start`);
    }
  };

  const markEnd = (name: string) => {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.mark(`${name}-end`);
      window.performance.measure(name, `${name}-start`, `${name}-end`);
      
      const measure = window.performance.getEntriesByName(name, 'measure')[0];
      if (measure) {
        sendToAnalytics({
          id: `custom-${name}-${Date.now()}`,
          name: `Custom_${name}`,
          value: measure.duration,
          delta: measure.duration,
          entries: [measure],
        });
      }
    }
  };

  const timeFunction = async (name: string, fn: () => Promise<any>): Promise<any> => {
    markStart(name);
    try {
      const result = await fn();
      markEnd(name);
      return result;
    } catch (error) {
      markEnd(name);
      throw error;
    }
  };

  return {
    markStart,
    markEnd,
    timeFunction,
  };
}