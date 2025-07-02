import { Metadata } from 'next';

// SEO 默认配置
export const siteConfig = {
  name: 'ByteHive',
  title: '基础设施导航 | 云服务选择与成本计算器',
  description: '专业的云基础设施导航平台，帮助开发者选择最适合的云服务并计算成本。涵盖主机托管、数据库、Serverless、存储等多个服务提供商。',
  url: 'https://bytehive.site',
  ogImage: 'https://bytehive.site/og-image.png',
  links: {
    twitter: '@ByteHive',
    github: 'https://github.com/bytehive',
  },
  creator: 'ByteHive Team',
};

// 生成页面标题
export function generateTitle(pageTitle?: string): string {
  if (!pageTitle) return `${siteConfig.name} - ${siteConfig.title}`;
  return `${pageTitle} | ${siteConfig.name}`;
}

// 生成页面描述
export function generateDescription(description: string, maxLength = 160): string {
  if (description.length <= maxLength) return description;
  return description.substring(0, maxLength - 3) + '...';
}

// 生成完整的 Metadata
export function generateMetadata({
  title,
  description,
  keywords,
  path = '',
  image,
  type = 'website',
  noIndex = false,
}: {
  title?: string;
  description?: string;
  keywords?: string | string[];
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
}): Metadata {
  const fullTitle = title ? generateTitle(title) : generateTitle();
  const fullDescription = description || siteConfig.description;
  const fullUrl = `${siteConfig.url}${path}`;
  const ogImage = image || siteConfig.ogImage;
  const keywordsString = Array.isArray(keywords) ? keywords.join(', ') : keywords;

  return {
    title: fullTitle,
    description: generateDescription(fullDescription),
    keywords: keywordsString,
    openGraph: {
      title: fullTitle,
      description: generateDescription(fullDescription),
      type,
      url: fullUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: generateDescription(fullDescription),
      site: siteConfig.links.twitter,
      creator: siteConfig.links.twitter,
      images: [ogImage],
    },
    alternates: {
      canonical: fullUrl,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    authors: [{ name: siteConfig.creator }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
  };
}

// 分类页面关键词映射
export const categoryKeywords: Record<string, string[]> = {
  hosting: ['网站托管', '前端托管', '静态网站', 'SSG', 'SSR', '部署服务'],
  database: ['数据库', 'SQL', 'NoSQL', '云数据库', '关系型数据库', '文档数据库'],
  serverless: ['Serverless', '无服务器', 'FaaS', '函数计算', 'Lambda'],
  cdn: ['CDN', '内容分发', '加速服务', '全球加速', '边缘网络'],
  storage: ['对象存储', '云存储', 'S3', 'Blob存储', '文件存储'],
  email: ['邮件服务', 'SMTP', '事务邮件', '营销邮件', '邮件API'],
  monitoring: ['监控服务', 'APM', '日志分析', '性能监控', '错误追踪'],
  security: ['安全服务', '身份认证', 'WAF', '密钥管理', 'DDoS防护'],
};

// 生成 JSON-LD 脚本标签
export function generateJsonLd(data: Record<string, any>): string {
  return JSON.stringify(data);
}