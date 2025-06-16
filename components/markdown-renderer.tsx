'use client';

import ReactMarkdown from 'react-markdown';
import { InArticleAd } from '@/components/ads/adsense';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      components={{
        h2: ({ children }) => (
          <>
            <h2>{children}</h2>
            <InArticleAd className="my-8" />
          </>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}