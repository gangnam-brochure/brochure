/*
    작성자 : 김동규 - 2024-10-02 / 최초 작성
    설명 : Kakao 로그인 리다이렉트 핸들러
*/

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const LoginRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Kakao SDK가 전역에서 로드되었는지 확인
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.REACT_APP_KAKAO_CLIENT_ID);  // 환경 변수에서 JavaScript 키 가져와 초기화
    }

    // Kakao SDK가 제대로 로드되었는지 확인
    if (!window.Kakao || !window.Kakao.Auth) {
      console.error('Kakao SDK가 로드되지 않았습니다.');
      return;
    }

    // URL에서 전달받은 코드를 가져오기 위해 URLSearchParams 사용
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');  // 카카오로부터 받은 인증 코드

    if (code) {
      // 인증 코드로 카카오 토큰을 요청 (토큰 처리 로직)
      window.Kakao.Auth.login({
        success: function (authObj) {
          console.log('카카오 로그인 성공:', authObj);

          // 성공 시 토큰을 쿠키에 저장
          Cookies.set('token', authObj.access_token, {
            expires: 1,  // 쿠키 만료 기간: 1일
            path: '/',    // 모든 경로에서 쿠키 사용 가능
            sameSite: 'Lax',  // CSRF 보호
            secure: false  // 로컬에서 사용 시 false
          });

          // 메인 페이지로 리다이렉트
          navigate('/');
        },
        fail: function (err) {
          console.error('카카오 로그인 실패:', err);
          navigate('/signin');  // 로그인 실패 시 로그인 페이지로 리다이렉트
        }
      });
    } else {
      console.error('카카오로부터 코드를 받지 못했습니다.');
      navigate('/signin');
    }
  }, [navigate]);

  return null;
};

export default LoginRedirectHandler;