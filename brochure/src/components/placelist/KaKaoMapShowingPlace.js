/*
    작성자 : 최예지 - 2024-10-07 / 최초 작성
    설명 : 디테일 페이지 지도 출력
*/


import React, { useEffect, useState } from 'react';

const KakaoMapShowingPlace = ({latitude, longitude}) => {
  const [map, setMap] = useState(null); // 지도 객체를 상태로 관리
  const [marker, setMarker] = useState(null); // 마커 객체를 상태로 관리

  useEffect(() => {
    const loadKakaoMap = () => {
      const { kakao } = window;
      if (!kakao || !kakao.maps) {
        console.error('Kakao Maps API가 로드되지 않았습니다.');
        return;
      }

      const container = document.getElementById('map'); // 지도를 표시할 div
      const options = {
        center: new kakao.maps.LatLng(latitude, longitude),
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
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '500px' }}>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
};

export default KakaoMapShowingPlace;
