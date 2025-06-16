'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  placeholder?: string;
  fallback?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  loading = 'lazy',
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzlkYTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+Cjwvc3ZnPg==',
  fallback = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzlkYTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+Cjwvc3ZnPg==',
  onLoad,
  onError
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (loading === 'eager') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [loading]);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  // Generate optimized src URLs for different formats and sizes
  const getOptimizedSrc = (originalSrc: string, format?: 'webp' | 'avif') => {
    // For external URLs, return as-is (could be enhanced with proxy service)
    if (originalSrc.startsWith('http')) {
      return originalSrc;
    }
    
    // For local images, return optimized version
    // This would need to be implemented with a build-time optimization script
    return originalSrc;
  };

  const generateSrcSet = (originalSrc: string) => {
    const sizes = [320, 640, 1280];
    return sizes
      .map(size => `${getOptimizedSrc(originalSrc)} ${size}w`)
      .join(', ');
  };

  return (
    <div
      ref={imgRef}
      className={cn(
        'relative overflow-hidden bg-gray-100 dark:bg-gray-800',
        className
      )}
      style={{ width, height }}
    >
      {!isInView ? (
        <img
          src={placeholder}
          alt=""
          className="w-full h-full object-cover blur-sm transition-all duration-300"
          loading="eager"
        />
      ) : (
        <>
          {/* Loading placeholder */}
          {isLoading && (
            <img
              src={placeholder}
              alt=""
              className="absolute inset-0 w-full h-full object-cover blur-sm"
              loading="eager"
            />
          )}
          
          {/* Main image */}
          <picture>
            {/* WebP format for modern browsers */}
            <source
              srcSet={generateSrcSet(getOptimizedSrc(src, 'webp'))}
              type="image/webp"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Original format fallback */}
            <img
              src={hasError ? fallback : src}
              alt={alt}
              width={width}
              height={height}
              className={cn(
                'w-full h-full object-cover transition-all duration-300',
                isLoading ? 'opacity-0' : 'opacity-100'
              )}
              loading={loading}
              onLoad={handleLoad}
              onError={handleError}
              srcSet={generateSrcSet(src)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </picture>
        </>
      )}
    </div>
  );
}

// Higher-order component for backward compatibility
export function withImageOptimization<T extends { src: string; alt: string }>(
  Component: React.ComponentType<T>
) {
  return function OptimizedComponent(props: T) {
    const { src, alt, ...restProps } = props;
    return (
      <Component
        {...(restProps as T)}
        src={src}
        alt={alt}
      />
    );
  };
}