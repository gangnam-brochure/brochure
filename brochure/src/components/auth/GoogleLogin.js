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
    flow: 'auth-code',  // OAuth flow를 auth-code로 설정
    redirect_uri: 'http://localhost:3000/',  // 리다이렉트 URL 설정
  });

  return (
    <div>
      <button onClick={() => googleLogin()}>구글 로그인</button>
    </div>
  );
};

const SocialLoginWrapper = () => (
  <GoogleOAuthProvider clientId="1029984235128-ev1955m4p0hahtudm1mvs4laoujgdtd0.apps.googleusercontent.com">
    <GoogleLogin />
  </GoogleOAuthProvider>
);

export default SocialLoginWrapper;