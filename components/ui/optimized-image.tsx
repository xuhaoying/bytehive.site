'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { generateBlurDataURL, generateSrcSet, getOptimizedFormats } from '@/lib/image-utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  placeholder?: string;
  fallback?: string;
  priority?: boolean;
  quality?: number;
  blur?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  aspectRatio?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  loading = 'lazy',
  placeholder,
  fallback = '/images/placeholder.png',
  priority = false,
  quality = 75,
  blur = true,
  onLoad,
  onError,
  aspectRatio
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 生成默认占位符
  const defaultPlaceholder = useMemo(() => {
    if (placeholder) return placeholder;
    if (typeof window === 'undefined') return '';
    return generateBlurDataURL(10, 10);
  }, [placeholder]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (loading === 'eager' || priority) {
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
        threshold: 0.01,
        rootMargin: '100px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [loading, priority]);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  // 获取优化后的图片格式
  const optimizedFormats = useMemo(() => {
    if (src.startsWith('http')) return [];
    return getOptimizedFormats(src);
  }, [src]);
  
  // 生成响应式 srcSet
  const srcSet = useMemo(() => generateSrcSet(src), [src]);

  const containerStyle = useMemo(() => {
    const style: React.CSSProperties = {};
    if (width) style.width = width;
    if (height) style.height = height;
    if (aspectRatio) style.aspectRatio = aspectRatio;
    return style;
  }, [width, height, aspectRatio]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative overflow-hidden bg-gray-100 transition-colors',
        className
      )}
      style={containerStyle}
    >
      {!isInView ? (
        // 懒加载占位符
        <div className="absolute inset-0">
          {defaultPlaceholder && blur && (
            <img
              src={defaultPlaceholder}
              alt=""
              className="w-full h-full object-cover blur-lg scale-110"
              loading="eager"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-200/20 to-gray-100/20 animate-pulse" />
        </div>
      ) : (
        <>
          {/* 加载中的模糊占位符 */}
          {isLoading && blur && (
            <div className="absolute inset-0">
              {defaultPlaceholder && (
                <img
                  src={defaultPlaceholder}
                  alt=""
                  className="w-full h-full object-cover blur-lg scale-110"
                  loading="eager"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-200/10 to-transparent" />
            </div>
          )}
          
          {/* 主图片 */}
          <picture>
            {/* 优化格式 */}
            {optimizedFormats.map((format, index) => (
              <source
                key={index}
                srcSet={format.srcSet}
                type={format.type}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
              />
            ))}
            
            {/* 原始格式降级 */}
            <img
              ref={imgRef}
              src={hasError ? fallback : src}
              alt={alt}
              width={width}
              height={height}
              className={cn(
                'w-full h-full object-cover transition-opacity duration-500',
                isLoading ? 'opacity-0' : 'opacity-100'
              )}
              loading={priority ? 'eager' : loading}
              onLoad={handleLoad}
              onError={handleError}
              srcSet={srcSet}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
              decoding={priority ? 'sync' : 'async'}
            />
          </picture>

          {/* 错误状态 */}
          {hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="mt-2 text-sm text-gray-500">加载失败</p>
              </div>
            </div>
          )}
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