import React, { useEffect } from 'react';

interface IProps {
  style?: any;
  className?: string;
  format?: string;
  layoutKey?: string;
  responsive?: boolean;
  slot: string;
}
const GoogleAdsense: React.FC<IProps> = ({
  style,
  className = '',
  format,
  layoutKey,
  responsive = true,
  slot,
}) => {
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
        style={{ display: 'block', ...style }}
        {...(format && { 'data-ad-format': format })}
        {...(layoutKey && { 'data-ad-layout-key': layoutKey })}
        data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}
        data-ad-slot={slot}
        {...(responsive && { 'data-full-width-responsive': 'true' })}
      ></ins>
    </div>
  );
};

export default GoogleAdsense;
