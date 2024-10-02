/*
    작성자 : 김동규 - 2024-10-02 / 최초 작성
    설명 : 네이버 소셜 로그인 연동
*/
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const NaverLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const naverLogin = new window.naver.LoginWithNaverId({
      clientId: 'YOUR_NAVER_CLIENT_ID',
      callbackUrl: 'YOUR_REDIRECT_URI',
      isPopup: false,
      loginButton: { color: 'green', type: 1, height: '47' },
    });
    naverLogin.init();
    naverLogin.getLoginStatus((status) => {
      if (status) {
        const token = naverLogin.accessToken.accessToken;
        Cookies.set('token', token);
        navigate('/profile');
      }
    });
  }, [navigate]);

  return <div id="naverIdLogin"></div>;
};

export default NaverLogin;