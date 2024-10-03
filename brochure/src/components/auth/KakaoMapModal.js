import React, { useEffect } from 'react';

const KakaoMapModal = ({ onClose, onSelectLocation }) => {
  useEffect(() => {
    const loadKakaoMap = () => {
      const { kakao } = window;
      if (!kakao || !kakao.maps) {
        console.error('Kakao Maps API가 로드되지 않았습니다.');
        return;
      }

      const container = document.getElementById('map'); // 지도를 표시할 div
      const options = {
        center: new kakao.maps.LatLng(37.5665, 126.9780), // 서울을 초기 중심으로 설정
        level: 3, // 지도 확대 레벨
      };

      // 지도 생성
      const map = new kakao.maps.Map(container, options);

      // 지도 클릭 이벤트
      kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
        const latlng = mouseEvent.latLng;
        onSelectLocation(latlng.getLat(), latlng.getLng()); // 선택한 좌표를 상위 컴포넌트로 전달
        onClose(); // 모달 닫기
      });
    };

    // 카카오 지도 API 스크립트 동적으로 로드
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=77ddf9c57d59c5ec87f79398d5ae2e83&autoload=false`;
    script.async = true;

    script.onload = () => {
      console.log('Kakao Maps API 스크립트가 로드되었습니다.');
      window.kakao.maps.load(loadKakaoMap); // 스크립트가 로드된 후 지도 초기화
    };

    script.onerror = () => {
      console.error('Kakao Maps API 스크립트를 로드하는 중 오류가 발생했습니다.');
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script); // 컴포넌트 언마운트 시 스크립트 제거
    };
  }, [onClose, onSelectLocation]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '400px' }}>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
      <button onClick={onClose} style={{ position: 'absolute', top: 10, right: 10 }}>
        닫기
      </button>
    </div>
  );
};

export default KakaoMapModal;