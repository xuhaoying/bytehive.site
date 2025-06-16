"use client";

import { useState } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/hero-section';
import CategoryFilter from '@/components/tools/category-filter';
import ToolsGrid from '@/components/tools/tools-grid';
import { FilterState } from '@/types';
import { tools, getAllCategories, getAllPaymentModels } from '@/data/tools';
import { categories, getTotalToolsCount } from '@/data/categories';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { BannerAd } from '@/components/ads/adsense';
import { SponsorBanner } from '@/components/sponsor/sponsor-banner';

export default function Home() {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    paymentModels: [],
    searchQuery: '',
  });
  
  const allCategories = getAllCategories();
  const paymentModels = getAllPaymentModels();
  const totalToolsCount = getTotalToolsCount();
  
  const handleSearch = (query: string) => {
    setFilters(prev => ({
      ...prev,
      searchQuery: query
    }));
    
    const toolsSection = document.getElementById('tools-section');
    if (toolsSection) {
      toolsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    <main className="min-h-screen flex flex-col relative bg-grid">
      <Header />
      
      <HeroSection onSearch={handleSearch} toolsCount={totalToolsCount} />
      
      {/* Top Banner Ad */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <BannerAd className="w-full max-w-4xl border rounded-lg p-4 bg-muted/30" />
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">工具分类</h2>
          <p className="text-lg text-muted-foreground">浏览{categories.length}个主要分类，找到适合您的开发工具</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {categories.map((category) => (
            <Link key={category.slug} href={`/category/${category.slug}`}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div 
                    className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-2xl transition-colors"
                    style={{ 
                      backgroundColor: `${category.color}20`,
                      color: category.color 
                    }}
                  >
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {category.description}
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    {category.toolCount} 个工具
                  </Badge>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
      
      {/* Sponsor Section */}
      <section className="container mx-auto px-4 py-12">
        <SponsorBanner position="banner" className="mb-8" />
      </section>
      
      {/* Middle Banner Ad */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <BannerAd className="w-full max-w-4xl border rounded-lg p-4 bg-muted/30" />
        </div>
      </section>
      
      <section id="tools-section" className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">所有工具</h2>
          <p className="text-lg text-muted-foreground">浏览我们精选的{tools.length}个优质开发工具</p>
        </div>
        <CategoryFilter 
          categories={allCategories}
          paymentModels={paymentModels}
          selectedFilters={filters}
          onFilterChange={handleFilterChange}
        />
        
        <ToolsGrid tools={tools} filters={filters} />
      </section>
      
      <Footer />
    </main>
  );
}