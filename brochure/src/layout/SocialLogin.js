/*
    작성자 : 김동규 - 2024-10-02 / 최초 작성
    설명 : 카카오, 네이버, 구글 API와 연동한 소셜 로그인을 구현
*/

import React from 'react';
import KakaoLogin from '../components/auth/KakaoLogin';
import NaverLogin from '../components/auth/NaverLogin';
import GoogleLogin from '../components/auth/GoogleLogin';
import '../assets/css/sociallogin.css';

const SocialLoginWrapper = () => {
  return (
    <div className="social-login-container">
      <GoogleLogin />
      <KakaoLogin />
      <NaverLogin />
    </div>
  );
};

export default SocialLoginWrapper;