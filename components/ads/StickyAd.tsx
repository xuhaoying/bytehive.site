'use client';

import { useEffect, useState } from 'react';
import AdSenseUnit from './AdSenseUnit';

interface StickyAdProps {
  client: string;
  slot: string;
  position?: 'left' | 'right';
  topOffset?: number;
}

export default function StickyAd({
  client,
  slot,
  position = 'right',
  topOffset = 100
}: StickyAdProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`sticky-ad hidden xl:block ${
        position === 'left' ? 'left-4' : 'right-4'
      }`}
      style={{
        position: 'fixed',
        top: `${topOffset}px`,
        width: '300px',
        zIndex: 10,
        transition: 'opacity 0.3s ease-in-out',
        opacity: isVisible ? 1 : 0
      }}
    >
      <div className="bg-background border rounded-lg p-2 shadow-lg">
        <AdSenseUnit
          client={client}
          slot={slot}
          format="rectangle"
          style={{ width: '300px', height: '250px' }}
        />
      </div>
    </div>
  );
}