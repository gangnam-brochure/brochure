import React, { useEffect } from 'react';

const NaverLogin = () => {
  useEffect(() => {
    const naverLogin = new window.naver.LoginWithNaverId({
      clientId: 'ZFYiGNm6iOeB7tgsolqV',
      callbackUrl: 'http://localhost:3000/',  // 리다이렉트 URL을 메인 페이지로 설정
      isPopup: true,
      loginButton: { color: 'green', type: 3, height: 48 },
    });
    naverLogin.init();
  }, []);

  return <div id="naverIdLogin" />;
};

export default NaverLogin;