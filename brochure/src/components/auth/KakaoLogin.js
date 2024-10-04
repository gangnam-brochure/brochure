/*
    작성자 : 김동규 - 2024-10-02 / 최초 작성
    설명 : 카카오 소셜 로그인
*/

import React, { useEffect } from 'react';

const KakaoLogin = () => {
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.REACT_APP_KAKAO_CLIENT_ID);  // 발급받은 JavaScript 키로 SDK 초기화
    }
  }, []);

  const handleLogin = () => {
    // 카카오 로그인 페이지로 리다이렉트
    window.Kakao.Auth.authorize({
      redirectUri: 'http://localhost:5000/oauth/kakao/callback',  // 서버의 리다이렉트 URI와 일치해야 함
    });
  };

  return (
    <button onClick={handleLogin}>카카오 로그인</button>
  );
};

export default KakaoLogin;