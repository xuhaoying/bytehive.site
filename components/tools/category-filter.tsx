"use client";

import { useState } from 'react';
import { FilterState, ToolCategory, PaymentModel } from '@/types';
import { getCategoryBySlug } from '@/data/categories';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  categories: ToolCategory[];
  paymentModels: PaymentModel[];
  selectedFilters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
}

export default function CategoryFilter({ 
  categories, 
  paymentModels, 
  selectedFilters, 
  onFilterChange 
}: CategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleCategory = (category: ToolCategory) => {
    const newCategories = selectedFilters.categories.includes(category)
      ? selectedFilters.categories.filter(c => c !== category)
      : [...selectedFilters.categories, category];
      
    onFilterChange({
      ...selectedFilters,
      categories: newCategories
    });
  };
  
  const togglePaymentModel = (model: PaymentModel) => {
    const newPaymentModels = selectedFilters.paymentModels.includes(model)
      ? selectedFilters.paymentModels.filter(m => m !== model)
      : [...selectedFilters.paymentModels, model];
      
    onFilterChange({
      ...selectedFilters,
      paymentModels: newPaymentModels
    });
  };
  
  const clearFilters = () => {
    onFilterChange({
      categories: [],
      paymentModels: [],
      searchQuery: selectedFilters.searchQuery
    });
  };
  
  const hasActiveFilters = selectedFilters.categories.length > 0 || selectedFilters.paymentModels.length > 0;

  return (
    <div className="w-full mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">筛选</h2>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden bg-secondary px-4 py-2 rounded-xl text-base"
          >
            {isOpen ? '隐藏筛选' : '显示筛选'}
          </button>
          
          {hasActiveFilters && (
            <button 
              onClick={clearFilters}
              className="text-base text-primary hover:text-primary/80 transition-colors"
            >
              清除全部
            </button>
          )}
        </div>
      </div>
      
      <div className={cn(
        "md:grid md:grid-cols-2 gap-8",
        isOpen ? "block" : "hidden md:grid"
      )}>
        <div>
          <h3 className="font-medium text-lg mb-4">工具分类</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => {
              const categoryInfo = getCategoryBySlug(category);
              return (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm transition-colors flex items-center gap-2",
                    selectedFilters.categories.includes(category)
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary hover:bg-secondary/80"
                  )}
                >
                  {categoryInfo ? (
                    <>
                      <span>{categoryInfo.icon}</span>
                      <span>{categoryInfo.name}</span>
                    </>
                  ) : (
                    category
                  )}
                </button>
              );
            })}
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-lg mb-4">定价模式</h3>
          <div className="flex flex-wrap gap-2">
            {paymentModels.map(model => (
              <button
                key={model}
                onClick={() => togglePaymentModel(model)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm transition-colors",
                  selectedFilters.paymentModels.includes(model)
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary hover:bg-secondary/80"
                )}
              >
                {model === 'Open Source' ? '开源' : 
                 model === 'Free' ? '免费' :
                 model === 'Freemium' ? '免费试用' : '付费'}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}