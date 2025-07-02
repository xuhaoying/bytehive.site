'use client';

import { useGoogleAnalytics } from './google-analytics-provider';
import { ClickTracker } from './page-trackers';

// 跟踪的按钮组件
interface TrackedButtonProps {
  children: React.ReactNode;
  eventName: string;
  eventLabel?: string;
  onClick?: () => void;
  className?: string;
  variant?: any;
  size?: any;
  disabled?: boolean;
}

export function TrackedButton({ 
  children, 
  eventName, 
  eventLabel,
  onClick,
  ...props 
}: TrackedButtonProps) {
  const { trackEvent } = useGoogleAnalytics();

  const handleClick = () => {
    trackEvent(eventName, 'button_click', eventLabel);
    onClick?.();
  };

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  );
}

// 跟踪的卡片点击
interface TrackedCardProps {
  children: React.ReactNode;
  itemName: string;
  itemType: 'tool' | 'service' | 'category';
  onClick?: () => void;
  className?: string;
}

export function TrackedCard({ 
  children, 
  itemName, 
  itemType,
  onClick,
  className 
}: TrackedCardProps) {
  const { trackEvent } = useGoogleAnalytics();

  const handleClick = () => {
    trackEvent('click_card', itemType, itemName);
    onClick?.();
  };

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
}

// 跟踪的服务卡片交互
interface ServiceCardTrackerProps {
  serviceName: string;
  serviceCategory: string;
  action: 'view' | 'click' | 'calculate';
}

export function useServiceCardTracking() {
  const { trackServiceClick } = useGoogleAnalytics();

  const trackServiceView = (serviceName: string, category: string) => {
    trackServiceClick(serviceName, category, 'view_details');
  };

  const trackServiceWebsite = (serviceName: string, category: string) => {
    trackServiceClick(serviceName, category, 'visit_website');
  };

  const trackServiceCalculate = (serviceName: string, category: string) => {
    trackServiceClick(serviceName, category, 'calculate_cost');
  };

  return {
    trackServiceView,
    trackServiceWebsite,
    trackServiceCalculate,
  };
}

// 跟踪的工具卡片交互
export function useToolCardTracking() {
  const { trackToolClick } = useGoogleAnalytics();

  const trackToolView = (toolName: string, category: string) => {
    trackToolClick(toolName, category, 'view_details');
  };

  const trackToolWebsite = (toolName: string, category: string) => {
    trackToolClick(toolName, category, 'visit_website');
  };

  return {
    trackToolView,
    trackToolWebsite,
  };
}

// 跟踪的选项卡切换
interface TabTrackerProps {
  tabName: string;
  tabGroup: string;
}

export function useTabTracking() {
  const { trackEvent } = useGoogleAnalytics();

  const trackTabChange = ({ tabName, tabGroup }: TabTrackerProps) => {
    trackEvent('tab_change', tabGroup, tabName);
  };

  return { trackTabChange };
}

// 跟踪的筛选器
interface FilterTrackerProps {
  filterType: string;
  filterValue: string;
  filterGroup: string;
}

export function useFilterTracking() {
  const { trackEvent } = useGoogleAnalytics();

  const trackFilterChange = ({ filterType, filterValue, filterGroup }: FilterTrackerProps) => {
    trackEvent('filter_change', filterGroup, `${filterType}: ${filterValue}`);
  };

  const trackFilterReset = (filterGroup: string) => {
    trackEvent('filter_reset', filterGroup);
  };

  return { trackFilterChange, trackFilterReset };
}

// 跟踪的分页
export function usePaginationTracking() {
  const { trackEvent } = useGoogleAnalytics();

  const trackPageChange = (pageNumber: number, section: string) => {
    trackEvent('pagination', section, `page_${pageNumber}`);
  };

  const trackPageSizeChange = (pageSize: number, section: string) => {
    trackEvent('page_size_change', section, `size_${pageSize}`);
  };

  return { trackPageChange, trackPageSizeChange };
}

// 跟踪的模态框
export function useModalTracking() {
  const { trackEvent } = useGoogleAnalytics();

  const trackModalOpen = (modalName: string) => {
    trackEvent('modal_open', 'ui_interaction', modalName);
  };

  const trackModalClose = (modalName: string) => {
    trackEvent('modal_close', 'ui_interaction', modalName);
  };

  return { trackModalOpen, trackModalClose };
}

// 跟踪的复制操作
export function useCopyTracking() {
  const { trackEvent } = useGoogleAnalytics();

  const trackCopy = (content: string, contentType: string) => {
    trackEvent('copy', contentType, content.substring(0, 50)); // 只记录前50个字符
  };

  return { trackCopy };
}

// 跟踪的分享操作
export function useShareTracking() {
  const { trackEvent } = useGoogleAnalytics();

  const trackShare = (platform: string, contentType: string, contentId: string) => {
    trackEvent('share', platform, `${contentType}: ${contentId}`);
  };

  return { trackShare };
}