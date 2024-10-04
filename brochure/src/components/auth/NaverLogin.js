/*
    작성자 : 김동규 - 2024-10-02 / 최초 작성
    설명 : 네이버 소셜 로그인
*/

import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const NaverLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const naverLogin = new window.naver.LoginWithNaverId({
      clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
      callbackUrl: 'http://localhost:3000/oauth/naver/callback',
      isPopup: false,  // 팝업 방식으로 로그인 할 것인지
      loginButton: { color: 'green', type: 3, height: 48 },
    });
    naverLogin.init();

    // 로그인 콜백 함수 설정
    window.addEventListener('load', function () {
      naverLogin.getLoginStatus((status) => {
        if (status) {
          const token = naverLogin.accessToken.accessToken;
          Cookies.set('token', token, { expires: 1 });  // 로그인 성공 시 쿠키에 토큰 저장
          navigate('/');  // 메인 페이지로 이동
        }
      });
    });
  }, [navigate]);

  return (
    <div id="naverIdLogin" />
  );
};

export default NaverLogin;