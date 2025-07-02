import { Provider, ServiceCategory } from '@/types/infrastructure';
import hostingData from '@/data/providers/hosting.json';
import databaseData from '@/data/providers/database.json';
import serverlessData from '@/data/providers/serverless.json';
import emailData from '@/data/providers/email.json';
import storageData from '@/data/providers/storage.json';
import monitoringData from '@/data/providers/monitoring.json';

// 缓存所有providers (强制清除缓存进行调试)
let providersCache: Provider[] | null = null;

// 加载所有providers
export function loadAllProviders(): Provider[] {
  if (providersCache) {
    return providersCache;
  }

  const allProviders: Provider[] = [];
  
  // 加载hosting providers
  if (hostingData && hostingData.providers) {
    allProviders.push(...hostingData.providers as Provider[]);
  }
  
  // 加载database providers
  if (databaseData && databaseData.providers) {
    allProviders.push(...databaseData.providers as Provider[]);
  }
  
  // 加载serverless providers
  if (serverlessData && serverlessData.providers) {
    allProviders.push(...serverlessData.providers as any[]);
  }
  
  // 加载email providers
  if (emailData && emailData.providers) {
    allProviders.push(...emailData.providers as any[]);
  }
  
  // 加载storage providers
  if (storageData && storageData.providers) {
    allProviders.push(...storageData.providers as any[]);
  }
  
  // 加载monitoring providers
  if (monitoringData && monitoringData.providers) {
    allProviders.push(...monitoringData.providers as any[]);
  }
  
  providersCache = allProviders;
  return allProviders;
}

// 根据分类获取providers
export function getProvidersByCategory(category: ServiceCategory | string): Provider[] {
  const allProviders = loadAllProviders();
  return allProviders.filter(provider => provider.category === category);
}

// 根据ID获取单个provider
export function getProviderById(id: string): Provider | undefined {
  const allProviders = loadAllProviders();
  return allProviders.find(provider => provider.id === id);
}

// 搜索providers
export function searchProviders(query: string): Provider[] {
  if (!query || query.trim() === '') {
    return loadAllProviders();
  }
  
  const searchTerm = query.toLowerCase();
  const allProviders = loadAllProviders();
  
  return allProviders.filter(provider => {
    return (
      provider.name.toLowerCase().includes(searchTerm) ||
      provider.displayName.toLowerCase().includes(searchTerm) ||
      provider.description.toLowerCase().includes(searchTerm) ||
      provider.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      (provider.searchKeywords && provider.searchKeywords.some(keyword => 
        keyword.toLowerCase().includes(searchTerm)
      ))
    );
  });
}

// 根据筛选条件过滤providers
export interface ProviderFilter {
  categories?: ServiceCategory[];
  hasFreeTier?: boolean;
  priceRange?: [number, number];
  tags?: string[];
}

export function filterProviders(filter: ProviderFilter): Provider[] {
  let providers = loadAllProviders();
  
  // 按分类筛选
  if (filter.categories && filter.categories.length > 0) {
    providers = providers.filter(p => 
      filter.categories!.includes(p.category as ServiceCategory)
    );
  }
  
  // 按免费层筛选
  if (filter.hasFreeTier) {
    providers = providers.filter(p => 
      p.plans.some(plan => plan.billing.basePrice === 0)
    );
  }
  
  // 按价格范围筛选
  if (filter.priceRange) {
    const [min, max] = filter.priceRange;
    providers = providers.filter(p => {
      const minPrice = Math.min(...p.plans.map(plan => plan.billing.basePrice));
      return minPrice >= min && minPrice <= max;
    });
  }
  
  // 按标签筛选
  if (filter.tags && filter.tags.length > 0) {
    providers = providers.filter(p => 
      filter.tags!.some(tag => p.tags.includes(tag))
    );
  }
  
  return providers;
}

// 获取推荐的providers
export function getRecommendedProviders(category?: ServiceCategory): Provider[] {
  let providers = category 
    ? getProvidersByCategory(category)
    : loadAllProviders();
    
  // 按社区评分和可靠性排序
  return providers
    .filter(p => p.metrics.communityRating && p.metrics.communityRating >= 4.5)
    .sort((a, b) => {
      const scoreA = (a.metrics.communityRating || 0) * 0.5 + 
                     (a.metrics.reliabilityScore / 100) * 0.5;
      const scoreB = (b.metrics.communityRating || 0) * 0.5 + 
                     (b.metrics.reliabilityScore / 100) * 0.5;
      return scoreB - scoreA;
    })
    .slice(0, 6);
}