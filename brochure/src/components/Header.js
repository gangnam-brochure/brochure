/*
    작성자 : 김동규 - 2024-10-02 / 최초 작성
    설명 : 메인 페이지 헤더 / 카카오 API 나의 위치 정보
*/
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/css/header.css';

const Header = () => {
  const [location, setLocation] = useState('현재 위치 불러오는 중...');
  const [address, setAddress] = useState('주소 불러오는 중...');

  // Kakao API 키를 여기에 입력
  const KAKAO_API_KEY = 'f0579f41e144258263ee0dfef34ae35b';

  // 위도와 경도를 받아서 Kakao API로 주소로 변환하는 함수
  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await axios.get(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`, {
        headers: {
          Authorization: `KakaoAK ${KAKAO_API_KEY}`
        }
      });

      if (response.data.documents.length > 0) {
        setAddress(response.data.documents[0].address.address_name);  // 변환된 주소 설정
      } else {
        setAddress('주소를 찾을 수 없습니다.');
      }
    } catch (error) {
      console.error('주소 변환 실패:', error);
      setAddress('주소 변환에 실패했습니다.');
    }
  };

  // 브라우저의 Geolocation API를 사용하여 위치 정보 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`위도: ${latitude}, 경도: ${longitude}`);

          // 위도와 경도를 Kakao API를 통해 주소로 변환
          getAddressFromCoordinates(latitude, longitude);
        },
        (error) => {
          console.error(error);
          setLocation('위치 정보를 가져올 수 없습니다.');
          setAddress('주소를 가져올 수 없습니다.');
        }
      );
    } else {
      setLocation('브라우저가 위치 서비스를 지원하지 않습니다.');
      setAddress('브라우저가 위치 서비스를 지원하지 않습니다.');
    }
  }, []);

  return (
    <header>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>{address}</h1>
      </div>
    </header>
  );
};

export default Header;