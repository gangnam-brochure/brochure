/*
    작성자 : 김동규 - 2024-10-02 / 최초 작성
    설명 : 메인 페이지 헤더 나의 위치 정보
*/
import React, { useEffect, useState } from 'react';
import '../assets/css/header.css';

const Header = () => {
  const [location, setLocation] = useState('현재 위치 불러오는 중...');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`위도: ${latitude}, 경도: ${longitude}`);
        },
        (error) => {
          console.error(error);
          setLocation('위치 정보를 가져올 수 없습니다.');
        }
      );
    } else {
      setLocation('브라우저가 위치 서비스를 지원하지 않습니다.');
    }
  }, []);

  return (
    <header>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>나의 위치</h1>
        <p>{location}</p>
      </div>
    </header>
  );
};

export default Header;