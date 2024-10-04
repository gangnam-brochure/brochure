import React, { useEffect, useState } from 'react';

const KakaoMapModal = ({ onClose, onSelectLocation }) => {
  const [map, setMap] = useState(null); // 지도 객체를 상태로 관리
  const [marker, setMarker] = useState(null); // 마커 객체를 상태로 관리
  const [selectedPosition, setSelectedPosition] = useState({
    lat: 37.5665,
    lng: 126.9780,
  }); // 선택된 위치 저장 (초기 위치: 서울 중심)

  useEffect(() => {
    const loadKakaoMap = () => {
      const { kakao } = window;
      if (!kakao || !kakao.maps) {
        console.error('Kakao Maps API가 로드되지 않았습니다.');
        return;
      }

      const container = document.getElementById('map'); // 지도를 표시할 div
      const options = {
        center: new kakao.maps.LatLng(selectedPosition.lat, selectedPosition.lng), // 선택된 위치로 초기 설정
        level: 3, // 지도 확대 레벨
      };

      // 지도 생성
      const createdMap = new kakao.maps.Map(container, options);
      setMap(createdMap); // 생성된 지도 객체를 상태에 저장

      // 마커 생성
      const createdMarker = new kakao.maps.Marker({
        map: createdMap, // 마커를 표시할 지도
        position: options.center, // 선택된 위치에 마커 설정
      });
      setMarker(createdMarker); // 마커 객체를 상태에 저장

      // 지도 클릭 이벤트
      kakao.maps.event.addListener(createdMap, 'click', function (mouseEvent) {
        const latlng = mouseEvent.latLng;

        // 선택한 위치로 마커를 이동
        createdMarker.setPosition(latlng);
        setSelectedPosition({ lat: latlng.getLat(), lng: latlng.getLng() });

        // 지도의 중심을 선택한 위치로 이동
        createdMap.setCenter(latlng);

        // 상위 컴포넌트로 선택된 좌표 전달
        onSelectLocation(latlng.getLat(), latlng.getLng());
      });
    };

    // Kakao 지도 API 스크립트 동적으로 로드
    const script = document.createElement('script');
    const kakaoJsKey = process.env.REACT_APP_KAKAO_CLIENT_ID; // JavaScript Key를 환경 변수에서 가져옴
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoJsKey}&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(loadKakaoMap); // 스크립트가 로드된 후 지도 초기화
    };

    script.onerror = () => {
      console.error('Kakao Maps API 스크립트를 로드하는 중 오류가 발생했습니다.');
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script); // 컴포넌트 언마운트 시 스크립트 제거
    };
  }, [onSelectLocation, selectedPosition.lat, selectedPosition.lng]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '500px' }}>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
      <p style={{ 
        textAlign: 'center', 
        marginTop: '10px', 
        fontWeight: 'bold', 
        color: '#000', // 글자 색 검정
        zIndex: 5, // 글자가 지도의 아래로 내려가는 문제 해결
        fontSize: '16px', // 글자 크기 설정
        backgroundColor: '#fff', // 배경색을 흰색으로 설정하여 더 잘 보이도록 함
        padding: '5px',
        position: 'relative', // 위치 설정
        width: '100%' // 넓이 설정
      }}>
        지도를 이동하여 위치를 선택해주세요
      </p>
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          zIndex: 10, // 닫기 버튼을 지도의 위에 표시되도록 설정
          backgroundColor: '#fff',
          padding: '5px 10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
        }}
      >
        닫기
      </button>
    </div>
  );
};

export default KakaoMapModal;
