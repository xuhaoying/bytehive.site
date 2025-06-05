"use client";

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export default function Header({ onSearch }: { onSearch: (query: string) => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Handle scroll events to add background to header on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-200 ${
      isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="bg-primary text-primary-foreground rounded-lg p-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-6 h-6"
            >
              <path d="M12 2a4 4 0 0 1 4 4M8 6a4 4 0 0 0-4 4v10c0 .6.4 1 1 1h2a1 1 0 0 0 1-1v-4h8v4c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V10a4 4 0 0 0-4-4" />
              <circle cx="12" cy="16" r="1" />
              <path d="M12 12v4" />
            </svg>
          </div>
          <span className="text-xl font-bold">AI Nav</span>
        </Link>
        
        <div className="flex-1 max-w-md mx-4">
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              placeholder="Search AI tools..."
              className="w-full py-2 px-4 pl-10 rounded-full bg-secondary/50 focus:bg-secondary border-0 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </form>
        </div>
        
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm font-medium hover:text-primary transition-colors hidden md:block"
          >
            Contribute
          </a>
        </div>
      </div>
    </header>
  );
}