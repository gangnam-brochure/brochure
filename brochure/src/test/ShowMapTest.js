import React, { useState } from 'react';
import KakaoMapModal from '../components/auth/KakaoMapModal';

const ShowMapTest = () => {
  const [showMap, setShowMap] = useState(false);

  const handleLocationSelect = (lat, lng) => {
    console.log("선택된 좌표:", lat, lng);
  };

  return (
    <div>
      <button onClick={() => setShowMap(true)}>지도 열기</button>

      {showMap && (
        <KakaoMapModal 
          onClose={() => setShowMap(false)} 
          onSelectLocation={handleLocationSelect}
        />
      )}
    </div>
  );
};

export default ShowMapTest;