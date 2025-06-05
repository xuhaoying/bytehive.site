"use client";

import { useState } from 'react';
import { FilterState, ToolCategory, PaymentModel } from '@/types';
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
        <h2 className="text-2xl font-semibold">Filters</h2>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden bg-secondary px-4 py-2 rounded-xl text-base"
          >
            {isOpen ? 'Hide Filters' : 'Show Filters'}
          </button>
          
          {hasActiveFilters && (
            <button 
              onClick={clearFilters}
              className="text-base text-primary hover:text-primary/80 transition-colors"
            >
              Clear all
            </button>
          )}
        </div>
      </div>
      
      <div className={cn(
        "md:grid md:grid-cols-2 gap-8",
        isOpen ? "block" : "hidden md:grid"
      )}>
        <div>
          <h3 className="font-medium text-lg mb-4">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={cn(
                  "px-4 py-2 rounded-xl text-base transition-colors",
                  selectedFilters.categories.includes(category)
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary hover:bg-secondary/80"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-lg mb-4">Payment Models</h3>
          <div className="flex flex-wrap gap-2">
            {paymentModels.map(model => (
              <button
                key={model}
                onClick={() => togglePaymentModel(model)}
                className={cn(
                  "px-4 py-2 rounded-xl text-base transition-colors",
                  selectedFilters.paymentModels.includes(model)
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary hover:bg-secondary/80"
                )}
              >
                {model}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}