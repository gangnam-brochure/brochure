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
    // URL에서 토큰을 가져오기
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');  // 'token'이 URL에 전달되었는지 확인

    console.log('URL에서 가져온 토큰:', token);  // 이 값이 null이 아닌지 확인

    if (token) {
      // 토큰이 있을 경우 쿠키에 저장
      Cookies.set('token', token, {
        expires: 1,         // 쿠키 만료 기간: 1일
        path: '/',          // 모든 경로에서 쿠키 사용 가능
        sameSite: 'Lax',    // CSRF 보호
        secure: false       // HTTPS가 아닌 경우 false로 설정
      });

      console.log('로그인 성공, 액세스 토큰:', token);
      navigate('/');
    } else {
      console.error('로그인 처리 중 오류 발생: 토큰이 없습니다.');
      navigate('/signin');
    }
  }, [navigate]);

  return null;
};

export default LoginRedirectHandler;