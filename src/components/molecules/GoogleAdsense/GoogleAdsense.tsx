import React, { useEffect } from 'react';

interface IProps {
  layoutKey: string;
  slot: string;
}
const GoogleAdsense: React.FC<IProps> = ({ layoutKey, slot }) => {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <div style={{ width: '100%', textAlign: 'left', overflow: 'hidden' }}>
      <ins
        className="adsbygoogle"
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
