import React, { useEffect } from 'react';

interface IProps {
  className?: string;
  layoutKey: string;
  slot: string;
}
const GoogleAdsense: React.FC<IProps> = ({ className, layoutKey, slot }) => {
  useEffect(() => {
    try {
      if (typeof window === 'object') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch {
      // Pass
    }
  }, []);

  return (
    <div style={{ width: '100%', textAlign: 'left', overflow: 'hidden' }}>
      <ins
        className={`adsbygoogle ${className}`}
        style={{ display: 'block' }}
        data-ad-format="fluid"
        data-ad-layout-key={layoutKey}
        data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}
        data-ad-slot={slot}
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default GoogleAdsense;
