import { PaymentModel } from '@/types';

export interface PricingConfig {
  color: string;
  bgColor: string;
  borderColor: string;
  label: string;
  icon?: string;
}

// 统一的价格模型配置
export const PRICING_CONFIGS: Record<PaymentModel, PricingConfig> = {
  'Free': {
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    label: '免费',
    icon: '✨'
  },
  'Freemium': {
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    label: '免费试用',
    icon: '🎯'
  },
  'Paid': {
    color: 'text-cyan-700',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-200',
    label: '付费',
    icon: '💎'
  },
  'Open Source': {
    color: 'text-amber-700',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    label: '开源',
    icon: '🌟'
  }
};

// 获取价格配置
export const getPricingConfig = (model: PaymentModel): PricingConfig => {
  return PRICING_CONFIGS[model] || {
    color: 'text-gray-700',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    label: model,
    icon: '📦'
  };
};

// 获取价格标签的 className
export const getPricingClassName = (model: PaymentModel): string => {
  const config = getPricingConfig(model);
  return `${config.color} ${config.bgColor} ${config.borderColor}`;
};

// 格式化价格显示
export const formatPrice = (price: number | string | undefined, currency: string = '¥'): string => {
  if (!price || price === 0) return '免费';
  
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  if (isNaN(numPrice)) return price as string;
  
  // 格式化数字
  const formatted = new Intl.NumberFormat('zh-CN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(numPrice);
  
  return `${currency}${formatted}`;
};

// 获取价格范围描述
export const getPriceRangeLabel = (minPrice?: number, maxPrice?: number): string => {
  if (!minPrice && !maxPrice) return '免费';
  if (!maxPrice) return `${formatPrice(minPrice)}起`;
  if (minPrice === maxPrice) return formatPrice(minPrice);
  return `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;
};

// 判断是否为付费工具
export const isPaidTool = (model: PaymentModel): boolean => {
  return model === 'Paid' || model === 'Freemium';
};

// 获取价格等级
export const getPriceTier = (price: number): 'free' | 'low' | 'medium' | 'high' | 'enterprise' => {
  if (price === 0) return 'free';
  if (price < 10) return 'low';
  if (price < 50) return 'medium';
  if (price < 200) return 'high';
  return 'enterprise';
};