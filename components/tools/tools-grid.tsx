"use client";

import { useState, useEffect } from 'react';
import { Tool, FilterState } from '@/types';
import ToolCard from './tool-card';
import Fuse from 'fuse.js';

interface ToolsGridProps {
  tools: Tool[];
  filters: FilterState;
}

export default function ToolsGrid({ tools, filters }: ToolsGridProps) {
  const [filteredTools, setFilteredTools] = useState<Tool[]>(tools);
  
  useEffect(() => {
    let result = [...tools];
    
    // Filter by categories if any selected
    if (filters.categories.length > 0) {
      result = result.filter(tool => 
        filters.categories.includes(tool.category)
      );
    }
    
    // Filter by payment models if any selected
    if (filters.paymentModels.length > 0) {
      result = result.filter(tool => 
        filters.paymentModels.includes(tool.pricing)
      );
    }
    
    // Filter by search query if provided
    if (filters.searchQuery) {
      const fuse = new Fuse(result, {
        keys: ['name', 'description', 'longDescription', 'tags'],
        threshold: 0.3,
        includeScore: true
      });
      
      const searchResults = fuse.search(filters.searchQuery);
      result = searchResults.map(res => res.item);
    }
    
    // Filter by minimum popularity if provided
    if (filters.minPopularity) {
      result = result.filter(tool => tool.popularity >= (filters.minPopularity || 0));
    }
    
    setFilteredTools(result);
  }, [tools, filters]);
  
  if (filteredTools.length === 0) {
    return (
      <div className="w-full py-12 text-center">
        <h3 className="text-xl font-medium mb-2">No tools found</h3>
        <p className="text-muted-foreground">
          Try adjusting your filters or search query
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredTools.map(tool => (
        <ToolCard key={tool.id} tool={tool} searchQuery={filters.searchQuery} />
      ))}
    </div>
  );
}