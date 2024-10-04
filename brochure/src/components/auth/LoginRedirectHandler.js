/*
    작성자 : 김동규 - 2024-10-02 / 최초 작성
    설명 : 로그인 redirect URL 설정
*/

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';  // 쿠키 관리를 위해 사용
import axios from 'axios';  // 토큰 요청 시 사용할 axios

const LoginRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');  // 인가 코드
    const state = params.get('state');  // 네이버에서 추가적으로 전달됨
    const error = params.get('error');  // 에러 발생 시 전달됨
    const pathname = window.location.pathname;  // 현재 경로 확인

    if (error) {
      alert(`로그인 실패: ${error}`);
      navigate('/signin');  // 로그인 실패 시 로그인 페이지로 리디렉션
      return;
    }

    if (code) {
      if (pathname.includes('/kakao')) {
        // 카카오 로그인 처리
        handleKakaoLogin(code);
      } else if (pathname.includes('/naver')) {
        // 네이버 로그인 처리
        handleNaverLogin(code, state);
      }
    }
  }, [navigate]);

  const handleKakaoLogin = async (code) => {
    try {
      const response = await axios.post(
        'https://kauth.kakao.com/oauth/token',
        null,
        {
          params: {
            grant_type: 'authorization_code',
            client_id: 'f0579f41e144258263ee0dfef34ae35b',
            redirect_uri: 'http://localhost:3000/',
            code: code,
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      const { access_token } = response.data;
      Cookies.set('token', access_token, { expires: 1 });  // 토큰 저장
      console.log('카카오 로그인 성공, 액세스 토큰:', access_token);
      navigate('/');  // 메인 페이지로 이동
    } catch (error) {
      console.error('카카오 토큰 발급 실패:', error);
      alert('카카오 로그인 처리 중 문제가 발생했습니다.');
      navigate('/signin');
    }
  };

  const handleNaverLogin = async (code, state) => {
    try {
      const response = await axios.post(
        'https://nid.naver.com/oauth2.0/token',
        null,
        {
          params: {
            grant_type: 'authorization_code',
            client_id: 'ZFYiGNm6iOeB7tgsolqV',
            client_secret: 'if2HCwSvIJ',
            redirect_uri: 'http://localhost:3000/',
            code: code,
            state: state,
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      const { access_token } = response.data;
      Cookies.set('token', access_token, { expires: 1 });  // 토큰 저장
      console.log('네이버 로그인 성공, 액세스 토큰:', access_token);
      navigate('/');  // 메인 페이지로 이동
    } catch (error) {
      console.error('네이버 토큰 발급 실패:', error);
      alert('네이버 로그인 처리 중 문제가 발생했습니다.');
      navigate('/signin');
    }
  };

  return null;
};

export default LoginRedirectHandler;