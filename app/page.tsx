"use client";

import { useState } from 'react';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/hero-section';
import CategoryFilter from '@/components/tools/category-filter';
import ToolsGrid from '@/components/tools/tools-grid';
import { FilterState } from '@/types';
import { tools, getAllCategories, getAllPaymentModels } from '@/data/tools';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export default function Home() {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    paymentModels: [],
    searchQuery: '',
  });
  
  const categories = getAllCategories();
  const paymentModels = getAllPaymentModels();
  
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
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>
      
      <HeroSection onSearch={handleSearch} toolsCount={tools.length} />
      
      <section id="tools-section" className="container mx-auto px-4 py-16">
        <CategoryFilter 
          categories={categories}
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