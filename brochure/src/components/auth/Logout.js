/*
    작성자 : 김동규 - 2024-10-02 / 최초 작성
    설명 : 로그아웃 기능을 관리하는 컴포넌트
*/

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = () => {
      Cookies.remove('token');  // 로그아웃 시 쿠키에서 토큰 삭제
      navigate('/');  // 로그아웃 후 로그인 페이지로 이동
      alert("로그아웃 되었습니다.");
    };

    handleLogout();  // 컴포넌트가 로드될 때 즉시 로그아웃 실행
  }, [navigate]);

  return (
    <div>
      <p>로그아웃 중입니다...</p>
    </div>
  );
};

export default Logout;