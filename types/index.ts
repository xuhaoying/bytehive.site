export type ToolCategory = 
  | 'Text' 
  | 'Image' 
  | 'Video' 
  | 'Audio' 
  | 'Code' 
  | 'Data' 
  | 'Business' 
  | 'Education'
  | 'Productivity'
  | 'Other';

export type PaymentModel = 
  | 'Free' 
  | 'Freemium' 
  | 'Paid' 
  | 'Open Source';

export type AITool = {
  id: string;
  name: string;
  description: string;
  shortEvaluation: string[];
  url: string;
  categories: ToolCategory[];
  paymentModel: PaymentModel;
  popularity: number; // 1-5, 5 being the most popular
  logoUrl?: string;
  tags?: string[];
};

export type FilterState = {
  categories: ToolCategory[];
  paymentModels: PaymentModel[];
  searchQuery: string;
  minPopularity?: number;
};