'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { BreadcrumbStructuredData } from '@/components/seo/structured-data';

export interface BreadcrumbItem {
  name: string;
  url?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  // 构建完整的面包屑路径，包括首页
  const fullItems: BreadcrumbItem[] = [
    { name: '首页', url: '/' },
    ...items
  ];

  // 构建结构化数据的items
  const structuredDataItems = fullItems
    .filter(item => item.url) // 只包含有URL的项
    .map(item => ({
      name: item.name,
      url: `https://bytehive.site${item.url}`
    }));

  return (
    <>
      <BreadcrumbStructuredData items={structuredDataItems} />
      <nav 
        aria-label="Breadcrumb" 
        className={`flex items-center text-sm text-muted-foreground ${className}`}
      >
        <ol className="flex items-center space-x-1">
          {fullItems.map((item, index) => {
            const isLast = index === fullItems.length - 1;
            
            return (
              <li key={index} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground/50" />
                )}
                
                {item.url && !isLast ? (
                  <Link 
                    href={item.url}
                    className="hover:text-foreground transition-colors flex items-center"
                  >
                    {index === 0 && <Home className="h-4 w-4 mr-1" />}
                    {item.name}
                  </Link>
                ) : (
                  <span className="text-foreground font-medium flex items-center">
                    {index === 0 && <Home className="h-4 w-4 mr-1" />}
                    {item.name}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

// 便捷函数：生成工具页面的面包屑
export function generateToolBreadcrumb(toolName: string, categoryName: string, categorySlug: string): BreadcrumbItem[] {
  return [
    { name: '工具', url: '/tools' },
    { name: categoryName, url: `/category/${categorySlug}` },
    { name: toolName }
  ];
}

// 便捷函数：生成服务页面的面包屑
export function generateServiceBreadcrumb(serviceName: string, categoryName: string): BreadcrumbItem[] {
  return [
    { name: '基础设施导航', url: '/infrastructure-navigator' },
    { name: categoryName, url: `/infrastructure-navigator#${categoryName.toLowerCase()}` },
    { name: serviceName }
  ];
}

// 便捷函数：生成博客文章的面包屑
export function generateBlogBreadcrumb(articleTitle: string, categoryName?: string): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    { name: '博客', url: '/blog' }
  ];
  
  if (categoryName) {
    items.push({ name: categoryName, url: `/blog/category/${categoryName.toLowerCase()}` });
  }
  
  items.push({ name: articleTitle });
  
  return items;
}

// 便捷函数：生成分类页面的面包屑
export function generateCategoryBreadcrumb(categoryName: string, parentCategory?: { name: string; slug: string }): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [];
  
  if (parentCategory) {
    items.push({ name: parentCategory.name, url: `/category/${parentCategory.slug}` });
  }
  
  items.push({ name: categoryName });
  
  return items;
}