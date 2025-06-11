import { CategoryInfo } from '@/types';

export const categories: CategoryInfo[] = [
  {
    slug: 'deployment',
    name: '环境部署',
    description: '云服务器、容器化、CI/CD等部署相关工具',
    icon: '🚀',
    color: '#3b82f6',
    subcategories: [
      { slug: 'cloud-servers', name: '云服务器', count: 15 },
      { slug: 'containers', name: '容器化', count: 12 },
      { slug: 'cicd', name: 'CI/CD', count: 18 },
      { slug: 'hosting', name: '托管服务', count: 15 }
    ],
    toolCount: 60,
    featured: ['aws', 'docker', 'github-actions', 'vercel']
  },
  {
    slug: 'development',
    name: '开发工具',
    description: '编程开发必备工具集合',
    icon: '💻',
    color: '#10b981',
    subcategories: [
      { slug: 'code-editors', name: '代码编辑器', count: 15 },
      { slug: 'version-control', name: '版本控制', count: 12 },
      { slug: 'api-tools', name: 'API工具', count: 18 },
      { slug: 'debugging', name: '调试工具', count: 15 },
      { slug: 'frameworks', name: '开发框架', count: 20 }
    ],
    toolCount: 80,
    featured: ['vscode', 'github', 'postman', 'docker']
  },
  {
    slug: 'ai-tools',
    name: 'AI工具',
    description: '人工智能和机器学习相关工具',
    icon: '🤖',
    color: '#8b5cf6',
    subcategories: [
      { slug: 'dev-assistants', name: '开发助手', count: 10 },
      { slug: 'ai-platforms', name: 'AI平台', count: 12 },
      { slug: 'ml-tools', name: '机器学习', count: 8 },
      { slug: 'content-generation', name: '内容生成', count: 10 }
    ],
    toolCount: 40,
    featured: ['github-copilot', 'chatgpt', 'claude', 'cursor']
  },
  {
    slug: 'design',
    name: '设计工具',
    description: 'UI/UX设计、图形设计等创意工具',
    icon: '🎨',
    color: '#f59e0b',
    subcategories: [
      { slug: 'ui-design', name: 'UI设计', count: 15 },
      { slug: 'prototyping', name: '原型设计', count: 12 },
      { slug: 'graphics', name: '图形设计', count: 13 },
      { slug: 'assets', name: '设计资源', count: 10 }
    ],
    toolCount: 50,
    featured: ['figma', 'sketch', 'adobe-xd', 'canva']
  },
  {
    slug: 'marketing',
    name: '营销推广',
    description: '数字营销、SEO、社交媒体等推广工具',
    icon: '📈',
    color: '#ef4444',
    subcategories: [
      { slug: 'seo', name: 'SEO工具', count: 15 },
      { slug: 'analytics', name: '数据分析', count: 12 },
      { slug: 'social-media', name: '社交媒体', count: 18 },
      { slug: 'email-marketing', name: '邮件营销', count: 15 }
    ],
    toolCount: 60,
    featured: ['google-analytics', 'semrush', 'mailchimp', 'buffer']
  },
  {
    slug: 'database',
    name: '数据库',
    description: '数据库管理、数据存储和处理工具',
    icon: '🗄️',
    color: '#06b6d4',
    subcategories: [
      { slug: 'relational', name: '关系型数据库', count: 8 },
      { slug: 'nosql', name: 'NoSQL数据库', count: 7 },
      { slug: 'cloud-db', name: '云数据库', count: 10 },
      { slug: 'db-tools', name: '数据库工具', count: 5 }
    ],
    toolCount: 30,
    featured: ['postgresql', 'mongodb', 'redis', 'supabase']
  },
  {
    slug: 'monitoring',
    name: '监控运维',
    description: '系统监控、日志管理、性能优化工具',
    icon: '📊',
    color: '#84cc16',
    subcategories: [
      { slug: 'monitoring', name: '系统监控', count: 12 },
      { slug: 'logging', name: '日志管理', count: 8 },
      { slug: 'performance', name: '性能监控', count: 10 },
      { slug: 'security', name: '安全监控', count: 5 }
    ],
    toolCount: 35,
    featured: ['datadog', 'new-relic', 'splunk', 'grafana']
  },
  {
    slug: 'learning',
    name: '学习资源',
    description: '编程学习、技术文档、在线课程等资源',
    icon: '📚',
    color: '#f97316',
    subcategories: [
      { slug: 'courses', name: '在线课程', count: 15 },
      { slug: 'documentation', name: '技术文档', count: 12 },
      { slug: 'practice', name: '练习平台', count: 10 },
      { slug: 'communities', name: '技术社区', count: 8 }
    ],
    toolCount: 45,
    featured: ['github', 'stackoverflow', 'mdn', 'coursera']
  }
];

export const getCategoryBySlug = (slug: string): CategoryInfo | undefined => {
  return categories.find(category => category.slug === slug);
};

export const getTotalToolsCount = (): number => {
  return categories.reduce((total, category) => total + category.toolCount, 0);
};