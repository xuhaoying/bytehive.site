import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/ui/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DevHub - 开发者工具导航站 | 400+精选开发工具',
  description: '为开发者精选400+优质工具和资源，涵盖环境部署、开发工具、AI工具等8大分类。',
  keywords: '开发者工具,编程工具,云服务,AI工具,开发资源,DevHub',
  openGraph: {
    title: 'DevHub - 开发者工具导航站',
    description: '为开发者精选400+优质工具和资源',
    type: 'website',
    locale: 'zh_CN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevHub - 开发者工具导航站',
    description: '为开发者精选400+优质工具和资源',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system" 
          enableSystem 
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}