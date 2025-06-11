import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/ui/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ByteHive - AI工具生态系统 | 精选500+顶级AI工具',
  description: '探索未来科技的蜂巢，汇聚全球500+优质AI工具和资源。从创意设计到代码开发，从数据分析到自动化办公，ByteHive为您打造专业的AI工具生态系统。',
  keywords: 'AI工具,人工智能,机器学习,深度学习,自动化,创意工具,开发工具,数据分析,ByteHive',
  openGraph: {
    title: 'ByteHive - AI工具生态系统',
    description: '探索未来科技的蜂巢，汇聚全球500+优质AI工具和资源',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://bytehive.site',
    siteName: 'ByteHive',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ByteHive - AI工具生态系统',
    description: '探索未来科技的蜂巢，汇聚全球500+优质AI工具和资源',
    site: '@ByteHive',
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: 'ByteHive Team' }],
  creator: 'ByteHive',
  publisher: 'ByteHive',
  alternates: {
    canonical: 'https://bytehive.site',
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#000000' },
    ],
  },
  manifest: '/site.webmanifest',
  other: {
    'msapplication-TileColor': '#000000',
    'theme-color': '#000000',
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