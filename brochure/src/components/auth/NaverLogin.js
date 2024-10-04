/*
    작성자 : 김동규 - 2024-10-02 / 최초 작성
    설명 : 네이버 소셜 로그인
*/

import React, { useEffect } from 'react';

const NaverLogin = () => {
  useEffect(() => {
    const naverLogin = new window.naver.LoginWithNaverId({
      clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
      callbackUrl: 'http://localhost:3000/oauth/naver/callback',
      isPopup: false, // 팝업 형태로 로그인 진행 여부
      loginButton: { color: 'green', type: 2, height: 50 }, // 네이버에서 제공하는 버튼 스타일
    });

    naverLogin.init(); // 네이버 로그인 초기화
  }, []);

  return (
    <div className="naver-login-wrapper flex items-center justify-center">
      {/* 네이버 로그인 버튼을 렌더링할 div */}
      <div id="naverIdLogin" className="w-full"></div>
    </div>
  );
};

export default NaverLogin;
