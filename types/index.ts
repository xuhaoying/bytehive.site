export type ToolCategory = 
  | 'deployment'
  | 'development' 
  | 'ai-tools'
  | 'design'
  | 'marketing'
  | 'database'
  | 'monitoring'
  | 'learning';

export type PaymentModel = 
  | 'Free' 
  | 'Freemium' 
  | 'Paid' 
  | 'Open Source';

export type Tool = {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  website: string;
  logo?: string;
  category: ToolCategory;
  subcategory?: string;
  tags: string[];
  pricing: PaymentModel;
  features?: string[];
  platforms?: string[];
  techStack?: string[];
  popularity: number; // 1-100
  lastUpdated?: string;
};

// Keep AITool for backward compatibility
export type AITool = Tool;

export type FilterState = {
  categories: ToolCategory[];
  paymentModels: PaymentModel[];
  searchQuery: string;
  minPopularity?: number;
};

export type CategoryInfo = {
  slug: ToolCategory;
  name: string;
  description: string;
  icon: string;
  color: string;
  subcategories?: SubCategory[];
  toolCount: number;
  featured: string[];
};

export type SubCategory = {
  slug: string;
  name: string;
  count: number;
};