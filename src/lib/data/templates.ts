import { ProjectTemplate } from '@/types/infrastructure';
import saasTemplate from '@/data/templates/saas.json';

// 缓存所有模板
let templatesCache: ProjectTemplate[] | null = null;

// 加载所有项目模板
export function loadAllTemplates(): ProjectTemplate[] {
  if (templatesCache) {
    return templatesCache;
  }

  const allTemplates: ProjectTemplate[] = [];
  
  // 加载SaaS模板
  if (saasTemplate) {
    allTemplates.push(saasTemplate as ProjectTemplate);
  }
  
  // TODO: 加载其他模板 (blog.json, ecommerce.json, ai.json等)
  
  templatesCache = allTemplates;
  return allTemplates;
}

// 根据ID获取模板
export function getTemplateById(id: string): ProjectTemplate | undefined {
  const templates = loadAllTemplates();
  return templates.find(template => template.id === id);
}

// 根据类别获取模板
export function getTemplatesByCategory(category: string): ProjectTemplate[] {
  const templates = loadAllTemplates();
  return templates.filter(template => template.category === category);
}

// 获取推荐模板（基于预算）
export function getRecommendedTemplates(budget: number): ProjectTemplate[] {
  const templates = loadAllTemplates();
  
  return templates.filter(template => {
    // 选择典型成本在预算范围内的模板
    return template.costEstimate.monthly.typical <= budget;
  }).sort((a, b) => {
    // 按照与预算的匹配度排序
    const diffA = Math.abs(a.costEstimate.monthly.typical - budget * 0.7); // 假设用户想用70%的预算
    const diffB = Math.abs(b.costEstimate.monthly.typical - budget * 0.7);
    return diffA - diffB;
  });
}