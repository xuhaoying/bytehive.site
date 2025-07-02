'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-lg w-full p-8 text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-2">页面未找到</h2>
          <p className="text-muted-foreground">
            抱歉，您访问的页面不存在或已被移除。
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              返回上一页
            </Button>
            
            <Button asChild>
              <Link href="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                返回首页
              </Link>
            </Button>
          </div>

          <div className="pt-4">
            <p className="text-sm text-muted-foreground mb-3">
              或者试试搜索您想要的内容：
            </p>
            <Button asChild variant="secondary" className="w-full sm:w-auto">
              <Link href="/search" className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                搜索工具
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t">
          <h3 className="font-semibold mb-3">快速链接</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <Link href="/tools" className="text-primary hover:underline">
              浏览工具
            </Link>
            <Link href="/infrastructure-navigator" className="text-primary hover:underline">
              基础设施导航
            </Link>
            <Link href="/blog" className="text-primary hover:underline">
              博客文章
            </Link>
            <Link href="/about" className="text-primary hover:underline">
              关于我们
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}