import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
// Removed theme provider for light mode only
import { WebSiteStructuredData, OrganizationStructuredData } from '@/components/seo/structured-data';
import { AdSenseScript, AutoAd } from '@/components/ads/adsense';
import GoogleAnalytics from '@/components/analytics/google-analytics';
import WebVitalsMonitor from '@/components/analytics/web-vitals';
import { ErrorBoundary } from '@/components/error-boundary';
import { BackToTopWithProgress } from '@/components/back-to-top';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ByteHive - AI工具导航站 | 精选500+优质AI工具',
  description: '为用户精选500+优质AI工具和资源，涵盖AI创作、智能助手、图像生成等多个分类。',
  keywords: 'AI工具,人工智能,智能助手,图像生成,AI创作,自动化工具,ByteHive',
  openGraph: {
    title: 'ByteHive - AI工具导航站',
    description: '为用户精选500+优质AI工具和资源',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://bytehive.site',
    siteName: 'ByteHive',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ByteHive - AI工具导航站',
    description: '为用户精选500+优质AI工具和资源',
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
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#f59e0b' },
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
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics GA_TRACKING_ID={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </head>
      <body className={inter.className}>
          <WebVitalsMonitor config={{ reportWebVitals: true, debug: process.env.NODE_ENV === 'development' }} />
          <ErrorBoundary>
            {children}
            <BackToTopWithProgress />
          </ErrorBoundary>
      </body>
    </html>
  );
}