/*
    작성자 : 김동규 - 2024-10-02 / 최초 작성
    설명 : 카카오 소셜 로그인
*/

import React, { useEffect } from 'react';

const KakaoLogin = () => {
  useEffect(() => {
    // Kakao SDK 초기화
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init('77ddf9c57d59c5ec87f79398d5ae2e83');  // 발급받은 JavaScript 키로 SDK 초기화
    }
  }, []);

  const handleLogin = () => {
    // 카카오 로그인 팝업 띄우기
    window.Kakao.Auth.authorize({
      redirectUri: 'http://localhost:3000/',  // Kakao Developers에 등록된 Redirect URI
    });
  };

  return (
    <button onClick={handleLogin}>카카오 로그인</button>
  );
};

export default KakaoLogin;