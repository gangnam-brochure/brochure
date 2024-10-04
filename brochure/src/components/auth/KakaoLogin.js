/*
    작성자 : 김동규 - 2024-10-02 / 최초 작성
    설명 : 카카오 소셜 로그인
*/

import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const KakaoLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Kakao SDK 초기화
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init('f0579f41e144258263ee0dfef34ae35b');  // 발급받은 JavaScript 키로 SDK 초기화
    }
  }, []);

  const handleLogin = () => {
    // 카카오 로그인 팝업 띄우기
    window.Kakao.Auth.authorize({
      redirectUri: 'http://localhost:3000/',  // Kakao Developers에 등록된 Redirect URI
      success: (authObj) => {
        Cookies.set('token', authObj.access_token, { expires: 1 });  // 로그인 성공 시 토큰 저장
        console.log('카카오 로그인 성공, 쿠키에 토큰 저장:', authObj.access_token);  // 토큰이 제대로 저장되는지 확인
        navigate('/');  // 메인 페이지로 이동
      },
      fail: (error) => {
        console.error('카카오 로그인 실패:', error);
      },
    });
  };

  return (
    <button onClick={handleLogin}>카카오 로그인</button>
  );
};

export default KakaoLogin;