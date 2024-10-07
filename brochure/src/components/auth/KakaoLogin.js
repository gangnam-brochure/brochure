/*
    작성자 : 김동규 - 2024-10-02 / 최초 작성
    설명 : 카카오 소셜 로그인
*/

import React, { useEffect } from 'react';

const KakaoLogin = () => {
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.REACT_APP_KAKAO_CLIENT_ID);  // 카카오 JavaScript 키로 SDK 초기화
    }
  }, []);

  const handleLogin = () => {
    window.Kakao.Auth.authorize({
      redirectUri: 'http://localhost:3000/oauth/kakao/callback',  // 카카오 개발자 콘솔에 등록된 Redirect URI
    });
  };

  return (
    <button onClick={handleLogin}>카카오 로그인</button>
  );
};

export default KakaoLogin;