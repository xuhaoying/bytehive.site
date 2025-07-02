'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Container from './container';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

interface NavbarProps {
  scroll?: boolean;
}

const customNavigationMenuTriggerStyle = cn(
  navigationMenuTriggerStyle(),
  'relative bg-transparent text-muted-foreground cursor-pointer',
  'hover:bg-accent hover:text-accent-foreground',
  'focus:bg-accent focus:text-accent-foreground',
  'data-active:font-semibold data-active:bg-transparent data-active:text-foreground',
  'data-[state=open]:bg-transparent data-[state=open]:text-foreground'
);

// Navigation configuration
const toolCategories = [
  {
    title: 'AI工具',
    href: '/category/ai-tools',
    description: '人工智能相关工具和服务',
    icon: '🤖',
  },
  {
    title: '开发工具',
    href: '/category/development',
    description: '编程开发必备工具',
    icon: '💻',
  },
  {
    title: '设计工具',
    href: '/category/design',
    description: '设计师专用工具集',
    icon: '🎨',
  },
  {
    title: '营销工具',
    href: '/category/marketing',
    description: '数字营销推广工具',
    icon: '📢',
  },
];

const infrastructureCategories = [
  {
    title: '云主机',
    href: '/service?category=hosting',
    description: '云服务器和托管服务',
    icon: '☁️',
  },
  {
    title: '数据库',
    href: '/service?category=database',
    description: '数据库服务和解决方案',
    icon: '🗄️',
  },
  {
    title: 'CDN加速',
    href: '/service?category=cdn',
    description: '内容分发网络服务',
    icon: '🚀',
  },
  {
    title: '监控服务',
    href: '/service?category=monitoring',
    description: '应用性能监控',
    icon: '📊',
  },
];

function useScroll(threshold: number = 50) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrolled;
}

export function ModernNavbar({ scroll = true }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrolled = useScroll(50);

  return (
    <section
      className={cn(
        'sticky inset-x-0 top-0 z-40 py-4 transition-all duration-300',
        scroll
          ? scrolled
            ? 'bg-background/80 backdrop-blur-md border-b supports-backdrop-filter:bg-background/60'
            : 'bg-transparent'
          : 'border-b bg-background'
      )}
    >
      <Container className="px-4">
        {/* Desktop navbar */}
        <nav className="hidden lg:flex">
          {/* Logo and name */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 flex items-center justify-center">
                <Image
                  src="/favicon.png"
                  alt="ByteHive Logo"
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
              </div>
              <span className="text-xl font-semibold">ByteHive</span>
            </Link>
          </div>

          {/* Menu links */}
          <div className="flex-1 flex items-center justify-center space-x-2">
            <NavigationMenu className="relative">
              <NavigationMenuList className="flex items-center">
                {/* Tools dropdown */}
                <NavigationMenuItem className="relative">
                  <NavigationMenuTrigger className={customNavigationMenuTriggerStyle}>
                    工具导航
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-4 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {toolCategories.map((category) => (
                        <li key={category.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={category.href}
                              className={cn(
                                'group flex select-none flex-row items-center gap-4 rounded-md',
                                'p-2 leading-none no-underline outline-hidden transition-colors',
                                'hover:bg-accent hover:text-accent-foreground',
                                'focus:bg-accent focus:text-accent-foreground'
                              )}
                            >
                              <div className="flex size-8 shrink-0 items-center justify-center">
                                <span className="text-lg">{category.icon}</span>
                              </div>
                              <div className="flex-1">
                                <div className="text-sm font-medium">
                                  {category.title}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {category.description}
                                </div>
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Infrastructure dropdown */}
                <NavigationMenuItem className="relative">
                  <NavigationMenuTrigger className={customNavigationMenuTriggerStyle}>
                    基础设施
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-4 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {infrastructureCategories.map((category) => (
                        <li key={category.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={category.href}
                              className={cn(
                                'group flex select-none flex-row items-center gap-4 rounded-md',
                                'p-2 leading-none no-underline outline-hidden transition-colors',
                                'hover:bg-accent hover:text-accent-foreground',
                                'focus:bg-accent focus:text-accent-foreground'
                              )}
                            >
                              <div className="flex size-8 shrink-0 items-center justify-center">
                                <span className="text-lg">{category.icon}</span>
                              </div>
                              <div className="flex-1">
                                <div className="text-sm font-medium">
                                  {category.title}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {category.description}
                                </div>
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Direct links */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={customNavigationMenuTriggerStyle}>
                    <Link href="/search">搜索发现</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={customNavigationMenuTriggerStyle}>
                    <Link href="/blog">技术资讯</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={customNavigationMenuTriggerStyle}>
                    <Link href="/about">关于我们</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/search" className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                搜索
              </Link>
            </Button>
          </div>
        </nav>

        {/* Mobile navbar */}
        <div className="flex items-center justify-between lg:hidden">
          {/* Mobile logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 flex items-center justify-center">
              <Image
                src="/favicon.png"
                alt="ByteHive Logo"
                width={32}
                height={32}
                className="rounded-lg"
              />
            </div>
            <span className="text-xl font-semibold">ByteHive</span>
          </Link>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t pt-4 mt-4 space-y-4">
            <div className="space-y-2">
              <Link 
                href="/search" 
                className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                🔍 搜索发现
              </Link>
              
              <div className="space-y-1">
                <div className="py-2 text-sm font-medium text-muted-foreground">工具分类</div>
                {toolCategories.map((category) => (
                  <Link
                    key={category.href}
                    href={category.href}
                    className="flex items-center gap-3 py-2 pl-4 text-sm hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>{category.icon}</span>
                    <span>{category.title}</span>
                  </Link>
                ))}
              </div>
              
              <div className="space-y-1">
                <div className="py-2 text-sm font-medium text-muted-foreground">基础设施</div>
                {infrastructureCategories.map((category) => (
                  <Link
                    key={category.href}
                    href={category.href}
                    className="flex items-center gap-3 py-2 pl-4 text-sm hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>{category.icon}</span>
                    <span>{category.title}</span>
                  </Link>
                ))}
              </div>
              
              <Link 
                href="/blog" 
                className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                📰 技术资讯
              </Link>
              <Link 
                href="/about" 
                className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                ℹ️ 关于我们
              </Link>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}