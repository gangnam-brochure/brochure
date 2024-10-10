/*
    작성자 : 김동규 - 2024-10-02 / 최초 작성
    설명 : 구글 소셜 로그인 및 닉네임 설정
*/

import React from 'react';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import googleLogo from '../../assets/images/web_neutral_sq_na@2x.png';
import '../../assets/css/googlelogin.css';

const GoogleLogin = () => {
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const token = response.access_token;
        
        if (token) {
          console.log('구글 로그인 성공, 받은 토큰:', token);

          // 구글 사용자 정보를 가져오기 위한 API 요청
          const profileResponse = await fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
            headers: {
              Authorization: `Bearer ${token}`,  // 구글 Access Token을 헤더에 포함
            },
          });

          const profileData = await profileResponse.json();
          console.log('받은 구글 프로필 데이터:', profileData);

          // 이메일에서 닉네임 추출 (이메일의 @ 앞 부분을 닉네임으로 설정)
          const email = profileData.email;
          const nickname = email.split('@')[0];

          // 서버에 닉네임과 이메일을 전송해 JWT 발급 요청
          const jwtResponse = await axios.post('/api/naver-login', { email, nickname });
          const serverToken = jwtResponse.data.token;

          // 발급된 JWT 토큰을 쿠키에 저장
          Cookies.set('token', serverToken, {
            expires: 1,  // 1일간 유지
            path: '/',
            sameSite: 'Lax',
          });

          console.log('닉네임 설정 성공:', nickname);
          navigate('/');  // 메인 페이지로 이동
        }
      } catch (error) {
        console.error('구글 로그인 처리 중 오류 발생:', error);
      }
    },
    onError: (error) => console.error('구글 로그인 에러', error),
  });

  return (
    <button className="google-login-button" onClick={() => googleLogin()}>
      <img 
        src={googleLogo} 
        alt="Google Logo"
        className="google-logo"
      />
    </button>
  );
};

const SocialLoginWrapper = () => (
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID'}>
    <GoogleLogin />
  </GoogleOAuthProvider>
);

export default SocialLoginWrapper;
