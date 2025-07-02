import categoriesData from '@/data/categories/index.json';
import { ServiceCategory } from '@/types/infrastructure';
import { getProvidersByCategory } from './providers';

export interface Category {
  id: string;
  name: string;
  displayName: string;
  icon: string;
  description: string;
  subcategories?: {
    id: string;
    name: string;
    description: string;
  }[];
}

// 获取所有分类
export function getAllCategories(): Category[] {
  return categoriesData.categories || [];
}

// 获取分类并添加工具数量
export function getCategoriesWithCount(): Array<Category & { count: number }> {
  const categories = getAllCategories();
  
  return categories.map(category => ({
    ...category,
    count: getProvidersByCategory(category.id).length
  }));
}

// 根据ID获取分类
export function getCategoryById(id: string): Category | undefined {
  const categories = getAllCategories();
  return categories.find(cat => cat.id === id);
}

// 获取子分类
export function getSubcategories(categoryId: string): Array<{ id: string; name: string; description: string }> {
  const category = getCategoryById(categoryId);
  return category?.subcategories || [];
}