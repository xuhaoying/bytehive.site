'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Home, RefreshCw, AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Page error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-lg w-full p-8 text-center">
        <div className="mb-8">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <h1 className="text-2xl font-semibold mb-2">出错了</h1>
          <p className="text-muted-foreground">
            抱歉，页面加载时遇到了问题。这可能是临时性的错误。
          </p>
          {process.env.NODE_ENV === 'development' && error.message && (
            <p className="text-xs text-muted-foreground mt-2 font-mono">
              {error.message}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <Button
            onClick={reset}
            className="w-full sm:w-auto flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            重试
          </Button>

          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              返回首页
            </Link>
          </Button>
        </div>

        <div className="mt-8 pt-8 border-t">
          <p className="text-sm text-muted-foreground mb-3">
            如果问题持续出现，请尝试：
          </p>
          <ul className="text-sm text-left space-y-1 text-muted-foreground">
            <li>• 刷新页面</li>
            <li>• 清除浏览器缓存</li>
            <li>• 检查网络连接</li>
            <li>• 稍后再试</li>
          </ul>
        </div>

        {error.digest && (
          <div className="mt-4 text-xs text-muted-foreground">
            错误代码: {error.digest}
          </div>
        )}
      </Card>
    </div>
  );
}