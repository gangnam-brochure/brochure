/*
    작성자 : 김동규 - 2024-10-02 / 최초 작성
    설명 : Kakao와 Naver 로그인 리다이렉트 핸들러
*/

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const LoginRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const currentURL = window.location.href;
    console.log('현재 URL:', currentURL);

    if (currentURL.includes('kakao')) {
      handleKakaoLogin();
    } else if (currentURL.includes('naver')) {
      handleNaverLogin();
    } else {
      console.error('지원하지 않는 소셜 로그인 요청입니다.');
      navigate('/signin');
    }
  }, [navigate]);

  // 카카오 로그인 처리 함수
  const handleKakaoLogin = async () => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const error = params.get('error');

    if (error) {
      alert(`카카오 로그인 실패: ${error}`);
      navigate('/signin');
      return;
    }

    if (code) {
      try {
        const response = await fetch(
          `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=http://localhost:3000/oauth/kakao/callback&code=${code}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );

        const data = await response.json();
        console.log('카카오 로그인 성공:', data);

        Cookies.set('token', data.access_token, {
          expires: 1,
          path: '/',
          sameSite: 'Lax',
        });

        navigate('/');
      } catch (error) {
        console.error('카카오 로그인 처리 중 오류 발생:', error);
        alert('카카오 로그인 처리 중 문제가 발생했습니다.');
        navigate('/signin');
      }
    } else {
      console.error('카카오로부터 인증 코드를 받지 못했습니다.');
      navigate('/signin');
    }
  };

  // 네이버 로그인 처리 함수
  const handleNaverLogin = () => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get('access_token');
    const error = hashParams.get('error');

    if (error) {
      alert(`네이버 로그인 실패: ${error}`);
      navigate('/signin');
      return;
    }

    if (accessToken) {
      try {
        console.log('네이버 로그인 성공:', accessToken);

        Cookies.set('token', accessToken, {
          expires: 1,
          path: '/',
          sameSite: 'Lax',
        });

        navigate('/');
      } catch (error) {
        console.error('네이버 로그인 처리 중 오류 발생:', error);
        alert('네이버 로그인 처리 중 문제가 발생했습니다.');
        navigate('/signin');
      }
    } else {
      console.error('네이버로부터 access_token을 받지 못했습니다.');
      navigate('/signin');
    }
  };

  return null;
};

export default LoginRedirectHandler;
