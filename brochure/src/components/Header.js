/*
    작성자 : 김동규 - 2024-10-02 / 최초 작성
    설명 : 메인 페이지 헤더 영역
*/

/*
    수정자 : 최예지 - 2024-10-12
    설명 : zustand 이용해 현재 위도 경도 저장
*/

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import KakaoMapModal from '../components/auth/KakaoMapModal';  // 카카오 지도 모달 컴포넌트 가져오기
import '../assets/css/header.css';
import { useNavigate } from 'react-router-dom';
import marker from '../assets/images/marker.png';
import useCurrCoords from './placelist/Coords';

const Header = () => {
  const {lat, lng, setCurrCoords} = useCurrCoords();
  const [location, setLocation] = useState('현재 위치 불러오는 중...');
  const [address, setAddress] = useState('주소 불러오는 중...');
  const [showModal, setShowModal] = useState(false);  // 모달 표시 여부
  const navigate = useNavigate();

  // 환경 변수에서 API 키 가져오기
  const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;

  // 위도와 경도를 받아서 Kakao API로 주소를 변환하는 함수
  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`,
        {
          headers: {
            Authorization: `KakaoAK ${KAKAO_API_KEY}`,  // Authorization 헤더에 API 키 전달
          },
        }
      );
      

      if (response.data.documents.length > 0) {
        setAddress(response.data.documents[0].address.address_name);  // 변환된 주소 설정
        console.log("현재 위치 : " + response.data.documents[0].address.address_name);
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
          setCurrCoords(latitude, longitude); //zustand 이용해 현재 위도, 경도 저장

          // 위도와 경도를 Kakao API를 통해 주소로 변환
          getAddressFromCoordinates(latitude, longitude);
          console.log("latitude : " + latitude);
          console.log("longitude : " + longitude);
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

  // 카카오 지도에서 선택한 좌표를 받아와서 Kakao API로 주소 변환
  const handleLocationSelect = (latitude, longitude) => {
    setLocation(`위도: ${latitude}, 경도: ${longitude}`);
    getAddressFromCoordinates(latitude, longitude);  // 선택한 좌표로 주소 업데이트
  };

  const goHome = () => {
    navigate('/');
  }

  return (
    <header>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{fontSize: '20px'}}>
            {address}{' '}
            <span
              style={{ cursor: 'pointer', fontSize: '15px' }}
              onClick={() => setShowModal(true)}
            >
              <img className="marker" src={marker} />{/*제작 마커 이미지 */}
            </span>
          </h1>
        </div>
        <img src={require(`../assets/images/mainlogo.png`)} style={{width: "237px", paddingRight: "850px"}} onClick={goHome}/>

      </div>

      {/* 카카오 지도 모달 */}
      {showModal && (
        <div className="modal"> 
          <KakaoMapModal
            onClose={() => setShowModal(false)}
            onSelectLocation={handleLocationSelect}  // 좌표 선택 시 호출될 함수
          />
        </div>
      )}
    </header>
  );
};

export default Header;