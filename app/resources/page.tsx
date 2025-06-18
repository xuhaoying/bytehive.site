'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Code, Globe, Database, CreditCard, Shield, Rocket, Package } from 'lucide-react';
import Link from 'next/link';

interface ResourceTool {
  name: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
  icon?: React.ReactNode;
}

const resourceTools: ResourceTool[] = [
  {
    name: 'Bolt.new',
    description: '通过 AI 快速生成和部署网站原型，无需编程基础，适合初学者快速体验产品上线流程',
    url: 'https://bolt.new',
    category: 'AI 开发',
    tags: ['AI', '无代码', '快速原型'],
    icon: <Rocket className="w-5 h-5" />
  },
  {
    name: 'Cursor',
    description: 'AI 编程辅助工具，支持代码生成、需求文档协作、界面修改等，是课程主推的开发环境',
    url: 'https://cursor.sh',
    category: 'AI 开发',
    tags: ['AI', '编程辅助', 'IDE'],
    icon: <Code className="w-5 h-5" />
  },
  {
    name: 'GitHub',
    description: '全球最大的开源代码托管平台，用于版本管理、协作开发和代码备份',
    url: 'https://github.com',
    category: '代码托管',
    tags: ['版本控制', '协作', '开源'],
    icon: <Code className="w-5 h-5" />
  },
  {
    name: 'Vercel',
    description: '一键部署网站的云平台，支持 Next.js 等前端框架，适合快速上线产品原型',
    url: 'https://vercel.com',
    category: '部署托管',
    tags: ['部署', 'Next.js', '云平台'],
    icon: <Globe className="w-5 h-5" />
  },
  {
    name: 'Supabase',
    description: '开源后端服务平台，提供数据库、认证、存储等功能，适合新手实现用户登录、数据存储等',
    url: 'https://supabase.com',
    category: '后端服务',
    tags: ['数据库', '认证', 'BaaS'],
    icon: <Database className="w-5 h-5" />
  },
  {
    name: 'Postman',
    description: 'API 调试和测试工具，课程中用于调试第三方 API，帮助理解和集成外部服务',
    url: 'https://www.postman.com',
    category: 'API 工具',
    tags: ['API', '测试', '调试'],
    icon: <Globe className="w-5 h-5" />
  },
  {
    name: 'shadcn/ui',
    description: 'React 组件库，帮助快速搭建高质量前端界面，提升产品专业感',
    url: 'https://ui.shadcn.com',
    category: 'UI 组件',
    tags: ['React', '组件库', 'UI'],
    icon: <Package className="w-5 h-5" />
  },
  {
    name: 'Stripe',
    description: '全球领先的支付处理平台，用于实现用户订阅支付功能',
    url: 'https://stripe.com',
    category: '支付集成',
    tags: ['支付', '订阅', 'SaaS'],
    icon: <CreditCard className="w-5 h-5" />
  },
  {
    name: 'Clerk',
    description: '现代化的用户认证和管理服务，提供完整的登录注册解决方案',
    url: 'https://clerk.com',
    category: '用户认证',
    tags: ['认证', '用户管理', 'OAuth'],
    icon: <Shield className="w-5 h-5" />
  },
  {
    name: 'NextAuth',
    description: 'Next.js 应用的完整认证解决方案，支持多种登录方式',
    url: 'https://next-auth.js.org',
    category: '用户认证',
    tags: ['认证', 'Next.js', 'OAuth'],
    icon: <Shield className="w-5 h-5" />
  }
];

const starterKits: ResourceTool[] = [
  {
    name: 'MkSaaS',
    description: 'SaaS 产品开发模板，集成常用功能模块',
    url: 'https://mksaas.com',
    category: 'Starter Kit',
    tags: ['SaaS', '模板', '快速开发']
  },
  {
    name: 'ShipAny',
    description: '快速构建和发布产品的工具包',
    url: 'https://shipany.com',
    category: 'Starter Kit',
    tags: ['快速开发', '产品发布']
  },
  {
    name: 'MakerKit',
    description: '面向创客的 SaaS 开发工具包',
    url: 'https://makerkit.dev',
    category: 'Starter Kit',
    tags: ['SaaS', '创客工具']
  },
  {
    name: 'SupaStarter',
    description: '基于 Supabase 的快速开发模板',
    url: 'https://supastarter.dev',
    category: 'Starter Kit',
    tags: ['Supabase', '模板']
  },
  {
    name: 'Shipfast',
    description: '快速发布产品的开发框架',
    url: 'https://shipfa.st',
    category: 'Starter Kit',
    tags: ['快速开发', '框架']
  }
];

const categories = [
  { name: '全部', value: 'all' },
  { name: 'AI 开发', value: 'AI 开发' },
  { name: '代码托管', value: '代码托管' },
  { name: '部署托管', value: '部署托管' },
  { name: '后端服务', value: '后端服务' },
  { name: 'API 工具', value: 'API 工具' },
  { name: 'UI 组件', value: 'UI 组件' },
  { name: '支付集成', value: '支付集成' },
  { name: '用户认证', value: '用户认证' },
  { name: 'Starter Kit', value: 'Starter Kit' }
];

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredTools = selectedCategory === 'all' 
    ? [...resourceTools, ...starterKits]
    : [...resourceTools, ...starterKits].filter(tool => tool.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'AI 开发': 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
      '代码托管': 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
      '部署托管': 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
      '后端服务': 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
      'API 工具': 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
      'UI 组件': 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300',
      '支付集成': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
      '用户认证': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300',
      'Starter Kit': 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">工具导航</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            本教程中提及的主要工具网站，从产品原型、开发、协作、部署到商业变现的完整工具链
          </p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.value)}
            >
              {category.name}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <Card key={tool.name} className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {tool.icon && (
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        {tool.icon}
                      </div>
                    )}
                    <div>
                      <CardTitle className="text-xl mb-1">{tool.name}</CardTitle>
                      <Badge className={`${getCategoryColor(tool.category)} text-xs`}>
                        {tool.category}
                      </Badge>
                    </div>
                  </div>
                  <Link
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ExternalLink className="w-5 h-5 text-muted-foreground hover:text-primary" />
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">{tool.description}</CardDescription>
                <div className="flex flex-wrap gap-1">
                  {tool.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Link
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full inline-block"
                >
                  <Button className="w-full" variant="outline">
                    访问网站 <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 p-6 bg-muted rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">使用建议</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>• 初学者建议从 Bolt.new 开始，快速体验 AI 开发的魅力</li>
            <li>• 使用 Cursor 作为主要开发环境，配合 GitHub 进行版本管理</li>
            <li>• 选择 Vercel 或 Supabase 进行产品部署，根据项目需求决定</li>
            <li>• 集成支付和认证功能时，可以选择 Stripe + Clerk 的组合</li>
            <li>• Starter Kit 可以大幅加速开发，但建议先理解基础概念</li>
          </ul>
        </div>
      </div>
    </div>
  );
}