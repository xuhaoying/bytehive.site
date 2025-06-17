'use client';

import React from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; reset: () => void }>;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // 在这里可以记录错误到错误报告服务
    console.error('Error caught by boundary:', error, errorInfo);
    
    // 如果有 Google Analytics，可以追踪错误
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: error.toString(),
        fatal: false,
      });
    }
  }

  reset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      const { fallback: Fallback } = this.props;
      
      if (Fallback) {
        return <Fallback error={this.state.error} reset={this.reset} />;
      }

      return <DefaultErrorFallback error={this.state.error} reset={this.reset} />;
    }

    return this.props.children;
  }
}

interface ErrorFallbackProps {
  error?: Error;
  reset: () => void;
}

export function DefaultErrorFallback({ error, reset }: ErrorFallbackProps) {
  return (
    <div className="min-h-[400px] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">哎呀，出错了！</h2>
          <p className="text-muted-foreground mb-4">
            抱歉，页面遇到了一些问题。请尝试刷新页面或返回首页。
          </p>
          
          {/* 错误详情（仅在开发环境显示） */}
          {process.env.NODE_ENV === 'development' && error && (
            <details className="mb-4 text-left">
              <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                查看错误详情
              </summary>
              <pre className="mt-2 p-3 bg-muted rounded-md text-xs overflow-auto">
                {error.stack || error.message}
              </pre>
            </details>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={reset}
            variant="default"
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            重试
          </Button>
          <Button
            asChild
            variant="outline"
          >
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              返回首页
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

// 用于特定组件的错误边界
export function ComponentErrorBoundary({ 
  children, 
  name = '组件' 
}: { 
  children: React.ReactNode;
  name?: string;
}) {
  return (
    <ErrorBoundary
      fallback={({ reset }) => (
        <div className="p-4 border border-dashed border-muted-foreground/20 rounded-lg">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">{name}加载失败</span>
          </div>
          <Button
            onClick={reset}
            variant="ghost"
            size="sm"
            className="text-xs"
          >
            重新加载
          </Button>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  );
}

// 异步组件错误边界
export function AsyncBoundary({ 
  children,
  fallback = <div className="animate-pulse h-32 bg-muted rounded-lg" />
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  return (
    <React.Suspense fallback={fallback}>
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </React.Suspense>
  );
}