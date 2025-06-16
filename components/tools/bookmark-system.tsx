'use client';

import { useState, useEffect } from 'react';
import { Heart, Bookmark, Share2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Tool } from '@/types';

interface BookmarkCollection {
  id: string;
  name: string;
  description?: string;
  tools: string[];
  createdAt: string;
  isPublic: boolean;
}

interface BookmarkSystemProps {
  tool: Tool;
  className?: string;
}

interface BookmarkButtonProps {
  toolId: string;
  isBookmarked?: boolean;
  isFavorited?: boolean;
  onToggle: () => void;
  className?: string;
}

function BookmarkButton({ toolId, isBookmarked, onToggle, className }: BookmarkButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onToggle}
      className={cn(
        'h-8 w-8 p-0',
        isBookmarked && 'text-amber-600 fill-amber-400',
        className
      )}
      title={isBookmarked ? '取消收藏' : '收藏工具'}
    >
      <Bookmark 
        className={cn(
          'h-4 w-4 transition-all',
          isBookmarked && 'fill-current'
        )} 
      />
    </Button>
  );
}

function FavoriteButton({ toolId, isFavorited, onToggle, className }: BookmarkButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onToggle}
      className={cn(
        'h-8 w-8 p-0',
        isFavorited && 'text-red-600 fill-red-400',
        className
      )}
      title={isFavorited ? '取消喜欢' : '喜欢'}
    >
      <Heart 
        className={cn(
          'h-4 w-4 transition-all',
          isFavorited && 'fill-current'
        )} 
      />
    </Button>
  );
}

function ShareButton({ tool, className }: { tool: Tool; className?: string }) {
  const handleShare = async () => {
    const shareData = {
      title: `${tool.name} - AI工具导航`,
      text: tool.description,
      url: `${window.location.origin}/tool/${tool.slug}`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback to clipboard
      await navigator.clipboard.writeText(shareData.url);
      toast.success('链接已复制到剪贴板');
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleShare}
      className={cn('h-8 w-8 p-0', className)}
      title="分享工具"
    >
      <Share2 className="h-4 w-4" />
    </Button>
  );
}

export function BookmarkSystem({ tool, className }: BookmarkSystemProps) {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [collections, setCollections] = useState<BookmarkCollection[]>([]);
  const [showCollections, setShowCollections] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('bookmarked-tools');
    const savedFavorites = localStorage.getItem('favorite-tools');
    const savedCollections = localStorage.getItem('tool-collections');
    
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
    
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    
    if (savedCollections) {
      setCollections(JSON.parse(savedCollections));
    } else {
      // Create default collections
      const defaultCollections: BookmarkCollection[] = [
        {
          id: 'favorites',
          name: '我的收藏',
          description: '最喜欢的AI工具',
          tools: [],
          createdAt: new Date().toISOString(),
          isPublic: false,
        },
        {
          id: 'to-try',
          name: '待尝试',
          description: '想要试用的工具',
          tools: [],
          createdAt: new Date().toISOString(),
          isPublic: false,
        },
      ];
      setCollections(defaultCollections);
      localStorage.setItem('tool-collections', JSON.stringify(defaultCollections));
    }
  }, []);

  const isBookmarked = bookmarks.includes(tool.id);
  const isFavorited = favorites.includes(tool.id);

  const toggleBookmark = () => {
    const newBookmarks = isBookmarked
      ? bookmarks.filter(id => id !== tool.id)
      : [...bookmarks, tool.id];
    
    setBookmarks(newBookmarks);
    localStorage.setItem('bookmarked-tools', JSON.stringify(newBookmarks));
    
    toast.success(
      isBookmarked ? '已取消收藏' : '已添加到书签',
      {
        description: isBookmarked ? undefined : '您可以在个人中心查看所有收藏的工具'
      }
    );
  };

  const toggleFavorite = () => {
    const newFavorites = isFavorited
      ? favorites.filter(id => id !== tool.id)
      : [...favorites, tool.id];
    
    setFavorites(newFavorites);
    localStorage.setItem('favorite-tools', JSON.stringify(newFavorites));
    
    toast.success(isFavorited ? '已取消喜欢' : '已添加到喜欢');
  };

  const addToCollection = (collectionId: string) => {
    const updatedCollections = collections.map(collection => {
      if (collection.id === collectionId) {
        const isAlreadyInCollection = collection.tools.includes(tool.id);
        return {
          ...collection,
          tools: isAlreadyInCollection
            ? collection.tools.filter(id => id !== tool.id)
            : [...collection.tools, tool.id],
        };
      }
      return collection;
    });
    
    setCollections(updatedCollections);
    localStorage.setItem('tool-collections', JSON.stringify(updatedCollections));
    
    const collection = collections.find(c => c.id === collectionId);
    const isInCollection = collection?.tools.includes(tool.id);
    
    toast.success(
      isInCollection ? `已从"${collection?.name}"中移除` : `已添加到"${collection?.name}"`
    );
  };

  return (
    <BookmarkButton
      toolId={tool.id}
      isBookmarked={isBookmarked}
      onToggle={toggleBookmark}
      className={className}
    />
  );
}

// Hook for managing bookmarks
export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('bookmarked-tools');
    const savedFavorites = localStorage.getItem('favorite-tools');
    
    if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
  }, []);
  
  return {
    bookmarks,
    favorites,
    isBookmarked: (toolId: string) => bookmarks.includes(toolId),
    isFavorited: (toolId: string) => favorites.includes(toolId),
  };
}