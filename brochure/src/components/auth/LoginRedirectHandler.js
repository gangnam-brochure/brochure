/*
    작성자 : 김동규 - 2024-10-02 / 최초 작성
    설명 : kakao, naver 로그인 로직
*/

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const LoginRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // URL에서 전달받은 토큰을 가져오기 위해 URLSearchParams 사용
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');  // 서버에서 전달된 토큰 가져오기

    if (token) {
      // 토큰이 있을 경우 쿠키에 저장
      Cookies.set('token', token, {
        expires: 1,         // 쿠키 만료 기간: 1일
        path: '/',          // 모든 경로에서 쿠키 사용 가능
        sameSite: 'Lax',    // CSRF 보호 (Cross-origin 요청에서는 None으로 설정 가능)
        secure: false       // HTTPS가 아닌 경우 false로 설정 (로컬에서 사용 시)
      });

      // 토큰을 저장한 후 메인 페이지로 리다이렉트
      console.log('로그인 성공, 액세스 토큰:', token);
      navigate('/');  // 로그인 후 메인 페이지로 이동
    } else {
      console.error('로그인 처리 중 오류 발생: 토큰이 없습니다.');
      navigate('/signin');  // 실패 시 로그인 페이지로 리다이렉트
    }
  }, [navigate]);

  return null;
};

export default LoginRedirectHandler;