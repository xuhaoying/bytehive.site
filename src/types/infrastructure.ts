// 服务分类枚举
export enum ServiceCategory {
  HOSTING = 'hosting',
  DATABASE = 'database',
  SERVERLESS = 'serverless',
  EMAIL = 'email',
  STORAGE = 'storage',
  CDN = 'cdn',
  MONITORING = 'monitoring',
  SECURITY = 'security'
}

// 计费类型
export type BillingType = 'fixed' | 'usage' | 'hybrid';
export type BillingCycle = 'monthly' | 'annual';
export type ConfidenceLevel = 'high' | 'medium' | 'low';

// 资源配额
export interface ResourceQuota {
  metric: string;           // 指标名称，如 "bandwidth", "storage"
  amount: number;          // 包含的数量
  unit: string;            // 单位，如 "GB", "hours"
  description?: string;     // 描述说明
}

// 阶梯定价
export interface TieredPricing {
  from: number;            // 起始数量
  to?: number;             // 结束数量（不设置表示无限）
  pricePerUnit: number;    // 单价
}

// 超额计费规则
export interface OverageRule {
  metric: string;                    // 计费指标
  pricePerUnit: number;             // 固定单价
  unit: string;                     // 单位
  tieredPricing?: TieredPricing[];  // 阶梯定价（可选）
}

// 计算器变量
export interface CalculatorVariable {
  name: string;              // 变量名
  label: string;             // 显示标签
  type: 'number' | 'select' | 'slider';
  min?: number;
  max?: number;
  default: number | string;
  options?: Array<{
    value: string | number;
    label: string;
  }>;
  unit?: string;
  helpText?: string;
}

// 定价计划
export interface Plan {
  id: string;
  name: string;
  displayName?: string;
  description?: string;
  billing: {
    type?: BillingType;
    basePrice: number;
    cycle?: BillingCycle;
    billingCycle?: BillingCycle;  // 兼容性字段
    currency?: string;      // 默认 USD
  };
  includedResources: ResourceQuota[];
  overageRules: OverageRule[];
  features?: string[];      // 功能特性列表
  limitations?: string[];   // 限制说明
  calculatorConfig: {
    variables: CalculatorVariable[];
    formula?: string;       // 计算公式（用于复杂计算）
  };
}

// 佣金信息
export interface AffiliateInfo {
  enabled: boolean;
  link?: string;
  commission?: number;      // 佣金比例或固定金额
  commissionType?: 'percentage' | 'fixed';
  trackingMethod?: string;
}

// 质量指标
export interface QualityMetrics {
  setupComplexity: 1 | 2 | 3 | 4 | 5;  // 设置复杂度（1最简单）
  reliabilityScore: number;             // 可靠性评分（0-100）
  communityRating?: number;             // 社区评分（0-5）
  documentationQuality?: 1 | 2 | 3 | 4 | 5;
}

// 数据质量信息
export interface DataQuality {
  version: string;
  lastVerified: string;     // ISO 8601 日期
  confidenceLevel: ConfidenceLevel;
  source?: string;          // 数据来源
  notes?: string;
}

// 服务提供商
export interface Provider {
  // 基本信息
  id: string;
  name: string;
  displayName: string;
  category: ServiceCategory;
  subcategory?: string;
  logoUrl?: string;
  websiteUrl: string;
  description: string;
  
  // 标签和特性
  tags: string[];
  highlights?: string[];    // 主要卖点
  
  // 商业信息
  affiliate: AffiliateInfo;
  
  // 定价计划
  plans: Plan[];
  
  // 质量指标
  metrics: QualityMetrics;
  
  // 数据质量
  dataQuality: DataQuality;
  
  // SEO和搜索
  searchKeywords?: string[];
  alternativeNames?: string[];
}

// 项目模板成本估算
export interface CostEstimate {
  monthly: {
    min: number;
    typical: number;
    max: number;
  };
  setupCost: number;
  scalingFactor: number;    // 扩展成本系数
}

// 推荐选择
export interface RecommendedChoice {
  providerId: string;
  planId: string;
  reasoning: string;
  pros: string[];
  cons: string[];
}

// 替代方案
export interface Alternative {
  providerId: string;
  planId: string;
  scenario: string;         // 适用场景描述
}

// 技术栈项目
export interface StackItem {
  category: ServiceCategory;
  primaryChoice: RecommendedChoice;
  alternatives: Alternative[];
}

// 决策点
export interface DecisionPoint {
  threshold: string;        // 触发条件
  decision: string;         // 决策描述
  options: Array<{
    name: string;
    costImpact: string;
    complexity: string;
  }>;
}

// 项目模板
export interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'startup' | 'enterprise' | 'personal' | 'ai' | 'ecommerce';
  costEstimate: CostEstimate;
  recommendedStack: StackItem[];
  defaultVariables: Record<string, number>;
  decisionPoints: DecisionPoint[];
  targetAudience?: string;
  useCases?: string[];
}

// 成本明细项
export interface CostBreakdownItem {
  providerId: string;
  planId: string;
  baseCost: number;
  usageCost: number;
  totalCost: number;
  percentage: number;
  details?: Record<string, any>;
}

// 成本分解
export interface CostBreakdown {
  monthly: number;
  annual: number;
  setupCosts: number;
  potentialSavings: number;
  breakdown: CostBreakdownItem[];
  warnings?: string[];
}

// 用户选择
export interface Selection {
  providerId: string;
  planId: string;
  variables: Record<string, number>;
  calculatedCost?: number;
  notes?: string;
}

// 成本优化建议
export interface CostOptimization {
  type: 'cost_reduction' | 'performance' | 'scaling';
  target: Selection;
  suggestion: {
    providerId: string;
    planId: string;
    estimatedCost: number;
  };
  savings: number;
  tradeoffs: string[];
  priority: 'high' | 'medium' | 'low';
}

// 扩展建议
export interface ScalingRecommendation {
  timeframe: string;        // "3 months", "6 months"
  trigger: string;          // 触发条件描述
  recommendations: Array<{
    action: string;
    cost: number;
    benefit: string;
  }>;
}

// 技术栈推荐
export interface StackRecommendation {
  category: ServiceCategory;
  primary: RecommendedChoice;
  alternatives: Alternative[];
  reasoning: string;
}

// 过滤器状态
export interface FilterState {
  categories: ServiceCategory[];
  hasFreeTier: boolean;
  priceRange: [number, number];
  regions: string[];
  tags: string[];
  searchQuery?: string;
  setupComplexity?: number[];
}

// 排序选项
export interface SortOption {
  field: 'price' | 'name' | 'rating' | 'complexity';
  direction: 'asc' | 'desc';
}

// 分析报告
export interface AnalysisReport {
  projectName: string;
  createdAt: string;
  selections: Selection[];
  costBreakdown: CostBreakdown;
  optimizations: CostOptimization[];
  scalingPlan?: ScalingRecommendation[];
  exportFormat?: 'pdf' | 'csv' | 'json';
}