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
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');  // 네이버 또는 카카오로부터 받은 인증 코드
    const state = params.get('state');  // 네이버의 경우 state 파라미터가 함께 전달됨
    const error = params.get('error');  // 로그인 실패 시 에러 파라미터가 전달될 수 있음

    console.log('code:', code);
    console.log('state:', state);
    console.log('error:', error);

    if (error) {
      alert(`로그인 실패: ${error}`);
      navigate('/signin');
      return;
    }

    if (code) {
      // 네이버 로그인 처리
      if (window.location.pathname.includes('/naver')) {
        handleNaverLogin(code, state);
      }
      // 카카오 로그인 처리
      else if (window.location.pathname.includes('/kakao')) {
        handleKakaoLogin(code);
      }
    } else {
      console.error('네이버나 카카오로부터 인증 코드를 받지 못했습니다.');
      navigate('/signin');
    }
  }, [navigate]);

  // 카카오 로그인 처리 함수
  const handleKakaoLogin = async (code) => {
    try {
      const response = await fetch(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=http://localhost:3000/oauth/kakao/callback&code=${code}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const data = await response.json();
      console.log('카카오 로그인 성공:', data);

      Cookies.set('token', data.access_token, { expires: 1, path: '/', sameSite: 'Lax' });
      navigate('/');
    } catch (error) {
      console.error('카카오 로그인 처리 중 오류 발생:', error);
      alert('카카오 로그인 처리 중 문제가 발생했습니다.');
      navigate('/signin');
    }
  };

  // 네이버 로그인 처리 함수
  const handleNaverLogin = async (code, state) => {
    try {
      const response = await fetch(`https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&client_secret=${process.env.REACT_APP_NAVER_CLIENT_SECRET}&code=${code}&state=${state}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const data = await response.json();
      console.log('네이버 로그인 성공:', data);

      Cookies.set('token', data.access_token, { expires: 1, path: '/', sameSite: 'Lax' });
      navigate('/');
    } catch (error) {
      console.error('네이버 로그인 처리 중 오류 발생:', error);
      alert('네이버 로그인 처리 중 문제가 발생했습니다.');
      navigate('/signin');
    }
  };

  return null;
};

export default LoginRedirectHandler;
