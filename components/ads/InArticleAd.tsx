'use client';

import { useEffect } from 'react';

interface InArticleAdProps {
  client: string;
  slot: string;
  className?: string;
}

export default function InArticleAd({
  client,
  slot,
  className = ''
}: InArticleAdProps) {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (err) {
      console.error('In-article ad error:', err);
    }
  }, []);

  return (
    <div className={`in-article-ad ${className} my-8 text-center`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client={client}
        data-ad-slot={slot}
      />
    </div>
  );
}