'use client';

import { useEffect } from 'react';

interface InFeedAdProps {
  client: string;
  slot: string;
  layoutKey?: string;
  className?: string;
}

export default function InFeedAd({
  client,
  slot,
  layoutKey,
  className = ''
}: InFeedAdProps) {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (err) {
      console.error('In-feed ad error:', err);
    }
  }, []);

  return (
    <div className={`in-feed-ad ${className} my-8`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-format="fluid"
        data-ad-layout-key={layoutKey}
        data-ad-client={client}
        data-ad-slot={slot}
      />
    </div>
  );
}