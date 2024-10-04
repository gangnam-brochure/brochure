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
      isPopup: false,  // 팝업이 아닌 새로운 페이지로 이동
      loginButton: { color: 'green', type: 3, height: 50 },
    });

    naverLogin.init();  // 네이버 로그인 초기화
  }, []);

  return <div id="naverIdLogin" />;
};

export default NaverLogin;