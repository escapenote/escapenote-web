import React, { useEffect, useRef } from 'react';

interface IProps {
  addressLine?: string;
  lat?: number;
  lng?: number;
}
const SimpleMap: React.FC<IProps> = ({ addressLine, lat, lng }) => {
  const mapElement = useRef(null);

  useEffect(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return;

    const location = new naver.maps.LatLng(lat, lng);
    const mapOptions = {
      center: location,
      zoom: 13,
      zoomControl: false,
    };
    const map = new naver.maps.Map(mapElement.current, mapOptions);
    new naver.maps.Marker({
      position: location,
      map,
    });
  }, [lat, lng]);

  function handleClickMap() {
    window.open(`https://map.naver.com/v5/search/${addressLine}`, '_blank');
  }

  return (
    <div
      ref={mapElement}
      onClick={handleClickMap}
      style={{ minHeight: '300px' }}
    />
  );
};

export default SimpleMap;
