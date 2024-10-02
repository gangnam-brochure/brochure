/*
    작성자 : 김동규 - 2024-10-02 / 최초 작성
    설명 : 카카오 소셜 로그인 연동
*/
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const KakaoLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init('YOUR_KAKAO_JAVASCRIPT_KEY');
    }
  }, []);

  const handleKakaoLogin = () => {
    window.Kakao.Auth.login({
      success: (authObj) => {
        Cookies.set('token', authObj.access_token);
        navigate('/profile');
      },
      fail: (err) => {
        console.error(err);
        alert('카카오 로그인 실패');
      },
    });
  };

  return <button onClick={handleKakaoLogin}>카카오 로그인</button>;
};

export default KakaoLogin;