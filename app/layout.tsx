import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
// Removed theme provider for light mode only
import { WebSiteStructuredData, OrganizationStructuredData } from '@/components/seo/structured-data';
import { AdSenseScript, AutoAd } from '@/components/ads/adsense';
import { GoogleAnalyticsProvider } from '@/components/analytics/google-analytics-provider';
import { PageAnalytics } from '@/components/analytics/analytics-hooks';
import WebVitalsMonitor from '@/components/analytics/web-vitals';
import { ErrorBoundary } from '@/components/error-boundary';
import { BackToTopWithProgress } from '@/components/back-to-top';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://bytehive.site'),
  title: 'ByteHive - 基础设施导航 | 云服务选择与成本计算器',
  description: '专业的云基础设施导航平台，帮助开发者选择最适合的云服务并计算成本。涵盖主机托管、数据库、Serverless、存储等24个服务提供商，提供详细的性能对比、价格分析和最佳实践指南，让技术选型更加简单高效。',
  keywords: '云服务,基础设施,成本计算器,主机托管,数据库,Serverless,存储服务,云计算,开发者工具,ByteHive',
  openGraph: {
    title: 'ByteHive - 基础设施导航 | 云服务选择与成本计算器',
    description: '专业的云基础设施导航平台，帮助开发者选择最适合的云服务并计算成本',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://bytehive.site',
    siteName: 'ByteHive',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ByteHive - 基础设施导航',
    description: '专业的云基础设施导航平台，帮助开发者选择最适合的云服务并计算成本',
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
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/favicon.png', color: '#3b82f6' },
    ],
  },
  manifest: '/site.webmanifest',
  other: {
    'msapplication-TileColor': '#9333ea',
    'theme-color': '#9333ea',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <WebSiteStructuredData />
        <OrganizationStructuredData />
        <AdSenseScript />
        <AutoAd />
      </head>
      <body className={inter.className}>
        {process.env.NEXT_PUBLIC_GA_ID ? (
          <GoogleAnalyticsProvider GA_TRACKING_ID={process.env.NEXT_PUBLIC_GA_ID}>
            <PageAnalytics />
            <WebVitalsMonitor config={{ reportWebVitals: true, debug: process.env.NODE_ENV === 'development' }} />
            <ErrorBoundary>
              {children}
              <BackToTopWithProgress />
            </ErrorBoundary>
          </GoogleAnalyticsProvider>
        ) : (
          <>
            <WebVitalsMonitor config={{ reportWebVitals: true, debug: process.env.NODE_ENV === 'development' }} />
            <ErrorBoundary>
              {children}
              <BackToTopWithProgress />
            </ErrorBoundary>
          </>
        )}
      </body>
    </html>
  );
}