import { Tool, ToolCategory, PaymentModel } from '@/types';

export const tools: Tool[] = [
  // AI Tools
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    slug: 'chatgpt',
    description: 'Conversational AI assistant that can understand and generate human-like text',
    longDescription: 'OpenAI开发的对话式AI助手，能够理解和生成类人文本，支持代码编写、文案创作、问题解答等多种任务。提供免费版本和付费版本，付费版本具有更快的响应速度和更多功能。',
    website: 'https://chat.openai.com',
    category: 'ai-tools',
    subcategory: 'ai-platforms',
    pricing: 'Freemium',
    popularity: 95,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    tags: ['AI助手', '对话机器人', 'OpenAI', '文本生成'],
    features: ['自然语言对话', '代码生成', '文案创作', '问题解答', '多语言支持'],
    platforms: ['Web', 'iOS', 'Android'],
    lastUpdated: '2025-06-01'
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    slug: 'github-copilot',
    description: 'AI pair programmer that helps you write code faster',
    longDescription: 'GitHub Copilot是一个AI代码助手，基于OpenAI Codex模型，能够根据注释和代码上下文自动生成代码建议。支持多种编程语言和IDE，大大提高开发效率。',
    website: 'https://github.com/features/copilot',
    category: 'ai-tools',
    subcategory: 'dev-assistants',
    pricing: 'Paid',
    popularity: 90,
    logo: 'https://github.githubassets.com/images/modules/site/copilot/copilot.png',
    tags: ['AI编程', '代码助手', 'GitHub', '开发工具'],
    features: ['智能代码补全', '函数生成', '注释解释', '单元测试生成'],
    platforms: ['VS Code', 'Visual Studio', 'JetBrains IDEs', 'Neovim'],
    lastUpdated: '2025-06-01'
  },
  {
    id: 'claude',
    name: 'Claude',
    slug: 'claude',
    description: 'AI assistant designed to be helpful, harmless, and honest',
    longDescription: 'Anthropic开发的AI助手Claude，以安全性和有用性著称。支持长文本处理，具有强大的推理能力和编程辅助功能。适合复杂任务处理和深度对话。',
    website: 'https://www.anthropic.com/claude',
    category: 'ai-tools',
    subcategory: 'ai-platforms',
    pricing: 'Freemium',
    popularity: 85,
    logo: 'https://cdn.anthropic.com/images/icons/claude-3.svg',
    tags: ['AI助手', 'Anthropic', '安全AI', '长文本处理'],
    features: ['长上下文处理', '代码分析', '文档解读', '多语言对话'],
    platforms: ['Web', 'API'],
    lastUpdated: '2025-06-01'
  },
  // Development Tools
  {
    id: 'vscode',
    name: 'Visual Studio Code',
    slug: 'visual-studio-code',
    description: '轻量级但功能强大的代码编辑器',
    longDescription: 'Microsoft开发的免费代码编辑器，支持多种编程语言，拥有丰富的插件生态系统。内置Git支持、智能代码补全、调试功能等，是开发者的首选工具之一。',
    website: 'https://code.visualstudio.com',
    category: 'development',
    subcategory: 'code-editors',
    pricing: 'Free',
    popularity: 95,
    logo: 'https://code.visualstudio.com/assets/images/code-stable.png',
    tags: ['代码编辑器', '微软', '免费', '插件丰富'],
    features: ['智能代码补全', '内置Git支持', '丰富的插件生态', '跨平台支持', '集成终端'],
    platforms: ['Windows', 'macOS', 'Linux'],
    techStack: ['Electron', 'TypeScript'],
    lastUpdated: '2025-06-01'
  },
  {
    id: 'github',
    name: 'GitHub',
    slug: 'github',
    description: '全球最大的代码托管和协作平台',
    longDescription: 'GitHub是基于Git的代码托管平台，提供版本控制、协作开发、项目管理等功能。拥有庞大的开源社区，是开发者学习和分享代码的首选平台。',
    website: 'https://github.com',
    category: 'development',
    subcategory: 'version-control',
    pricing: 'Freemium',
    popularity: 98,
    logo: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
    tags: ['版本控制', 'Git', '开源', '协作开发'],
    features: ['代码托管', 'Pull Request', 'Issues管理', 'GitHub Actions', 'GitHub Pages', '社区协作'],
    platforms: ['Web', 'Desktop', 'Mobile'],
    lastUpdated: '2025-06-01'
  },
  {
    id: 'postman',
    name: 'Postman',
    slug: 'postman',
    description: 'API开发测试的强大工具',
    longDescription: 'Postman是一个功能强大的API开发和测试工具，支持REST、GraphQL等多种API类型。提供直观的界面，方便API测试、文档生成和团队协作。',
    website: 'https://www.postman.com',
    category: 'development',
    subcategory: 'api-tools',
    pricing: 'Freemium',
    popularity: 90,
    logo: 'https://voyager.postman.com/logo/postman-logo-icon-orange.svg',
    tags: ['API测试', 'HTTP客户端', '接口调试', '团队协作'],
    features: ['API测试', '自动化测试', '文档生成', '团队协作', 'Mock服务器'],
    platforms: ['Windows', 'macOS', 'Linux', 'Web'],
    lastUpdated: '2025-06-01'
  },
  // Deployment Tools
  {
    id: 'docker',
    name: 'Docker',
    slug: 'docker',
    description: '容器化平台，简化应用部署',
    longDescription: 'Docker是一个开源的容器化平台，允许开发者打包应用及其依赖到轻量级、可移植的容器中。大大简化了应用的部署、扩展和管理。',
    website: 'https://www.docker.com',
    category: 'deployment',
    subcategory: 'containers',
    pricing: 'Freemium',
    popularity: 95,
    logo: 'https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png',
    tags: ['容器化', '虚拟化', 'DevOps', '微服务'],
    features: ['容器化', '镜像管理', '跨平台支持', 'Docker Compose', 'Swarm集群'],
    platforms: ['Windows', 'macOS', 'Linux'],
    lastUpdated: '2025-06-01'
  },
  {
    id: 'aws',
    name: 'Amazon Web Services',
    slug: 'amazon-web-services',
    description: '全球领先的云计算服务平台',
    longDescription: 'Amazon Web Services (AWS) 是亚马逊提供的综合云计算平台，提供计算、存储、数据库、网络等200多项服务，是全球市场份额最大的云服务提供商。',
    website: 'https://aws.amazon.com',
    category: 'deployment',
    subcategory: 'cloud-servers',
    pricing: 'Paid',
    popularity: 95,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
    tags: ['云计算', '亚马逊', '企业级', '全球部署'],
    features: ['EC2计算实例', 'S3对象存储', 'RDS数据库', 'Lambda无服务器', 'CloudFront CDN'],
    platforms: ['Web', 'CLI', 'SDK'],
    lastUpdated: '2025-06-01'
  },
  {
    id: 'vercel',
    name: 'Vercel',
    slug: 'vercel',
    description: '专为前端框架优化的部署平台',
    longDescription: 'Vercel是专门为前端框架（如Next.js, React, Vue等）优化的云部署平台。提供零配置部署、边缘网络加速、实时协作等功能，是现代Web应用的理想部署选择。',
    website: 'https://vercel.com',
    category: 'deployment',
    subcategory: 'hosting',
    pricing: 'Freemium',
    popularity: 85,
    logo: 'https://assets.vercel.com/image/upload/front/favicon/vercel/favicon.ico',
    tags: ['前端部署', 'Serverless', 'CDN', 'Next.js'],
    features: ['零配置部署', '边缘网络', '实时预览', 'Analytics', '团队协作'],
    platforms: ['Web', 'CLI'],
    lastUpdated: '2025-06-01'
  },
  // Design Tools
  {
    id: 'figma',
    name: 'Figma',
    slug: 'figma',
    description: '现代化的界面设计和协作工具',
    longDescription: 'Figma是基于Web的界面设计工具，支持实时协作。提供强大的设计功能、原型制作、设计系统管理等，是UI/UX设计师的首选工具。',
    website: 'https://www.figma.com',
    category: 'design',
    subcategory: 'ui-design',
    pricing: 'Freemium',
    popularity: 90,
    logo: 'https://cdn.sanity.io/images/599r6htc/localized/46a76c802176eb17b04e12108de7e7e0f3736dc6-1024x1024.png',
    tags: ['UI设计', 'UX设计', '协作', '原型'],
    features: ['实时协作', '组件系统', '自动布局', '原型制作', '设计系统'],
    platforms: ['Web', 'Desktop'],
    lastUpdated: '2025-06-01'
  },
  // Database Tools
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    slug: 'postgresql',
    description: '强大的开源关系型数据库',
    longDescription: 'PostgreSQL是一个功能强大的开源关系型数据库管理系统，以其可靠性、功能丰富性和性能著称。支持复杂查询、外键、触发器、视图等高级功能。',
    website: 'https://www.postgresql.org',
    category: 'database',
    subcategory: 'relational',
    pricing: 'Open Source',
    popularity: 85,
    logo: 'https://wiki.postgresql.org/images/a/a4/PostgreSQL_logo.3colors.svg',
    tags: ['关系型数据库', '开源', '企业级', 'ACID'],
    features: ['ACID事务', '复杂查询', 'JSON支持', '扩展插件', '高可用性'],
    platforms: ['Linux', 'Windows', 'macOS'],
    lastUpdated: '2025-06-01'
  },
  // More tools will be added to reach the target of 400 tools
  // This is a sample of the comprehensive tool database
];

export { tools as default };

// For backward compatibility
export const getAllCategories = (): ToolCategory[] => {
  const categoriesSet = new Set<ToolCategory>();
  
  tools.forEach(tool => {
    categoriesSet.add(tool.category);
  });
  
  return Array.from(categoriesSet).sort();
};

export const getAllPaymentModels = (): PaymentModel[] => {
  const paymentModelsSet = new Set<PaymentModel>();
  
  tools.forEach(tool => {
    paymentModelsSet.add(tool.pricing);
  });
  
  return Array.from(paymentModelsSet).sort();
};

export const getAllTags = (): string[] => {
  const tagsSet = new Set<string>();
  
  tools.forEach(tool => {
    tool.tags?.forEach(tag => {
      tagsSet.add(tag);
    });
  });
  
  return Array.from(tagsSet).sort();
};

export const getToolsByCategory = (category: ToolCategory): Tool[] => {
  return tools.filter(tool => tool.category === category);
};

export const getToolBySlug = (slug: string): Tool | undefined => {
  return tools.find(tool => tool.slug === slug);
};

export const getFeaturedTools = (limit: number = 8): Tool[] => {
  return tools
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
};

export const searchTools = (query: string): Tool[] => {
  const lowercaseQuery = query.toLowerCase();
  return tools.filter(tool => 
    tool.name.toLowerCase().includes(lowercaseQuery) ||
    tool.description.toLowerCase().includes(lowercaseQuery) ||
    tool.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

