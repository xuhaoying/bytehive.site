'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchAutocomplete } from '@/components/search/search-autocomplete';
import { categories } from '@/data/categories';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const mainCategories = categories.slice(0, 6); // Show first 6 categories

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
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
            <span className="font-bold text-xl">ByteHive</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              首页
            </Link>
            <Link 
              href="/compare" 
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              工具对比
            </Link>
            <Link 
              href="/rankings" 
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              排行榜
            </Link>
            <Link 
              href="/blog" 
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              资讯
            </Link>
            <Link 
              href="/resources" 
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              工具导航
            </Link>
            <div className="relative group">
              <button className="text-sm font-medium hover:text-primary transition-colors flex items-center">
                分类
              </button>
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-1 w-64 bg-popover border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-2">
                  {mainCategories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/category/${category.slug}`}
                      className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors"
                    >
                      <span className="text-lg">{category.icon}</span>
                      <div>
                        <div className="font-medium">{category.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {category.toolCount} 个工具
                        </div>
                      </div>
                    </Link>
                  ))}
                  <Link
                    href="/search"
                    className="flex items-center justify-center px-3 py-2 text-sm text-primary hover:bg-muted rounded-md transition-colors mt-2 border-t"
                  >
                    查看所有分类
                  </Link>
                </div>
              </div>
            </div>
            <Link 
              href="/about" 
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              关于
            </Link>
            <Link 
              href="/submit" 
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              推荐工具
            </Link>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <SearchAutocomplete 
              className="w-64"
              closeMenu={() => setIsMenuOpen(false)}
            />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4 space-y-4">
            {/* Mobile Search */}
            <SearchAutocomplete 
              closeMenu={() => setIsMenuOpen(false)}
            />

            {/* Mobile Navigation */}
            <nav className="space-y-2">
              <Link 
                href="/" 
                className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                首页
              </Link>
              
              <div className="space-y-1">
                <div className="py-2 text-sm font-medium text-muted-foreground">工具分类</div>
                {mainCategories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/category/${category.slug}`}
                    className="flex items-center gap-3 py-2 pl-4 text-sm hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      {category.toolCount}
                    </span>
                  </Link>
                ))}
              </div>
              
              <Link 
                href="/resources" 
                className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                工具导航
              </Link>
              <Link 
                href="/about" 
                className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                关于
              </Link>
              <Link 
                href="/submit" 
                className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                推荐工具
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}