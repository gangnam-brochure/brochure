import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');  // 인가 코드
    const state = params.get('state');  // 네이버의 경우 추가적으로 state 값이 전달됨
    const error = params.get('error');  // 에러 발생 시 error 파라미터가 전달됨

    if (error) {
      alert(`로그인 실패: ${error}`);
      navigate('/signin');  // 로그인 실패 시 로그인 페이지로 리디렉션
      return;
    }

    if (code) {
      // 로그인 성공 처리 로직 (백엔드로 인가 코드 전송 후 토큰 처리)
      console.log('받은 인가 코드:', code);

      // 각 서비스별로 로그인 처리 후 메인 페이지 유지
      navigate('/');
    }
  }, [navigate]);

  return null;
};

export default LoginRedirectHandler;