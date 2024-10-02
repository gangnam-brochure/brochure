/*
    작성자 : 김동규 - 2024-10-02 / 최초 작성
    설명 : 구글 소셜 로그인 연동
*/
import React from 'react';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const GoogleLogin = () => {
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    onSuccess: (response) => {
      Cookies.set('token', response.access_token);
      navigate('/profile');
    },
    onError: (error) => console.error('구글 로그인 에러', error),
  });

  return (
    <div>
      <button onClick={() => googleLogin()}>구글 로그인</button>
    </div>
  );
};

const SocialLoginWrapper = () => (
  <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
    <GoogleLogin />
  </GoogleOAuthProvider>
);

export default SocialLoginWrapper;