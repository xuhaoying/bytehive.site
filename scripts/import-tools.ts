/**
 * 工具数据导入脚本
 * 基于用户提供的320个工具清单，帮助批量导入工具数据
 */

interface ToolImportData {
  name: string;
  website: string;
  description: string;
  longDescription: string;
  pricing: 'Free' | 'Freemium' | 'Paid' | 'Open Source';
  features: string[];
  tags: string[];
  popularity: number;
  category: string;
  subcategory: string;
}

// 环境部署工具 - 基于用户清单的前20个工具
export const deploymentTools: ToolImportData[] = [
  {
    name: 'Microsoft Azure',
    website: 'https://azure.microsoft.com',
    description: '微软的企业级云平台，与Microsoft生态系统深度集成',
    longDescription: 'Microsoft Azure是微软的企业级云平台，与Office 365无缝集成、强大的企业服务、混合云支持',
    pricing: 'Paid',
    features: ['与Office 365集成', '企业服务', '混合云支持', 'AI/ML服务'],
    tags: ['云计算', '微软', '企业级', '混合云'],
    popularity: 92,
    category: 'deployment',
    subcategory: 'cloud-servers'
  },
  {
    name: 'Google Cloud Platform',
    website: 'https://cloud.google.com',
    description: 'Google的云计算服务，在机器学习和数据分析方面领先',
    longDescription: 'Google Cloud Platform专注于AI/ML服务、高性能网络、开发者友好的工具',
    pricing: 'Paid',
    features: ['AI/ML服务', '高性能网络', '开发者工具', 'Kubernetes原生'],
    tags: ['云计算', 'Google', 'AI/ML', '数据分析'],
    popularity: 90,
    category: 'deployment',
    subcategory: 'cloud-servers'
  },
  {
    name: 'Vultr',
    website: 'https://www.vultr.com',
    description: '高性能SSD云服务器，全球多地部署',
    longDescription: 'Vultr提供高性能SSD存储、全球数据中心、灵活定价',
    pricing: 'Paid',
    features: ['高性能SSD', '全球数据中心', '按小时计费', '灵活配置'],
    tags: ['云服务器', '高性能', 'SSD', '全球部署'],
    popularity: 82,
    category: 'deployment',
    subcategory: 'cloud-servers'
  },
  {
    name: 'Railway',
    website: 'https://railway.app',
    description: '现代化应用部署平台',
    longDescription: 'Railway提供现代UI、数据库一键部署、环境管理',
    pricing: 'Freemium',
    features: ['现代UI', '数据库部署', '环境管理', 'Git集成'],
    tags: ['现代化', '应用部署', '数据库', '开发者友好'],
    popularity: 78,
    category: 'deployment',
    subcategory: 'hosting'
  },
  {
    name: 'Render',
    website: 'https://render.com',
    description: '云原生应用部署平台',
    longDescription: 'Render提供自动SSL、Git集成、后台服务支持',
    pricing: 'Freemium',
    features: ['自动SSL', 'Git集成', '后台服务', '静态网站'],
    tags: ['云原生', '自动SSL', 'Git集成', '现代部署'],
    popularity: 76,
    category: 'deployment',
    subcategory: 'hosting'
  }
];

// AI工具 - 基于用户清单的额外工具
export const additionalAITools: ToolImportData[] = [
  {
    name: 'TensorFlow',
    website: 'https://tensorflow.org',
    description: 'Google开源的端到端机器学习平台',
    longDescription: 'TensorFlow提供完整的ML生态系统、支持从移动到分布式部署、强大的可视化工具TensorBoard',
    pricing: 'Open Source',
    features: ['端到端ML平台', '多平台部署', 'TensorBoard', '生态系统'],
    tags: ['机器学习', 'Google', '开源', '深度学习'],
    popularity: 92,
    category: 'ai-tools',
    subcategory: 'ml-tools'
  },
  {
    name: 'PyTorch',
    website: 'https://pytorch.org',
    description: 'Facebook开源的深度学习框架，支持动态计算图',
    longDescription: 'PyTorch提供动态计算图、Python原生支持、强大的研究社区',
    pricing: 'Open Source',
    features: ['动态计算图', 'Python原生', '研究社区', '灵活框架'],
    tags: ['深度学习', 'Facebook', '开源', '研究'],
    popularity: 90,
    category: 'ai-tools',
    subcategory: 'ml-tools'
  },
  {
    name: 'Hugging Face',
    website: 'https://huggingface.co',
    description: '开源机器学习模型平台',
    longDescription: 'Hugging Face提供模型库、数据集、协作工具',
    pricing: 'Freemium',
    features: ['模型库', '数据集', '协作工具', 'Transformers'],
    tags: ['模型平台', '开源', 'Transformers', 'NLP'],
    popularity: 88,
    category: 'ai-tools',
    subcategory: 'ml-tools'
  },
  {
    name: 'Adobe Firefly',
    website: 'https://firefly.adobe.com',
    description: 'Adobe的AI创意工具套件',
    longDescription: 'Adobe Firefly与Adobe工具集成、商业安全、专业工作流',
    pricing: 'Paid',
    features: ['Adobe集成', '商业安全', '专业工作流', 'AI创意'],
    tags: ['Adobe', 'AI创意', '商业安全', '专业'],
    popularity: 85,
    category: 'ai-tools',
    subcategory: 'content-generation'
  }
];

// 设计工具 - 基于用户清单的额外工具
export const additionalDesignTools: ToolImportData[] = [
  {
    name: 'GIMP',
    website: 'https://gimp.org',
    description: '免费开源的图像编辑器',
    longDescription: 'GIMP是开源、可定制、专业功能的图像编辑器',
    pricing: 'Open Source',
    features: ['开源', '可定制', '专业工具', '跨平台'],
    tags: ['图像编辑', '开源', '免费', 'GNU'],
    popularity: 75,
    category: 'design',
    subcategory: 'graphics'
  },
  {
    name: 'Balsamiq',
    website: 'https://balsamiq.com',
    description: '快速线框图和原型工具',
    longDescription: 'Balsamiq提供手绘风格、快速制作、简单易用',
    pricing: 'Paid',
    features: ['手绘风格', '快速制作', '简单易用', '线框图'],
    tags: ['线框图', '原型', '快速制作', '手绘风格'],
    popularity: 72,
    category: 'design',
    subcategory: 'prototyping'
  },
  {
    name: 'Unsplash',
    website: 'https://unsplash.com',
    description: '高质量免费图片库',
    longDescription: 'Unsplash提供高质量、免费商用、丰富分类的图片资源',
    pricing: 'Free',
    features: ['高质量图片', '免费商用', '丰富分类', 'API接口'],
    tags: ['图片素材', '免费', '高质量', '商用'],
    popularity: 88,
    category: 'design',
    subcategory: 'assets'
  }
];

// 营销工具 - 基于用户清单的更多工具
export const additionalMarketingTools: ToolImportData[] = [
  {
    name: 'Hotjar',
    website: 'https://hotjar.com',
    description: '用户行为分析工具，提供热图和会话录制',
    longDescription: 'Hotjar提供热图分析、会话录制、用户反馈收集',
    pricing: 'Freemium',
    features: ['热图分析', '会话录制', '用户反馈', '行为分析'],
    tags: ['用户行为', '热图', '会话录制', 'UX分析'],
    popularity: 85,
    category: 'marketing',
    subcategory: 'analytics'
  },
  {
    name: 'SEMrush',
    website: 'https://semrush.com',
    description: '全方位数字营销工具套件',
    longDescription: 'SEMrush提供关键词研究、PPC分析、社媒管理、内容营销',
    pricing: 'Paid',
    features: ['SEO分析', 'PPC分析', '竞争分析', '内容营销'],
    tags: ['SEO', 'PPC', '竞争分析', '数字营销'],
    popularity: 88,
    category: 'marketing',
    subcategory: 'seo'
  },
  {
    name: 'ConvertKit',
    website: 'https://convertkit.com',
    description: '创作者和博主的邮件营销工具',
    longDescription: 'ConvertKit提供自动化序列、标签系统、落地页、表单',
    pricing: 'Freemium',
    features: ['自动化序列', '标签系统', '落地页', '表单'],
    tags: ['邮件营销', '创作者', '博客', '自动化'],
    popularity: 82,
    category: 'marketing',
    subcategory: 'email-marketing'
  }
];

// 数据库工具 - 基于用户清单的更多工具
export const additionalDatabaseTools: ToolImportData[] = [
  {
    name: 'Cassandra',
    website: 'https://cassandra.apache.org',
    description: '分布式NoSQL数据库',
    longDescription: 'Cassandra提供线性扩展、高可用性、无单点故障、大数据处理',
    pricing: 'Open Source',
    features: ['分布式架构', '线性扩展', '高可用性', '大数据'],
    tags: ['NoSQL', '分布式', '高可用', 'Apache'],
    popularity: 80,
    category: 'database',
    subcategory: 'nosql'
  },
  {
    name: 'Algolia',
    website: 'https://algolia.com',
    description: '搜索即服务平台',
    longDescription: 'Algolia提供实时搜索、地理搜索、分析、多语言',
    pricing: 'Freemium',
    features: ['实时搜索', '地理搜索', '分析仪表板', '多语言'],
    tags: ['搜索', '实时', '地理搜索', 'SaaS'],
    popularity: 85,
    category: 'database',
    subcategory: 'search'
  }
];

// 监控工具 - 基于用户清单的更多工具
export const additionalMonitoringTools: ToolImportData[] = [
  {
    name: 'New Relic',
    website: 'https://newrelic.com',
    description: '全栈可观测性平台，提供APM和基础设施监控',
    longDescription: 'New Relic提供AI驱动分析、全栈监控、分布式跟踪',
    pricing: 'Freemium',
    features: ['全栈监控', 'AI分析', '分布式跟踪', '可观测性'],
    tags: ['APM', '监控', '可观测性', 'AI驱动'],
    popularity: 88,
    category: 'monitoring',
    subcategory: 'monitoring'
  },
  {
    name: 'Uptime Robot',
    website: 'https://uptimerobot.com',
    description: '网站正常运行时间监控服务',
    longDescription: 'Uptime Robot提供免费监控、多种通知、简单易用',
    pricing: 'Freemium',
    features: ['运行时间监控', '多种通知', '免费额度', '简单配置'],
    tags: ['运行时间', '监控', '免费', '通知'],
    popularity: 82,
    category: 'monitoring',
    subcategory: 'monitoring'
  }
];

// 学习资源 - 基于用户清单的更多工具
export const additionalLearningTools: ToolImportData[] = [
  {
    name: 'Coursera',
    website: 'https://coursera.org',
    description: '与顶级大学合作的在线课程平台',
    longDescription: 'Coursera提供大学级课程、官方认证、结构化学习路径',
    pricing: 'Freemium',
    features: ['大学课程', '官方认证', '学习路径', '企业培训'],
    tags: ['在线课程', '大学', '认证', '学位'],
    popularity: 90,
    category: 'learning',
    subcategory: 'courses'
  },
  {
    name: 'W3Schools',
    website: 'https://w3schools.com',
    description: 'Web技术教程和参考网站',
    longDescription: 'W3Schools提供在线编辑器、实例丰富、循序渐进、认证考试',
    pricing: 'Freemium',
    features: ['在线编辑器', '实例教程', '认证考试', 'Web技术'],
    tags: ['Web技术', '教程', '参考', '在线编辑器'],
    popularity: 88,
    category: 'learning',
    subcategory: 'documentation'
  },
  {
    name: 'HackerRank',
    website: 'https://hackerrank.com',
    description: '编程挑战和技能评估平台',
    longDescription: 'HackerRank提供技术面试、技能认证、竞赛、招聘工具',
    pricing: 'Freemium',
    features: ['编程挑战', '技能评估', '竞赛', '招聘工具'],
    tags: ['编程练习', '技能评估', '面试', '竞赛'],
    popularity: 86,
    category: 'learning',
    subcategory: 'practice'
  }
];

// 生成工具ID的辅助函数
export function generateToolId(name: string): string {
  return name.toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// 生成工具slug的辅助函数
export function generateSlug(name: string): string {
  return generateToolId(name);
}

// 导出完整的工具数据生成函数
export function generateToolData(importData: ToolImportData): any {
  return {
    id: generateToolId(importData.name),
    name: importData.name,
    slug: generateSlug(importData.name),
    description: importData.description,
    longDescription: importData.longDescription,
    website: importData.website,
    category: importData.category,
    subcategory: importData.subcategory,
    pricing: importData.pricing,
    popularity: importData.popularity,
    tags: importData.tags,
    features: importData.features,
    platforms: ['Web'], // 默认平台，可根据需要调整
    lastUpdated: '2025-06-01'
  };
}

// 批量生成工具数据
export function batchGenerateTools(toolsList: ToolImportData[]): any[] {
  return toolsList.map(generateToolData);
}

console.log('工具导入脚本已准备就绪！');
console.log(`部署工具: ${deploymentTools.length} 个`);
console.log(`AI工具: ${additionalAITools.length} 个`);
console.log(`设计工具: ${additionalDesignTools.length} 个`);
console.log(`营销工具: ${additionalMarketingTools.length} 个`);
console.log(`数据库工具: ${additionalDatabaseTools.length} 个`);
console.log(`监控工具: ${additionalMonitoringTools.length} 个`);
console.log(`学习资源: ${additionalLearningTools.length} 个`); 