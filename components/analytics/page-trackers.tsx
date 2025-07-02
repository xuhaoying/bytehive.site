'use client';

import React, { useEffect } from 'react';
import { useGoogleAnalytics } from './google-analytics-provider';

// Tool page tracker
interface ToolPageTrackerProps {
  toolName: string;
  category: string;
}

export function ToolPageTracker({ toolName, category }: ToolPageTrackerProps) {
  const { trackToolView } = useGoogleAnalytics();

  useEffect(() => {
    trackToolView(toolName, category);
  }, [toolName, category, trackToolView]);

  return null;
}

// Service page tracker
interface ServicePageTrackerProps {
  serviceName: string;
  category: string;
}

export function ServicePageTracker({ serviceName, category }: ServicePageTrackerProps) {
  const { trackServiceView } = useGoogleAnalytics();

  useEffect(() => {
    trackServiceView(serviceName, category);
  }, [serviceName, category, trackServiceView]);

  return null;
}

// Category page tracker
interface CategoryPageTrackerProps {
  categoryName: string;
  categoryType: 'tools' | 'services';
}

export function CategoryPageTracker({ categoryName, categoryType }: CategoryPageTrackerProps) {
  const { trackCategoryView } = useGoogleAnalytics();

  useEffect(() => {
    trackCategoryView(categoryName, categoryType);
  }, [categoryName, categoryType, trackCategoryView]);

  return null;
}

// Blog page tracker
interface BlogPageTrackerProps {
  articleTitle: string;
  category?: string;
  author?: string;
}

export function BlogPageTracker({ articleTitle, category, author }: BlogPageTrackerProps) {
  const { trackEvent } = useGoogleAnalytics();

  useEffect(() => {
    trackEvent('view_item', 'blog', articleTitle);
    
    if (category) {
      trackEvent('view_category', 'blog', category);
    }
    
    if (author) {
      trackEvent('view_author', 'blog', author);
    }
  }, [articleTitle, category, author, trackEvent]);

  return null;
}

// Search results tracker
interface SearchResultsTrackerProps {
  query: string;
  resultsCount: number;
  searchType?: 'tools' | 'services';
}

export function SearchResultsTracker({ query, resultsCount, searchType = 'tools' }: SearchResultsTrackerProps) {
  const { trackSearch } = useGoogleAnalytics();

  useEffect(() => {
    if (query) {
      trackSearch(query, resultsCount, searchType);
    }
  }, [query, resultsCount, searchType, trackSearch]);

  return null;
}

// Form submission tracker
interface FormSubmissionTrackerProps {
  formName: string;
  formType: 'tool' | 'feedback' | 'contact';
  onSubmit?: () => void;
}

export function useFormSubmissionTracking({ formName, formType, onSubmit }: FormSubmissionTrackerProps) {
  const { trackSubmission } = useGoogleAnalytics();

  const handleSubmit = () => {
    trackSubmission(formName, formType);
    onSubmit?.();
  };

  return { handleSubmit };
}

// Click tracker for CTAs and important buttons
interface ClickTrackerProps {
  children: React.ReactElement;
  eventName: string;
  eventCategory: string;
  eventLabel?: string;
  eventValue?: number;
}

export function ClickTracker({ 
  children, 
  eventName, 
  eventCategory, 
  eventLabel,
  eventValue 
}: ClickTrackerProps) {
  const { trackEvent } = useGoogleAnalytics();

  const handleClick = (e: React.MouseEvent) => {
    trackEvent(eventName, eventCategory, eventLabel, eventValue);
    
    // Call original onClick if exists
    if (children.props.onClick) {
      children.props.onClick(e);
    }
  };

  return (
    <>
      {React.cloneElement(children, {
        onClick: handleClick
      })}
    </>
  );
}

// Enhanced link tracker for specific links
interface LinkTrackerProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  trackingLabel?: string;
  isExternal?: boolean;
}

export function TrackedLink({ 
  href, 
  children, 
  className,
  trackingLabel,
  isExternal = false 
}: LinkTrackerProps) {
  const { trackLinkClick } = useGoogleAnalytics();

  const handleClick = () => {
    trackLinkClick(
      trackingLabel || (typeof children === 'string' ? children : href),
      href,
      isExternal ? 'external' : 'internal'
    );
  };

  const linkProps = isExternal ? {
    target: '_blank',
    rel: 'noopener noreferrer'
  } : {};

  return (
    <a
      href={href}
      className={className}
      onClick={handleClick}
      {...linkProps}
    >
      {children}
    </a>
  );
}

// Cost calculator tracker
interface CostCalculatorTrackerProps {
  serviceName: string;
  planName: string;
  estimatedCost: number;
}

export function useCostCalculatorTracking() {
  const { trackEvent } = useGoogleAnalytics();

  const trackCalculation = ({ serviceName, planName, estimatedCost }: CostCalculatorTrackerProps) => {
    trackEvent('calculate_cost', 'calculator', `${serviceName} - ${planName}`, Math.round(estimatedCost));
  };

  const trackPlanChange = (serviceName: string, fromPlan: string, toPlan: string) => {
    trackEvent('change_plan', 'calculator', `${serviceName}: ${fromPlan} → ${toPlan}`);
  };

  const trackFeatureToggle = (serviceName: string, featureName: string, enabled: boolean) => {
    trackEvent(
      'toggle_feature', 
      'calculator', 
      `${serviceName}: ${featureName}`,
      enabled ? 1 : 0
    );
  };

  return {
    trackCalculation,
    trackPlanChange,
    trackFeatureToggle
  };
}