'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, X, ChevronDown, Zap, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useRouter } from 'next/navigation';
import { categories } from '@/data/categories';
import { Badge } from '@/components/ui/badge';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMenuOpen(false);
    }
  };

  const mainCategories = categories.slice(0, 8); // Show first 8 categories

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Enhanced Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              {/* Hexagon Logo with Gradient */}
              <div className="h-12 w-12 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                {/* Honeycomb Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-2xl"></div>
                <div className="relative flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                    <path
                      d="M12 2L15.09 8.26L22 9L17 14.74L18.18 21.02L12 17.77L5.82 21.02L7 14.74L2 9L8.91 8.26L12 2Z"
                      fill="currentColor"
                      className="animate-pulse"
                    />
                  </svg>
                </div>
              </div>
              {/* Glow Effect */}
              <div className="absolute inset-0 h-12 w-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-300 blur-md"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-2xl bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                ByteHive
              </span>
              <span className="text-xs text-muted-foreground tracking-wider uppercase opacity-80">
                AI Tools Ecosystem
              </span>
            </div>
          </Link>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors relative group"
            >
              首页
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            <div 
              className="relative group"
              onMouseEnter={() => setIsCategoryMenuOpen(true)}
              onMouseLeave={() => setIsCategoryMenuOpen(false)}
            >
              <button className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1 relative group">
                工具分类
                <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isCategoryMenuOpen ? 'rotate-180' : ''}`} />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 group-hover:w-full transition-all duration-300"></span>
              </button>
              
              {/* Enhanced Dropdown Menu */}
              <div className={`absolute top-full left-0 mt-2 w-80 bg-background/95 backdrop-blur-xl border rounded-2xl shadow-2xl transition-all duration-300 ${
                isCategoryMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
              }`}>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-3">
                    {mainCategories.map((category) => (
                      <Link
                        key={category.slug}
                        href={`/category/${category.slug}`}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-all duration-200 group"
                      >
                        <div 
                          className="h-10 w-10 rounded-lg flex items-center justify-center text-lg transition-transform group-hover:scale-110"
                          style={{ 
                            backgroundColor: `${category.color}15`,
                            color: category.color 
                          }}
                        >
                          {category.icon}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm group-hover:text-primary transition-colors">
                            {category.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {category.toolCount} 工具
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="border-t mt-4 pt-4">
                    <Link
                      href="/search"
                      className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors"
                    >
                      <Sparkles className="h-4 w-4" />
                      探索所有分类
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            <Link 
              href="/about" 
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors relative group"
            >
              关于我们
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            <Link 
              href="/submit" 
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <Star className="h-4 w-4" />
              推荐工具
            </Link>
          </nav>

          {/* Enhanced Search Bar - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 group-hover:text-amber-600 transition-colors" />
                <Input
                  type="text"
                  placeholder="探索AI工具..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 w-72 h-12 border-0 bg-muted/50 backdrop-blur-sm rounded-xl focus:bg-background focus:ring-2 focus:ring-amber-500/50 transition-all duration-300"
                />
              </div>
            </form>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-3 lg:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="h-10 w-10 rounded-xl"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t bg-background/95 backdrop-blur-xl">
            <div className="p-6 space-y-6">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="探索AI工具..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 rounded-xl bg-muted/50"
                />
              </form>

              {/* Mobile Navigation */}
              <nav className="space-y-4">
                <Link 
                  href="/" 
                  className="flex items-center gap-3 py-3 text-base font-medium hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Zap className="h-5 w-5" />
                  首页
                </Link>
                
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">工具分类</div>
                  <div className="grid grid-cols-1 gap-2">
                    {mainCategories.map((category) => (
                      <Link
                        key={category.slug}
                        href={`/category/${category.slug}`}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div 
                          className="h-8 w-8 rounded-lg flex items-center justify-center text-sm"
                          style={{ 
                            backgroundColor: `${category.color}15`,
                            color: category.color 
                          }}
                        >
                          {category.icon}
                        </div>
                        <div className="flex-1">
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {category.toolCount}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </div>
                
                <Link 
                  href="/about" 
                  className="flex items-center gap-3 py-3 text-base font-medium hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  关于我们
                </Link>
                
                <Link 
                  href="/submit" 
                  className="flex items-center gap-3 py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Star className="h-5 w-5" />
                  推荐工具
                </Link>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}